const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const apiRoutes = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5001",
      "http://localhost:5002",
      "http://localhost:5174",
      process.env.FRONTEND_URL,
      process.env.BLOG_ADMIN_URL,
      "https://blog-api-project-frontend2-auth.vercel.app/login",
      "https://blog-api-project-frontend2-auth.vercel.app/",
      "https://blog-api-project-frontend1-blog.vercel.app/",
    ], // Dashboard and public blog
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", apiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
