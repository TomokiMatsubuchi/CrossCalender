import { AxiosError } from 'axios'
import NextAuth, { User as NextAuthUser, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from '../../../_lib/axios'

interface User extends NextAuthUser {
  accessToken?: string
  uid?: string
  client?: string
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
        let endpoint
        let reqBody
        if (credentials.signUp) {
          endpoint = '/api/v1/auth'
          reqBody = {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation,
            name: credentials.name,
          }
        } else {
          endpoint = '/api/v1/auth/sign_in'
          reqBody = {
            email: credentials.email,
            password: credentials.password,
          }
        }
        try {
          const res = await axios.post(endpoint, reqBody)
          if (res.status === 200 && res.data) {
            // Rails APIからのレスポンスに含まれるaccess_token、uid、clientをユーザーオブジェクトに追加
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
      // 認証成功時、userからaccess_token、uid、clientをJWTトークンに追加
      if (user) {
        token.accessToken = user.accessToken
        token.uid = user.uid
        token.client = user.client
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // JWTトークンからaccess_token、uid、clientをセッションに追加
      session.accessToken = token.accessToken as string
      session.uid = token.uid as string
      session.client = token.client as string
      return session

      // page.tsxでは以下のように使用する。
      // if (session) {
      //   console.log(session.accessToken) // accessTokenにアクセス
      //   console.log(session.uid) // uidにアクセス
      //   console.log(session.client) // clientにアクセス
      // }
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
