'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()

  const links = [
    {
      href: '/dashboard',
      label: 'Gösterge Paneli',
      icon: LayoutDashboard,
    },
    {
      href: '/clients',
      label: 'Danışanlar',
      icon: Users,
    },
    {
      href: '/appointments',
      label: 'Randevular',
      icon: Calendar,
    },
    {
      href: '/calendar',
      label: 'Takvim',
      icon: Calendar,
    },
    {
      href: '/finance',
      label: 'Finans',
      icon: DollarSign,
    },
    {
      href: '/settings',
      label: 'Ayarlar',
      icon: Settings,
    },
  ]

  return (
    <aside className="w-64 border-r border-slate-700 bg-slate-800/50 backdrop-blur-xl flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">PsychoFlow</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  )
}
