import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dbConnection from "./config/database.js";
import userRoute from "./routes/user-routes.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

// Resolving dirname for ES module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dbConnection();
const app = express();
const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

app.use("/api", userRoute);

// Use the client app
app.use(express.static(path.join(__dirname, "/client/dist")));

// Render client for any path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});


app.listen(PORT, () => {
  console.log(`Application listening on PORT No. ${PORT}`);
});
