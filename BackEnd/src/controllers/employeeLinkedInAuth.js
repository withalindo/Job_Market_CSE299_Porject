import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";

import Employee from "../models/Employee.js";

dotenv.config();

passport.use("linkedin-employee",
    new LinkedInStrategy(
        {
            clientID: process.env.LinkedIn_Client_ID,
            clientSecret: process.env.LinkedIn_Client_Secret,
            callbackURL: "http://localhost:5000/auth/linkedin/callback",

            scope: ['r_emailaddress', 'r_liteprofile'],

        },

        async (accessToken, refreshToken, profile, done) => {

            try {
                console.log("LinkedIn Employee Profile:", profile);

                let employee = await Employee.findOne({ linkedinId: profile.id });

                if (!employee) {
                    employee = await Employee.create({
                        linkedinId: profile.id,
                        username: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
                        email: profile.emails[0].value,
                    });
                }
                done(null, employee);
            } catch (error) {
                console.error("Error in LinkedIn Strategy:", error);
                done(error, null);

            }
        }


    )
);