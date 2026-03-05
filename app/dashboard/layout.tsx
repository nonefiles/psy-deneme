'use client'

import { useAuth } from '@/lib/auth/hooks'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-400">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Redirect if no user (middleware should handle this, but double-check)
  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  )
}
