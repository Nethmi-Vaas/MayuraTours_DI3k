"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { LayoutDashboard, MapPin, User, LogOut } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import Header from "@/components/Header"

const SIDEBAR_LINKS = [
  { label: "Overview",    href: "/dashboard",         icon: LayoutDashboard },
  { label: "My Tours",    href: "/dashboard/tours",   icon: MapPin },
  { label: "Profile",     href: "/dashboard/profile", icon: User },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoggedIn, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push(`/signin?redirect=${pathname}`)
    }
  }, [loading, isLoggedIn, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (!isLoggedIn || !user) return null

  function handleLogout() {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-28">
            <div className="mb-4 px-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account</p>
              <p className="text-sm font-semibold text-[#0f3d4c] mt-1">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <nav className="space-y-1">
              {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === href
                      ? "bg-[#0f3d4c] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#0f3d4c]"
                  }`}>
                  <Icon className="w-4 h-4" /> {label}
                </Link>
              ))}
            </nav>
            <hr className="my-3" />
            <button onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile nav */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-4 mb-4">
            {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === href
                    ? "bg-[#0f3d4c] text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}>
                <Icon className="w-3.5 h-3.5" /> {label}
              </Link>
            ))}
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
