import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import github from "next-auth/providers/github"
import db from "./db/drizzle"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  
  providers: [github],
  adapter:DrizzleAdapter(db),
  callbacks:{
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  }
})