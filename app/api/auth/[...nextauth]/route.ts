// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const prisma = new PrismaClient();

// const handler = NextAuth({
//   adapter: PrismaAdapter(prisma),

//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       return true;
//     },
//     async session({ session, user }) {
//       session.user.id = user.id;
//       return session;
//     },
//   },

//   session: {
//     strategy: "database",
//     maxAge: 30 * 24 * 60 * 60,
//   },

//   debug: process.env.NODE_ENV === "development",
// });

// export { handler as GET, handler as POST };



import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },

  session: {
    strategy: "database", // Uses Prisma database sessions
    maxAge: 30 * 24 * 60 * 60,
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
