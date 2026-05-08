"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-end gap-3">
        <Link
          href="/register"
          className="px-6 py-2 text-sm font-medium text-[#0f3d4c] bg-white border border-[#0f3d4c] rounded-full hover:bg-gray-50 transition-colors"
        >
          Register
        </Link>
        <Link
          href="/signin"
          className="px-6 py-2 text-sm font-medium text-white bg-[#0f3d4c] rounded-full hover:bg-[#1a5568] transition-colors"
        >
          Sign In
        </Link>
      </div>
    </header>
  )
}
