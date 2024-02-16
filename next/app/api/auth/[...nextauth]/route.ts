import axios, { AxiosError } from 'axios'
import NextAuth, { AuthOptions, User as NextAuthUser, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

interface UserData {
  email: string
  provider: string
  uid: string
  id: number
  allow_password_change: boolean
  name: string | null
  image: string | null
}
interface User extends NextAuthUser {
  accessToken?: string
  uid?: string
  client?: string
  data: UserData
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        passwordConfirmation: { label: 'Password Confirmation', type: 'password' },
        name: { label: 'Name', type: 'text' },
        signUp: { label: 'Sign Up', type: 'checkbox' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null
        const baseURL = 'http://api:3000/api/v1'
        let endpoint
        let reqBody
        if (credentials.signUp) {
          endpoint = '/auth'
          reqBody = {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation,
            name: credentials.name,
          }
        } else {
          endpoint = '/auth/sign_in'
          reqBody = {
            email: credentials.email,
            password: credentials.password,
          }
        }
        try {
          const res = await axios.post(baseURL + endpoint, reqBody)
          if (res.status === 200 && res.data) {
            return {
              accessToken: res.headers['access-token'],
              uid: res.headers['uid'],
              client: res.headers['client'],
              ...res.data,
            }
          } else {
            return null
          }
        } catch (error) {
          console.error('認証エラー:', error)
          if (error instanceof AxiosError) {
            return Promise.reject(new Error(String(error.response?.status)))
          }
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken
        token.uid = user.uid
        token.client = user.client
        token.userId = user.data.id
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string
      session.uid = token.uid as string
      session.client = token.client as string
      session.userId = token.userId as number
      return session

      // page.tsxでは以下のように使用する。
      // if (session) {
      //   console.log(session.accessToken) // accessTokenにアクセス
      //   console.log(session.uid) // uidにアクセス
      //   console.log(session.client) // clientにアクセス
      //   console.log(session.userId) // userIdにアクセス
      // }
    },
  },
}

const handler = NextAuth(authOptions as unknown as AuthOptions)
export { handler as GET, handler as POST }
