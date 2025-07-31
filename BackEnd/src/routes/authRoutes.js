import express from "express";
import passport from "passport";

const router = express.Router();

// Google Authentication Routes
router.get("/google", passport.authenticate("google-employee", { scope: ["profile", "email"] }));
router.get("/google/company", passport.authenticate("google-company", { scope: ["profile", "email"] }));

// LinkedIn Authentication Routes
router.get("/linkedin", passport.authenticate("linkedin-employee", { scope: ["r_emailaddress", "r_liteprofile"] }));
router.get("/linkedin/company", passport.authenticate("linkedin-company", { scope: ["r_emailaddress", "r_liteprofile"] }));

// Google Callback Routes
// Employee Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google-employee", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication for employee
    res.redirect("http://localhost:5173/PostSignupEmp"); // Redirect to the employee dash board/login
  }
);

// Company Google Callback
router.get(
  "/google/company/callback",
  passport.authenticate("google-company", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication for company
    res.redirect("http://localhost:5173/PostSignupCom"); // Redirect to the company dashboard/login
  }
);

// // Login Route
// router.get("/login", (req, res) => {
//   res.send("http://localhost:5173/dashboard"); // Replace with actual login page rendering
// });

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

export default router;
