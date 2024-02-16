import 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    uid?: string
    client?: string
    userId?: number
  }
}
