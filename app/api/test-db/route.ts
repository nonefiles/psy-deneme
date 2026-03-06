import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Test: Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to get user',
        error: userError.message,
      })
    }

    if (!user) {
      return NextResponse.json({
        status: 'not_authenticated',
        message: 'No authenticated user',
      })
    }

    // Test: Query clients table
    const { count: clientsCount, error: clientsError } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('psychologist_id', user.id)

    if (clientsError) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to query clients',
        error: clientsError.message,
      })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Database connection verified',
      user: {
        id: user.id,
        email: user.email,
      },
      stats: {
        clientsCount: clientsCount || 0,
      },
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
