'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSignIn } from '@/lib/auth/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const { signInWithEmail, loading, error } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!email || !password) {
      setFormError('Lütfen e-mail ve şifrenizi girin')
      return
    }

    try {
      await signInWithEmail(email, password)
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : 'Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.'
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">PsychoFlow</h1>
          <p className="text-slate-400">Klinik yönetim sistemine hoş geldiniz</p>
        </div>

        {/* Form Card */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-200"
              >
                E-posta Adresi
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Error Message */}
            {(formError || error) && (
              <div className="p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
                <p className="text-sm text-red-400">
                  {formError || error?.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/50 text-slate-400">
                  Hesabınız yok mu?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              href="/auth/signup"
              className="w-full block text-center px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              Kayıt Ol
            </Link>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <Link href="#" className="hover:text-slate-300 transition-colors">
                Şifremi Unuttum
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-slate-300 transition-colors">
                Destek
              </Link>
            </div>
          </div>
        </Card>

        {/* Security badge */}
        <div className="mt-6 text-center text-xs text-slate-400">
          <p>🔒 Verileriniz SSL ile korunmaktadır</p>
        </div>
      </div>
    </div>
  )
}
