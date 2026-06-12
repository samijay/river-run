// ============================================================
//  River Run — Global leaderboard API
// ============================================================
// Vercel Serverless Function. Stores one best-score row per player name in a
// private GitHub Gist (scores.json), served to every device that opens the game.
//
// Required env vars:
//   GIST_ID      — the GitHub Gist ID holding scores.json
//   GITHUB_TOKEN — a token with the "gist" scope
//
// If neither is set, replies { configured:false } and the game uses on-device
// scores — so nothing breaks if env vars aren't present.
// ============================================================

const GIST_ID = process.env.GIST_ID || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const TOP = 10;

function cleanName(n) {
  return String(n == null ? "" : n)
    .replace(/[\x00-\x1f\x7f]/g, "")
    .trim()
    .slice(0, 14) || "Anonymous";
}

async function readBoard() {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: { Authorization: "token " + GITHUB_TOKEN, "User-Agent": "river-run-game" },
  });
  if (!res.ok) throw new Error("gist read " + res.status);
  const data = await res.json();
  const raw = data.files["scores.json"]?.content || "[]";
  try { return JSON.parse(raw); } catch (e) { return []; }
}

async function writeBoard(board) {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: "token " + GITHUB_TOKEN,
      "User-Agent": "river-run-game",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ files: { "scores.json": { content: JSON.stringify(board) } } }),
  });
  if (!res.ok) throw new Error("gist write " + res.status);
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

  if (!GIST_ID || !GITHUB_TOKEN) return res.status(200).json({ configured: false, board: [] });

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

      if (score > 0) {
        const board = await readBoard();
        const idx = board.findIndex(e => e.name === name);
        if (idx === -1 || score > board[idx].score) {
          if (idx !== -1) board.splice(idx, 1);
          board.push({ name, score, level });
          board.sort((a, b) => b.score - a.score);
          await writeBoard(board.slice(0, TOP));
        }
        return res.status(200).json({ configured: true, board: board.slice(0, TOP) });
      }

      return res.status(200).json({ configured: true, board: await readBoard() });
    }

    return res.status(405).json({ error: "method not allowed" });
  } catch (e) {
    return res.status(200).json({ configured: false, board: [], error: "store unavailable" });
  }
};
