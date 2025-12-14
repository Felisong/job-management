import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes.js"
import dotenv from "dotenv";
dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.set("strictQuery", false);
// mongoose.set("debug", true);
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✓ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// imports routes from sister file with /api/route here
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}, http://localhost:${PORT}`);
});
