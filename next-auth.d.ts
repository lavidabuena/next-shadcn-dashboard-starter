// next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      uid: string;
      emailVerified: Date | null;
      idToken: string;
      refreshToken: string;
      tokenExpiryTime: number;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    uid: string;
    emailVerified: Date | null;
    idToken: string;
    refreshToken: string;
    tokenExpiryTime: number;
  }
}
