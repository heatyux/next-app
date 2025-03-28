'use server'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { lucia } from '@/lib/lucia'

export const getAuth = cache(async () => {
  const cookie = await cookies()
  const sessionId = cookie.get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      const cookie = await cookies()
      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      const cookie = await cookies()
      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
    }
  } catch {
    // do nothing if used in a RSC
  }

  return result
})
