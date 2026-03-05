import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse = NextResponse.next({
              request,
            })
            supabaseResponse.cookies.set(name, value, options as CookieOptions)
          })
        },
      },
    }
  )

  // This refreshes a user's session in case they have one
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/clients') ||
      request.nextUrl.pathname.startsWith('/appointments') ||
      request.nextUrl.pathname.startsWith('/calendar') ||
      request.nextUrl.pathname.startsWith('/finance') ||
      request.nextUrl.pathname.startsWith('/settings'))
  ) {
    // No user, potentially respond by redirecting to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
