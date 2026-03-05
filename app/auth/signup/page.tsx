'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSignUp } from '@/lib/auth/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function SignupPage() {
  const router = useRouter()
  const { signUpWithEmail, loading, error } = useSignUp()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!fullName || !email || !password || !confirmPassword) {
      setFormError('Lütfen tüm alanları doldurun')
      return
    }

    if (password !== confirmPassword) {
      setFormError('Şifreler eşleşmiyor')
      return
    }

    if (password.length < 6) {
      setFormError('Şifre en az 6 karakter olmalıdır')
      return
    }

    try {
      await signUpWithEmail(email, password, fullName)
      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : 'Kayıt başarısız oldu. Lütfen bilgilerinizi kontrol edin.'
      )
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-xl p-8 text-center">
            <div className="mb-4 text-4xl">✅</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Kayıt Başarılı!
            </h2>
            <p className="text-slate-400 mb-4">
              E-mailinizi doğrulamak için gelen kutunuzu kontrol edin
            </p>
            <p className="text-sm text-slate-500">
              Giriş sayfasına yönlendiriliyorsunuz...
            </p>
          </Card>
        </div>
      </div>
    )
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
          <p className="text-slate-400">Hesap oluşturun ve başlayın</p>
        </div>

        {/* Form Card */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-200"
              >
                Tam Adınız
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ahmet Yılmaz"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-slate-200"
              >
                Şifre (Tekrar)
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/50 text-slate-400">
                  Zaten hesabınız var mı?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              href="/auth/login"
              className="w-full block text-center px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors"
            >
              Giriş Yap
            </Link>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center">
              Kaydolarak{' '}
              <Link href="#" className="text-blue-400 hover:text-blue-300">
                Hizmet Şartlarını
              </Link>{' '}
              ve{' '}
              <Link href="#" className="text-blue-400 hover:text-blue-300">
                Gizlilik Politikasını
              </Link>{' '}
              kabul etmiş olursunuz
            </p>
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
