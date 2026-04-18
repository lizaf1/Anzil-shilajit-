import dotenv from 'dotenv';
import { createClient } from "@libsql/client";

dotenv.config();

let dbUrl = process.env.TURSO_DATABASE_URL || "libsql://shilajit-vercel-icfg-pnp2x2d6ptcixphavvafun7o.aws-ap-northeast-1.turso.io";
let dbAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl.includes("://") && dbUrl.length > 0) {
  dbAuthToken = dbUrl;
  dbUrl = "libsql://shilajit-vercel-icfg-pnp2x2d6ptcixphavvafun7o.aws-ap-northeast-1.turso.io";
}

const db = createClient({
  url: dbUrl,
  authToken: dbAuthToken,
});

async function run() {
  const largePayload = "x".repeat(3000000); // 3MB string
  console.log("Sending 3MB to Turso...");
  try {
    await db.execute({
      sql: "INSERT INTO store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
      args: ["test_large", largePayload]
    });
    console.log("Success! 3MB saved.");
  } catch (e: any) {
    console.error("Turso Error:", e.message);
  }
}
run();
