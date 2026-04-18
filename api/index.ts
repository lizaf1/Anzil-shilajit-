import express from "express";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let dbUrl = process.env.TURSO_DATABASE_URL || "";
let dbAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl.includes("://") && dbUrl.length > 0) {
  dbAuthToken = dbUrl;
  dbUrl = "libsql://shilajit-vercel-icfg-pnp2x2d6ptcixphavvafun7o.aws-ap-northeast-1.turso.io";
}

let db: ReturnType<typeof createClient> | null = null;
if (dbUrl) {
  try {
    db = createClient({
      url: dbUrl,
      authToken: dbAuthToken,
    });
    // Create tables if not exist
    db.execute(`
      CREATE TABLE IF NOT EXISTS store (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `).catch(console.error);
  } catch (error) {
    console.error("Failed to initialize Turso client:", error);
  }
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: "vercel" });
});

app.get("/api/db-test", async (req, res) => {
  if (!db) return res.status(500).json({ error: "Database client. Not initialized" });
  try {
    const result = await db.execute("SELECT 1 AS connected");
    res.json({ status: "ok", data: result.rows });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/robots", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: https://shilajit.biz.id/sitemap.xml`);
});

app.get("/api/sitemap", async (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  
  let blogUrls = "";
  if (db) {
    try {
      const result = await db.execute({
        sql: "SELECT value FROM store WHERE key = 'blogPosts'",
        args: []
      });
      if (result.rows.length > 0) {
        const posts = JSON.parse(result.rows[0].value as string);
        if (Array.isArray(posts)) {
          blogUrls = posts.map(post => `
  <url>
    <loc>https://shilajit.biz.id/blog/${post.slug || post.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("");
        }
      }
    } catch (e) {
      console.error("Sitemap generation error:", e);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://shilajit.biz.id/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://shilajit.biz.id/certificates</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://shilajit.biz.id/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>${blogUrls}
</urlset>`;

  res.send(sitemap);
});

app.get("/api/store/:key", async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  if (!db) return res.status(500).json({ error: "DB not initialized" });
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

app.post("/api/store/:key", async (req, res) => {
  if (!db) return res.status(500).json({ error: "DB not initialized" });
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

export default app;
