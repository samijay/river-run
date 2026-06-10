// ============================================================
//  River Run — Global (multiplayer-ready) leaderboard API
// ============================================================
// A Vercel Serverless Function. Stores one best-score row per player name in a
// Redis sorted set, served to every device that opens the game — the shared
// state that real-time multiplayer can build on next.
//
// Storage: any Upstash / Vercel-KV Redis. It reads these env vars (either pair):
//   KV_REST_API_URL        + KV_REST_API_TOKEN          (Vercel KV)
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash direct)
// If neither is set, it replies { configured:false } and the game uses on-device
// scores — so nothing breaks before a store is connected.
// ============================================================

const STORE_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const STORE_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const BOARD = "riverrun:board";   // sorted set: member = player name, score = best score
const LVL = "riverrun:lv";        // hash: player name -> level reached at that best score
const TOP = 10;
const RATE_MAX = 30;              // max writes per IP per minute (flood protection)

async function redis(cmd) {
  const res = await fetch(STORE_URL, {
    method: "POST",
    headers: { Authorization: "Bearer " + STORE_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  if (!res.ok) throw new Error("redis " + res.status);
  return (await res.json()).result;
}
async function pipeline(cmds) {
  const res = await fetch(STORE_URL + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + STORE_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  if (!res.ok) throw new Error("redis " + res.status);
  return (await res.json()).map((x) => x.result);
}

function cleanName(n) {
  return String(n == null ? "" : n)
    .replace(/[\x00-\x1f\x7f]/g, "")   // strip control characters
    .trim()
    .slice(0, 14) || "Anonymous";
}

async function readBoard() {
  const [flat, levels] = await pipeline([
    ["ZREVRANGE", BOARD, "0", String(TOP - 1), "WITHSCORES"],
    ["HGETALL", LVL],
  ]);
  const lv = {};
  if (Array.isArray(levels)) for (let i = 0; i < levels.length; i += 2) lv[levels[i]] = Number(levels[i + 1]) || 1;
  const board = [];
  if (Array.isArray(flat)) for (let i = 0; i < flat.length; i += 2) {
    const name = flat[i];
    board.push({ name, score: Number(flat[i + 1]) || 0, level: lv[name] || 1 });
  }
  return board;
}
async function safeBoard() { try { return await readBoard(); } catch (e) { return []; } }

// Light per-IP write throttle. Never throws — a rate-limit hiccup must not break scoring.
async function overRateLimit(req) {
  try {
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "anon";
    const n = await redis(["INCR", "riverrun:rl:" + ip]);
    if (n === 1) await redis(["EXPIRE", "riverrun:rl:" + ip, "60"]);
    return n > RATE_MAX;
  } catch (e) { return false; }
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return await new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => { data += c; if (data.length > 4096) { req.destroy(); resolve({}); } });
    req.on("end", () => { try { resolve(JSON.parse(data || "{}")); } catch (e) { resolve({}); } });
    req.on("error", () => resolve({}));
  });
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (!STORE_URL || !STORE_TOKEN) return res.status(200).json({ configured: false, board: [] });

  try {
    if (req.method === "GET") {
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ configured: true, board: await readBoard() });
    }
    if (req.method === "POST") {
      const body = await readJson(req);
      const name = cleanName(body.name);
      const score = Math.max(0, Math.min(10000000, Math.floor(Number(body.score) || 0)));
      const level = Math.max(1, Math.min(999, Math.floor(Number(body.level) || 1)));

      if (await overRateLimit(req)) return res.status(200).json({ configured: true, board: await safeBoard() });

      if (score > 0) {
        const existing = await redis(["ZSCORE", BOARD, name]);            // keep each player's BEST score
        if (existing === null || score > Number(existing)) {
          await pipeline([["ZADD", BOARD, String(score), name], ["HSET", LVL, name, String(level)]]);
        }
      }
      // The write already succeeded; a read hiccup here shouldn't report the store as down.
      return res.status(200).json({ configured: true, board: await safeBoard() });
    }
    return res.status(405).json({ error: "method not allowed" });
  } catch (e) {
    return res.status(200).json({ configured: false, board: [], error: "store unavailable" });
  }
};
