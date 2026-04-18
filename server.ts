import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Turso Client
let dbUrl = process.env.TURSO_DATABASE_URL || "libsql://shilajit-vercel-icfg-pnp2x2d6ptcixphavvafun7o.aws-ap-northeast-1.turso.io";
let dbAuthToken = process.env.TURSO_AUTH_TOKEN;

// Auto-correct if the user accidentally pasted their JWT token into the URL field
if (!dbUrl.includes("://")) {
  console.warn("⚠️ TURSO_DATABASE_URL looks like a token instead of a URL. Auto-correcting...");
  dbAuthToken = dbUrl;
  dbUrl = "libsql://shilajit-vercel-icfg-pnp2x2d6ptcixphavvafun7o.aws-ap-northeast-1.turso.io";
}

let db: ReturnType<typeof createClient> | null = null;

try {
  db = createClient({
    url: dbUrl,
    authToken: dbAuthToken,
  });
  console.log("Turso database client initialized.");
} catch (error) {
  console.error("Failed to initialize Turso client:", error);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit to handle base64 images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Initialize database tables
  if (db) {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS store (
          key TEXT PRIMARY KEY,
          value TEXT
        )
      `);
      console.log("Database tables verified.");
    } catch (e) {
      console.error("Failed to create tables:", e);
    }
  }

  // API route to get stored data
  app.get("/api/store/:key", async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database client is not initialized." });
    }
    try {
      const result = await db.execute({
        sql: "SELECT value FROM store WHERE key = ?",
        args: [req.params.key]
      });
      if (result.rows.length > 0) {
        res.json({ data: JSON.parse(result.rows[0].value as string) });
      } else {
        res.json({ data: null });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // API route to save stored data
  app.post("/api/store/:key", async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database client is not initialized." });
    }
    try {
      const value = JSON.stringify(req.body.data);
      await db.execute({
        sql: "INSERT INTO store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
        args: [req.params.key, value]
      });
      res.json({ status: "ok" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // API route to test Database connection
  app.get("/api/db-test", async (req, res) => {
    if (!db) {
      return res.status(500).json({ error: "Database client is not initialized." });
    }
    
    try {
      const result = await db.execute("SELECT 1 AS connected");
      res.json({ status: "ok", data: result.rows });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Database connection failed." });
    }
  });

  // Health check API route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is online!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support React Router fallback
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
