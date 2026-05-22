"use client"

import { useEffect, useRef } from "react"

interface Props {
  onVerify: (token: string) => void
  onExpire?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: object) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

export default function TurnstileWidget({ onVerify, onExpire }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""

  useEffect(() => {
    if (!siteKey) return

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return
      if (widgetId.current) return
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpire ?? (() => {}),
        theme: "light",
      })
    }

    if (window.turnstile) {
      renderWidget()
      return
    }

    const script = document.createElement("script")
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
    script.async = true
    script.defer = true
    script.onload = renderWidget
    document.head.appendChild(script)

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [siteKey, onVerify, onExpire])

  if (!siteKey) return null

  return <div ref={containerRef} className="cf-turnstile" />
}
