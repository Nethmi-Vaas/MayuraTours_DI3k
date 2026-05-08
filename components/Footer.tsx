"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#faf8f5] pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-200">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-[#0f3d4c] text-lg mb-3">Mayura Tours</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Crafting bespoke Sri Lankan journeys with a commitment to luxury, authenticity, and sustainable exploration.
            </p>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Expertise
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tours/luxury" className="text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
                  Luxury Tours
                </Link>
              </li>
              <li>
                <Link href="/tours/wildlife" className="text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
                  Wildlife Safaris
                </Link>
              </li>
              <li>
                <Link href="/tours/wellness" className="text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
                  Wellness Retreats
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/careers" className="text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-[#0f3d4c] hover:text-[#1a5568] transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#0f3d4c] focus:border-[#0f3d4c]"
              />
              <button className="px-4 py-2 bg-[#0f3d4c] text-white rounded-r hover:bg-[#1a5568] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2024 Mayura Tours. All rights reserved. Licensed by D3K
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-gray-500 hover:text-[#0f3d4c] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-[#0f3d4c] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
