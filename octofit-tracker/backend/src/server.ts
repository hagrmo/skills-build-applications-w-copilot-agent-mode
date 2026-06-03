import express from "express";
import mongoose from "mongoose";

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/octofit-tracker";

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
      console.log(`MongoDB URI: ${mongoUri}`);
    });
  } catch (error) {
    console.error("Failed to start backend", error);
    process.exit(1);
  }
};

void startServer();
