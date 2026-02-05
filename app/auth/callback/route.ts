import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Le paramètre "next" permet de rediriger l'utilisateur vers une page spécifique après connexion
  const next = searchParams.get('next') ?? '/explorer'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.session) {
      console.log('✅ OAuth session created for user:', data.user?.email)
      const forwardedHost = request.headers.get('x-forwarded-host') // Pour gérer les proxys/load balancers
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    } else {
        console.error('❌ OAuth error:', error?.message)
        return NextResponse.redirect(
          `${origin}/auth/auth-code-error?error=${encodeURIComponent(error?.message || 'Unknown error')}`
        )
    }
  }

  // En cas d'erreur, rediriger vers une page d'erreur
  console.error('❌ No code in callback URL')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

