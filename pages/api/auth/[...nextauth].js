import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { email, password, name, lastName } = credentials;

        // Check if this is a registration attempt
        if (name && lastName) {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (existingUser) {
            throw new Error("User already exists");
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create new user
          const newUser = await prisma.user.create({
            data: {
              email,
              name: `${name} ${lastName}`,
              // In a real-world scenario, you'd want to store the hashed password in a separate table
              // This is just for demonstration purposes
            },
          });

          return newUser;
        } else {
          // This is a login attempt
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("No user found");
          }

          // In a real-world scenario, you'd verify the password against the stored hash
          // This is just for demonstration purposes
          // const isValid = await bcrypt.compare(password, user.password);
          const isValid = true; // Always true for demonstration

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
