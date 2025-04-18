import express from "express";
import morgan from "morgan";
import helmet, { contentSecurityPolicy } from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js"
import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "./lib/arcjet.js"
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logs HTTP requests to the console
app.use(
    helmet({
        contentSecurityPolicy: false
    })
); // Sets various HTTP headers for security
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1  // Deduct 1 token from the bucket
        });
        console.log("Arcjet decision", decision);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: "Too Many Requests" });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ error: "No bots allowed" });
            } else {
                return res.status(403).json({ error: "Forbidden" });
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ error: "Forbidden - Spoofed Bot" });
        }

        next();
    } catch (error) {
        console.log("Error in Arcjet middleware", error);
        next(error);
    }

});
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


async function connectDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        )`;
        console.log("Database connected successfully");

    } catch (error) {
        console.log("Error connecting Database", error);
    }
}

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on port " + PORT);
        });
    })
    .catch((error) => {
        console.log("Error starting server", error);
    })

