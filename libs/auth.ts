import { admin } from '@/app/src/firebase/admin';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const fetchNewIdToken = async (refreshToken: string) => {
  const res = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_TOKEN_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refreshToken
      })
    }
  );

  const { id_token } = await res.json();

  return id_token;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      // 1
      authorize: async ({ idToken, refreshToken }: any, _req) => {
        if (idToken && refreshToken) {
          try {
            const decoded = await admin.verifyIdToken(idToken); // 2

            const user = {
              id: decoded.user_id,
              uid: decoded.uid,
              name: decoded.name || '',
              email: decoded.email || '',
              image: decoded.picture || '',
              emailVerified: decoded.email_verified ? new Date() : null,
              idToken,
              refreshToken,
              tokenExpiryTime: decoded.exp || 0
            };

            return user;
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.uid = user.id;
        token.name = user.name ?? '';
        token.emailVerified = !!user.emailVerified;
        token.idToken = user.idToken;
        token.refreshToken = user.refreshToken;
        token.image = user.image ?? '';
        token.tokenExpiryTime = user.tokenExpiryTime;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpiryTime = token.tokenExpiryTime as number;
      const isExpired = currentTime > tokenExpiryTime - 300; // 5分前には更新するようにする

      if (isExpired) {
        try {
          const newIdToken = await fetchNewIdToken(
            token.refreshToken as string
          );
          token.idToken = newIdToken;
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) {
        // トークンがない場合、nullの代わりに空のセッションを返す
        return {} as DefaultSession;
      }
      // sessionにFirebase Authenticationで取得した情報を追加。
      (session.user.emailVerified = token.emailVerified as Date | null),
        (session.user.uid = token.idToken as string),
        (session.user.name = token.name);
      session.user.image = token.image as string;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 90 * 24 * 60 * 60 // 90 days
  },
  pages: {
    signIn: '/sign-in'
  },
  secret: process.env.NEXTAUTH_SECRET
};
