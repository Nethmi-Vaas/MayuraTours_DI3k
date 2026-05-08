"use client"

import Link from "next/link"

export default function CustomQuoteBanner() {
  return (
    <section className="bg-[#faf8f5] py-6 px-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#0f3d4c]">
            {"Can't find your ideal path?"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Our travel specialists can design a bespoke itinerary tailored exclusively to your preferences and pace.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/custom-quote"
            className="px-5 py-2.5 bg-[#0f3d4c] text-white text-sm font-medium rounded-full hover:bg-[#1a5568] transition-colors"
          >
            Request Custom Quote
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 border border-[#0f3d4c] text-[#0f3d4c] text-sm font-medium rounded-full hover:bg-[#0f3d4c] hover:text-white transition-colors"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </section>
  )
}
