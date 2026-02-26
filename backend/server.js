
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import errorHandler from "./middleware/errorMiddleware.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//   origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.get("/", (req, res) => {
//   res.send("Backend server is running!");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

// app.use(errorHandler);

// app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ Correct CORS for local + production
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-alpha-rose-86.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Optional root
app.get("/", (req, res) => res.send("Backend is running"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);