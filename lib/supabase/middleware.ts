import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Missing envs on the Edge runtime would crash middleware. Skip session refresh.
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        // In Middleware (Edge), you cannot mutate request cookies.
        // Only set cookies on the response.
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        // Mirror Supabase cookie removals on the response only.
        response.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  })

  try {
    await supabase.auth.getUser()
  } catch (error) {
    console.error('Supabase middleware error:', error)
    // Don't block the request; continue without a user session
  }

  return response
}
