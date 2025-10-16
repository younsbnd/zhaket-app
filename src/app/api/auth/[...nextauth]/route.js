import connectToDb from "@/lib/utils/db";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import Otp from "@/models/Otp";
import { identifierSchema } from "@/lib/validations/userValidation";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  //   credentials provider for password authentication
  providers: [
    CredentialsProvider({
      id: "credentials-password",
      name: "Password",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { identifier, password } = credentials;
        await connectToDb();

        const identifierValidation = identifierSchema.safeParse({
          identifier,
        });
        if (!identifierValidation.success) {
          throw new Error(identifierValidation.error.message);
        }

        if (!password || password.length < 8) {
          throw new Error("رمز عبور حداقل باید 8 کاراکتر باشد");
        }

        const user = await User.findOne({
          $or: [{ email: identifier }, { phoneNumber: identifier }],
        });

        if (!user) {
          throw new Error("کاربری با این ایمیل یا شماره تلفن یافت نشد");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("رمز عبور اشتباه است");
        }

        return user;
      },
    }),
    //   credentials provider for otp authentication
    CredentialsProvider({
      id: "credentials-otp",
      name: "OTP",
      credentials: {
        identifier: { label: "email or phone number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials, req) {
        await connectToDb();

        const { identifier, otp } = credentials;

        const identifierValidation = identifierSchema.safeParse({ identifier });
        if (!identifierValidation.success) {
          throw new Error(identifierValidation.error.message);
        }

        if (!otp || otp.length !== 4) {
          throw new Error("کد اعتبار سنجی باید 4 رقم باشد");
        }

        const otpRecord = await Otp.findOne({
          $or: [{ email: identifier }, { phoneNumber: identifier }],
          expiresAt: { $gt: Date.now() },
        });

        if (otpRecord && otpRecord.otp !== otp) {
          throw new Error("کد اعتبار سنجی اشتباه است");
        }

        if (!otpRecord) {
          throw new Error("کد اعتبار سنجی یافت نشد یا منقضی شده است");
        }

        await Otp.deleteOne({ _id: otpRecord._id });

        let user = await User.findOne({
          $or: [{ email: identifier }, { phoneNumber: identifier }],
        });

        if (!user) {
          throw new Error("کاربری با این ایمیل یا شماره تلفن یافت نشد");
        }

        return user;
      },
    }),
  ],
  //   callbacks for jwt and session
  callbacks: {
    async jwt({ token, user, trigger, session: updateSession }) {
      if (user) {
        token.id = user._id;
        token.role = user.role;
        token.balance = user.balance || 0;
      }
      
      // Update balance when session is updated
      if (trigger === "update" && updateSession?.balance !== undefined) {
        token.balance = updateSession.balance;
      }
      
      return token;
    },
    async session({ session, token, trigger, newSession }) {
      session.user.id = token.id;
      session.user.role = token.role;
      
      // Fetch latest balance from database
      if (session.user.id) {
        await connectToDb();
        const user = await User.findById(session.user.id).select('balance');
        session.user.balance = user?.balance || 0;
      }
      
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };