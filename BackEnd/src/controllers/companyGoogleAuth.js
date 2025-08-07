// filepath: BackEnd/src/controllers/companyGoogleAuth.js
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Company from "../models/Company.js";

dotenv.config();

passport.use(
  "google-company",                    // ← strategy name
  new GoogleStrategy(
    {
      clientID:     process.env.Google_Client_ID,
      clientSecret: process.env.Google_Client_Secret,
      callbackURL:  "http://localhost:5000/auth/google/company/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let company = await Company.findOne({ googleId: profile.id });
        if (!company) {
          company = await Company.create({
            googleId:    profile.id,
            companyName: profile.displayName,
            email:       profile.emails[0].value,
          });
        }
        done(null, company);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Company.findById(id);
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});