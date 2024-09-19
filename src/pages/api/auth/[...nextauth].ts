import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth/core/types'
import jwtDecode from 'jwt-decode'

import AuthService from '@services/AuthService'
import UserService from '@services/UserService'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize: async (credentials): Promise<any> => {
        const { email, password } = credentials as { email: string, password: string}
        const data = await AuthService.login({ email, password })

        if (!data.ok) throw new Error(data.message)

        return {
          ...jwtDecode(data.accessToken as string),
          accessToken: data.accessToken
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        const [firstname, lastname] = (user?.name as string).split(' ')

        const data = {
          firstname,
          lastname,
          email: user.email,
          isVerified: true,
          provider: 'google',
          image: user.image
        }

        const res = await UserService.createWithGoogle(data)

        if (!res.ok) return false

        user.accessToken = res.accessToken
      }

      return true
    },

    jwt: async ({ token, user }) => {
      if (token && user) {
        token.accessToken = user.accessToken as string
        token.user = user
      }

      return token
    },

    session: async ({ session, token }) => {
      if (token && token.accessToken) {
        session.user = jwtDecode(token.accessToken as string)
        session.user.accessToken = token.accessToken as string
      }

      return session
    }
  },

  pages: {
    signIn: '/login'
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions)
}