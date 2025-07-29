import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Import for __dirname equivalent

// Load environment variables first
dotenv.config();

// Import routes
import signupRoutes from "./src/routes/signupRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import postSignupEmpRoutes from "./src/routes/postSignupEmpRoutes.js"; // Import the new route

// Import Google authentication strategies
import "./src/controllers/employeeGoogleAuth.js";
import "./src/controllers/companyGoogleAuth.js";

// Import LinkedIn authentication strategies
import "./src/controllers/employeeLinkedInAuth.js";
import "./src/controllers/companyLinkedInAuth.js";

// Initialize Express app
const app = express();

// Get __dirname equivalent in ES Modules for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
// This makes uploaded images accessible via URL (e.g., http://localhost:5000/uploads/image.jpg)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.Google_Client_Secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection with better error handling
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Job Market API!");
});

// API Routes
app.use("/api/signup", signupRoutes);
app.use("/api", loginRoutes);
app.use("/auth", authRoutes);
app.use("/api/post-signup-emp", postSignupEmpRoutes); // Add the new route for employee details

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("Routes registered successfully");
});
