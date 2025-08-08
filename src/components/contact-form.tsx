"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Download } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/sonner"

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(1, "Please enter a message"),
})

type ContactValues = z.infer<typeof ContactSchema>

export function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  })

  const onSubmit = async (values: ContactValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message")
      }
      toast("Message sent", { description: "Thanks! I'll reply soon." })
      form.reset()
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong"
      toast("Unable to send", { description: msg })
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="How can I help?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="hero"
            className="hover-scale"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <a href={process.env.NEXT_PUBLIC_RESUME_URL} download>
              <Download className="mr-2" />
              Resume
            </a>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactForm
