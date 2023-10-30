import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

interface IUser {
  uuid: string;
  name: string;
  user_id: string;
  zip_code: string;
  address: string;
  adderss_detail: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        user_id: { label: 'user_id', type: 'text', placeholder: '아이디를 입력해주세요.' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/nest/signIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: credentials?.user_id,
            password: credentials?.password,
          }),
        })
        const user = await res.json()

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user}) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      delete token.iat
      delete token.exp
      delete token.jti
    session.user = token as any
      // {
      //   ...session.user,
      //   name,
      //   email,
      //   phone,
      //   address,
      //   zip_code,
      //   address_detail,
      //   uuid,
      //   created_at,
      //   updated_at,
      //   deleted_at,
      //   access_token,
      // };
      return session;
    },
  },

  pages: {
    signIn: "/auth/signIn",
  },

})

export { handler as GET, handler as POST }