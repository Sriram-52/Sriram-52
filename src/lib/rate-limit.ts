"use server"

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { headers } from "next/headers"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "30s"),
})

export const checkRatelimit = async () => {
  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1"
    const result = await ratelimit.limit(ip)
    return result.success
  } catch (error) {
    console.error("Error checking ratelimit:", error)
    return true
  }
}

export type RatelimitResponse = boolean
