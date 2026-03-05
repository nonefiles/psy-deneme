'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    async function getUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (mounted) {
          setUser(user)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getUser()

    return () => {
      mounted = false
    }
  }, [supabase])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push('/auth/login')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign out failed'))
    }
  }

  return {
    user,
    loading,
    error,
    signOut,
    isAuthenticated: !!user,
  }
}

export function useSignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (authError) throw authError
      return data
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Giriş başarısız')
      setError(errorObj)
      throw errorObj
    } finally {
      setLoading(false)
    }
  }

  return { signInWithEmail, loading, error }
}

export function useSignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName?: string
  ) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL ||
            `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
          data: {
            full_name: fullName || '',
          },
        },
      })
      if (authError) throw authError
      return data
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Kayıt başarısız')
      setError(errorObj)
      throw errorObj
    } finally {
      setLoading(false)
    }
  }

  return { signUpWithEmail, loading, error }
}
