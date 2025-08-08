"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";

const EMAIL_TO = "update-me@example.com";

export function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleContactSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const subject = encodeURIComponent("Portfolio contact from " + name);
		const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
		window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
	};

	return (
		<form onSubmit={handleContactSubmit} className="grid gap-4">
			<div>
				<label htmlFor="name" className="text-sm">
					Name
				</label>
				<Input
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="email" className="text-sm">
					Email
				</label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="message" className="text-sm">
					Message
				</label>
				<Textarea
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					rows={5}
					required
				/>
			</div>
			<div className="flex gap-3">
				<Button type="submit" variant="hero" className="hover-scale">
					Send email
				</Button>
				<Button type="button" variant="outline" asChild>
					<a href="/resume.pdf" download>
						<Download className="mr-2" />
						Resume
					</a>
				</Button>
			</div>
			<p className="text-xs text-muted-foreground">
				Email will open in your mail app. Set your email in code at EMAIL_TO.
			</p>
		</form>
	);
}

export default ContactForm;
