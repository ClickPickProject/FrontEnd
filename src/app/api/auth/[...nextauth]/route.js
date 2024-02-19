import axios from 'axios';
import { calcLength } from 'framer-motion';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { redirect } from 'next/navigation';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credential-login',
      name: 'credential-login',
      credentials: {
        id: { label: '아이디', type: 'text', placeholder: '야' },
        password: { label: '비번', type: 'password', placeholder: '비번입력ㄱ' },
        nickname: { label: '닉넴', type: 'text' },
      },
      async authorize(credentials, req) {
        const res = await fetch(`http://localhost:3001/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: credentials?.id,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
