'use client'

import { useAuth } from '@/lib/auth/hooks'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bell, Settings } from 'lucide-react'

export function Header() {
  const { user, signOut } = useAuth()

  const userInitials = user?.email
    ?.split('@')[0]
    ?.split('.')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U'

  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-xl px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Title placeholder */}
        <div>
          <h2 className="text-xl font-semibold text-white">Hoş Geldiniz</h2>
          <p className="text-sm text-slate-400">
            {user?.email || 'Kullanıcı'}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-700/50"
          >
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 border-2 border-blue-600">
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-slate-900">
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                <span>Profil Ayarları</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={signOut}
                className="cursor-pointer text-red-600"
              >
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
