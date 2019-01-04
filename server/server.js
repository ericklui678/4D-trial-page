import express from "express";
import auth from "./routes/auth";
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.use("/api", auth);

app.listen(port, () => console.log(`running on port ${port}`));
