import passport from "passport";
import {
  Strategy as GoogleStrategy,
  type Profile,
} from "passport-google-oauth20";
import prisma from "./prismaClient.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(
            new Error("No email found from Google profile"),
            undefined
          );
        }

        //  Check if user exists by Google ID
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
          select: {
            id: true,
            email: true,
            name: true,
            googleId: true,
            authProvider: true,
            isRegistered: true,
            profilePicture: true,
          },
        });

        if (user) {
          console.log("Found existing Google user:", user.email);
          return done(null, user);
        }

        //  Check if user exists by email
        user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (user) {
          if (user.googleId) {
            console.log("User already linked with Google:", user.email);
            return done(null, user);
          }

          // Link Google account to existing email/password user
          console.log("Linking Google account for existing user:", user.email);
          const updatedUser = await prisma.user.update({
            where: { email: email.toLowerCase() },
            data: {
              googleId: profile.id,
              authProvider: "google", // you could keep as "email" if you want dual login
              profilePicture: profile.photos?.[0]?.value || user.profilePicture,
            },
            select: {
              id: true,
              email: true,
              name: true,
              googleId: true,
              authProvider: true,
              isRegistered: true,
              profilePicture: true,
            },
          });

          return done(null, updatedUser);
        }

        //  Create new user with Google
        const newUser = await prisma.user.create({
          data: {
            googleId: profile.id,
            email: email.toLowerCase(),
            name: profile.displayName || "User",
            profilePicture: profile.photos?.[0]?.value || null,
            authProvider: "google",
            isRegistered: true,
            verifyCode: null,
            verifyCodeExpiresAt: null,
          },
          select: {
            id: true,
            email: true,
            name: true,
            googleId: true,
            authProvider: true,
            isRegistered: true,
            profilePicture: true,
          },
        });

        console.log("Created new Google user:", newUser.email);
        return done(null, newUser);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;
