import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string,
      name: string,
      firstname: string,
      username?: string,
      email: string,
      image: string,
      session?: string,
      accessToken: string,
      permission: string
    }
  }

  interface User {
    accessToken: string
  }
}