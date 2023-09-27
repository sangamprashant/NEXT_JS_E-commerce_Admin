import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@utils/mongodb'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const AuthOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  adapter:MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (process.env.ADMIN_EMAIL===user?.email) {
        return true
      } else {
        return false
      }
    }
  }
}

const handler = NextAuth(AuthOption)
export { handler as GET, handler as POST }