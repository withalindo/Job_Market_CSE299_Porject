import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path"; 
import { fileURLToPath } from "url";

// Load environment variables first
dotenv.config();

// Import routes
import signupRoutes from "./src/routes/signupRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import loginComRoutes from "./src/routes/loginComRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import postSignupEmpRoutes from "./src/routes/postSignupEmpRoutes.js"; 
import postSignupEmp2Routes from "./src/routes/postSignupEmp2Routes.js";
import postSignupComRoutes from "./src/routes/postSignupComRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import homeUserRoutes from "./src/routes/HomeUserRoutes.js";
import JobPostRoutes from "./src/routes/JobPostRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";


// Import Google authentication strategies
import "./src/controllers/employeeGoogleAuth.js";
import "./src/controllers/companyGoogleAuth.js";

// Import LinkedIn authentication strategies
import "./src/controllers/employeeLinkedInAuth.js";
import "./src/controllers/companyLinkedInAuth.js";

// Import Employee model for employee info route
import Employee from "./src/models/Employee.js";

// Initialize Express app
const app = express();

// Get __dirname equivalent in ES Modules for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/companyImage', express.static(path.join(__dirname, 'src/CompanyImage')));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.Google_Client_Secret,
    resave: false,
    saveUninitialized: true,
    cookie: {

      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Job Market API!");
});

// API Routes
app.use("/api/signup", signupRoutes);
app.use("/api", loginRoutes);
app.use("/api", loginComRoutes);
app.use("/auth", authRoutes);
app.use("/api/post-signup-emp", postSignupEmpRoutes);
app.use("/api", postSignupEmp2Routes);
app.use("/api", postSignupComRoutes);
app.use("/api", jobRoutes);
app.use("/api", homeUserRoutes);
app.use("/api", JobPostRoutes);
app.use("/api", userRoutes);

// Added for Cookie testing purposes
app.get("/api/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Added: Employee info route for header
app.get("/api/employee-info", async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({});
    const employee = await Employee.findById(req.session.user);
    if (!employee) return res.status(404).json({});
    res.json({
      fullname: employee.fullname,
      // add other fields if needed
    });
  } catch (err) {
    res.status(500).json({});
  }
});

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