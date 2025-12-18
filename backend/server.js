import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// مهم مع ES Modules
const __dirname = path.resolve();

app.use(express.json());

// routes API
app.use("/api/products", productRoutes);

// serving frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "frontend", "dist")));

	// ✅ fix هنا
	app.get("/*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "frontend", "dist", "index.html")
		);
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
