import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utilz/db.js";
import userroute from "./routes/user.route.js";
import companyroute from "./routes/company.route.js";
import jobroute from "./routes/job.route.js";
import applicationroute from "./routes/application.route.js";


const app = express();
dotenv.config({});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://job-frontend-qfve.vercel.app/", // Fixed URL typo
  credentials: true, // Fixed typo: `Credentials` to `credentials`
};
app.use(cors(corsOptions));

// Connect to Database
connectDB();

// Routes
app.use("/api/v1/user", userroute); // Fixed missing `/` in route prefix
app.use("/api/v1/company", companyroute); // Fixed missing `/` in route prefix
app.use("/api/v1/job", jobroute); // Fixed missing `/` in route prefix
app.use("/api/v1/application", applicationroute); // Fixed missing `/` in route prefix

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
