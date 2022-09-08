import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import userDB from "@servers/models/participant";
import loginWithProviders from "@servers/services/login-with-providers";

import { ILogin } from "types";

import connectDB, { closeDB } from "@servers/config";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Email",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        await connectDB();
        const { email, password } = credentials as ILogin;
        try {
          const users = await userDB.findOne({ email });
          if (!users) throw "invalid email";
          const isPasswordValid = await compare(password, users!.password);
          if (!isPasswordValid) throw "invalid password";
          return { email, password };
        } catch (e: any) {
          throw new Error(e);
        } finally {
          await closeDB();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
            if (account.provider === "google") {
        const info = {
          email:profile.email,
          isVerified:profile.email_verified  ?? false,
          userName:profile.name,
          authWith:'google'
        }
       await loginWithProviders(info)
        return true;
      }
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
       async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  }
};

export default NextAuth(authOptions);
