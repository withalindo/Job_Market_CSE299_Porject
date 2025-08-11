import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


import Employee from "../models/Employee.js";
dotenv.config();
passport.use("google-employee",
    new GoogleStrategy(
        {
            clientID: process.env.Google_Client_ID,
            clientSecret: process.env.Google_Client_Secret,
            callbackURL: "http://localhost:5000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                //Checks user already exists in the database
                let employee = await Employee.findOne({ googleId: profile.id });
                if (!employee) {
                    //Creating new Employee account
                    employee = await Employee.create({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                    });
                }
                done(null, employee);

            } catch (error) {
                console.error("Error in Google Strategy:", error);
                done(error, null);
            }
        }
    )
);




//Serializing the employeeUser
passport.serializeUser((employee, done) => {
    done(null, employee.id);
});
//Deserializing the employeeUser
passport.deserializeUser(async (id, done) => {
    try {
        const employee = await Employee.findById(id);
        done(null, employee);
    } catch (err) {
        console.error("Error in deserializing user:", err);
        done(err, null);
    }
});
export default passport;
