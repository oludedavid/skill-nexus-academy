import NextAuth, { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/mongoDBAdapter";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/lib/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: profile.role ?? "student",
          id: profile.sub.toString(),
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          role: profile.role ?? "student",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "muller@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        await dbConnect();

        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) throw new Error("Invalid email or password");

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) throw new Error("Invalid email or password");

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          throw new Error("Invalid login credentials error: " + error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      await dbConnect();
      const existingUser = await UserModel.findOne({ email: user.email });
      if (!existingUser) {
        return true;
      }
      if (
        existingUser.provider &&
        existingUser.provider !== account?.provider
      ) {
        throw new Error("OAuthAccountNotLinked");
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role || (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const auth = NextAuth(authOptions);
export const signIn = NextAuth(authOptions);
export const signOut = NextAuth(authOptions);
