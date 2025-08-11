import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import Company from "../models/Company.js";

dotenv.config();

passport.use("linkedin-company",
    new LinkedInStrategy(
        {
            clientID: process.env.LinkedIn_Client_ID,
            clientSecret: process.env.LinkedIn_Client_Secret,
            callbackURL: "http://localhost:5000/auth/linkedin/company/callback",
            scope: ['r_emailaddress', 'r_liteprofile'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("LinkedIn Company Profile:", profile);

                // Check if company already exists
                let company = await Company.findOne({ linkedinId: profile.id });

                if (!company) {
                    // Create new company account
                    company = await Company.create({
                        linkedinId: profile.id,
                        companyName: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
                        email: profile.emails[0].value,
                    });
                }
                
                done(null, company);
            } catch (error) {
                console.error("Error in LinkedIn Company Strategy:", error);
                done(error, null);
            }
        }
    )
);