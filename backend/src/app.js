const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoute");
const authRoutes = require("./routes/authRoute");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Server error",
  });
});

module.exports = app;
