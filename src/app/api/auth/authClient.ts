import { env } from '@/env'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: env.DATABASE_URL,
})

export const { signIn, signUp, useSession, getSession, signOut } = authClient
