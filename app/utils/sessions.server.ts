import { createCookieSessionStorage, redirect } from '@remix-run/node'

import 'dotenv/config'
import { adminAuth, getSessionToken, signOutFirebase } from './db.server'

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  throw new Error('SESSION_SECRET is required')
}

const storage = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: '__session',

    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret]
  }
})

async function createUserSession(idToken: string, redirectTo: string) {
  const token = await getSessionToken(idToken)
  const session = await storage.getSession()
  session.set('token', token)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}

async function getUserSession(request: Request) {
  const session = await storage.getSession(request?.headers?.get('Cookie'))
  const token = session.get('token')

  if (!token) {
    return null
  }

  try {
    const tokenUser = await adminAuth.verifySessionCookie(token, true)
    return tokenUser
  } catch (error) {
    console.error(error)
    return null
  }
}

async function destroySession(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'))
  const newCookie = await storage.destroySession(session)

  return redirect('/login', {
    headers: {
      'Set-Cookie': newCookie
    }
  })
}

async function signOut(request: Request) {
  await signOutFirebase()
  return await destroySession(request)
}

export { createUserSession, signOut, getUserSession }
