import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/libs/prismadb';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: ' ' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    jwt: {
        // secret: process.env.JWT_SECRET, // deprecated
    },

    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        strategy: "jwt",
        updateAge: 24 * 60 * 60, // 24 hours
    },


}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
