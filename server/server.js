import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth";
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use("/api", auth);
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true }
);

app.listen(port, () => console.log(`running on port ${port}`));
