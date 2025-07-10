import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { connectToDatabase } from "@/utils/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                  email:{label:"Email",type:"text"},
            password:{label:"Password",type:"password"},
                    username: { label: "Username", type: "text" },

            },
            async authorize(credentials){
                  if(!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required");
                
            }
            try{
                await connectToDatabase()
                const user=await User.findOne({
                     $or: [
            { email: credentials.email },
            { username: credentials.username }
          ]
                })

                   if(!user){
                throw new Error("User not found");
            }
            //compare password
            const isPassword=await bcrypt.compare(
                credentials.password,
                user.password
            )
            if(!isPassword){
                throw new Error("invalid password")
            }

            //return auth user data
            return user;
            }
            catch(error){
 console.error("auth error",error)
                    return null;
            }
            }

        }),
       GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    ],

    callbacks:{

        async signIn({user,account,profile}){
try{
                    await connectToDatabase()
      const existingUser = await User.findOne({ email: user.email });
 if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
            username:user.name?.toLowerCase().replace(/ /g, "") +
            Math.floor(Math.random() * 1000),
          image: user.image,
          provider: account?.provider,
          emailVerified: new Date(),
        });
      }
            return true;

}
catch(error){
 console.error("auth error",error)
 return false

}
        },
        async jwt({token,user}){
            if(user){
                token.id=user.id //keep user id in token
            }
            return token
        },
        //customize session
        async session({session,token}){
            if(session.user){
                 session.user.id=token.id as string;
                     session.user.role = token.role as "user" | "admin";

            }
            return session;
        }
    },

    //location of pages
    pages:{
        signIn:"/login",
        error:"/login"
    },
     session:{
    strategy:"jwt", // Use JWT for session management
    maxAge:30 * 24 * 60 * 60, // 30 days
   },
   secret:process.env.NEXTAUTH_SECRET
}