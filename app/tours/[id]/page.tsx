"use client"

import { useParams, redirect } from "next/navigation"
import { useEffect } from "react"

// /tours/[id] redirects to /packages/[id] — same content
export default function TourDetailRedirect() {
  const params = useParams()
  useEffect(() => {
    if (params?.id) window.location.replace(`/packages/${params.id}`)
  }, [params?.id])
  return null
}
