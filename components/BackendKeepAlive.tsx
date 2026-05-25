"use client"

import { useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
const PING_INTERVAL = 8 * 60 * 1000

export default function BackendKeepAlive() {
  useEffect(() => {
    const ping = () => fetch(`${API_URL}/health`, { method: "GET" }).catch(() => {})
    ping()
    const id = setInterval(ping, PING_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return null
}
