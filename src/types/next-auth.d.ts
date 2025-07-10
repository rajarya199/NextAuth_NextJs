import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role?: "user" | "admin";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    role?: "user" | "admin";
  }
}