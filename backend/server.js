import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import timberRouters from "./routes/timber.route.js";
import classificationRouters from "./routes/classification.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allow us to accept JSON data in the req.body

app.use("/app/timbers", timberRouters)
app.use("/app/classifications", classificationRouters)

app.listen(5000, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});