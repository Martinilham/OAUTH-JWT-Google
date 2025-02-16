import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import karyawan from "../models/karyawan.js";
import dotenv from "dotenv";

dotenv.config();

/* Passport Middleware */
passport.use(
  // ambil key di Google developer
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        console.log("✅ Google Profile:", profile); //debug profil
        console.log("🔑 Access Token:", accessToken); //debug accestoken dari google

        if (!profile.emails || profile.emails.length === 0) {
          console.error("🚨 User Tidak Ditemukan");
          return done(new Error("akun tidak memiliki Email"), null);
        }

        const email = profile.emails[0].value; //ambil email profil
        let user = await karyawan.findOne({ email }); // temukan email di database

        if (!user) {
          console.warn(`⚠️ User dengan Email : ${email} Tidak Ditemukan.`);
          return done(null, false, { message: "User tidak Terdaftar, contact admin." });
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ Error Google authentication:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await karyawan.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport