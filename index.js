import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import cors from "cors";
import { Router } from "./routes/routes.js";
import { get } from "mongoose";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://contactms-client-eta.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use("/contactms", Router);

dotenv.config({ path: "./config/.env" });

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
