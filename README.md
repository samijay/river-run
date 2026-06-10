# 🛶 River Run

A little river-boat game that runs right in your web browser. Pick a boat, paddle down
the river, **grab coins** 🪙, **dodge the rocks** 🪨 — and survive long enough to **level up**,
where the river speeds up and new hazards (logs, sticks, jumping fish, and fisherman boats)
start showing up.

Built to be **easy to change** so the nephews can learn by tinkering. The whole game is one
file (`index.html`) with friendly comments and a clearly-marked **TWEAK ZONE**.

**▶ Play it online:** https://sunriverrun.vercel.app

*A game by **Ezra & Eli Simon-Harris** — 🎮 E Brothers Gaming Corp. · June 9, 2026*

---

## ▶️ How to play

1. Open the `river-run` folder.
2. **Double-click `index.html`.** It opens in your web browser — nothing to install!
3. Pick your boat (🛶 Canoe or 🛟 Lazy Tube) and go.

**Controls** — three ways to steer, whichever feels best:
| Action | Keys | Touch / mouse |
|---|---|---|
| Steer | **← ↑ → ↓** arrows (or **W A S D**) | **hold** the mouse / finger on the river to glide there, or use the on-screen **◀ ▶** buttons |
| Jump (hop over rocks, logs, sticks) | **Spacebar** | the **⤴ Jump** button |
| Sound on/off | **M** | the **🔊** button |

**Goal:** earn points by surviving and catching coins. You have **3 lives** (❤️ at the top).
Each level lasts about **30 seconds** — survive it and you advance. The gold bar across the
very top shows how close you are to the next level.

---

## 📈 What changes as you level up

| Level | What appears |
|---|---|
| 1 | A few **rocks** 🪨 + **gold coins** 🪙 — learn to steer and jump |
| 2 | **Brown logs & sticks**, plus "rock walls" with a gap to thread |
| 3 | **Red / yellow / green fish** that weave (can't jump these!) + **blue gems** 💎 worth 50 |
| 4+ | **Fisherman boats** 🚣 that drift side to side, faster water, more coins |
| **5** | 🦦 **Surprise! A river otter joins** you and gives a permanent **+1 life** |
| **7** | 🐶 **Surprise! Olive the cavapoo** (black, with a white chin) hops aboard your boat |
| 5, 10, 15… | **Rapids** speed the river up — and every 5th level is a **checkpoint** |
| 10+ | **Submerged whirlpools** lurk underwater — steer around them |

> 💡 **Jumping** clears rocks, logs, and sticks — but **not** fish, boats, or whirlpools.
> The **Submarine** is special: it **dives** (Space) to slip under everything on the surface.

**Leaderboard:** after Level 1 (and at Game Over) the game always asks **who's playing** —
keep the name or type a new one, so siblings can take turns. Scores save on your device, and once
the online store is connected (below), the board goes **🌐 global** — everyone who opens the link
competes on one shared leaderboard.

**Boats unlock every 3 levels:** ⛵ Sailboat (Lv 3), 🚤 Speedboat (Lv 6), 🤿 Submarine (Lv 9).
Between levels, tap **🛟 Dock & Shop** to switch to any boat you own, or spend coins on upgrades
(Racing Flag, Golden Crown, Coin Magnet, Bumper Shield, Speed Tune, Extra Heart).

---

## 🌐 Global leaderboard (multiplayer-ready)

Out of the box, scores save per device. To turn on **one shared leaderboard for everyone who opens
the link** (the foundation for future multiplayer), connect a free Redis store to the Vercel project
— **no code changes needed**:

1. **Vercel dashboard** → the **sunriverrun** project → **Storage** → **Create Database**.
2. Choose **Upstash for Redis** (free tier) and connect it to the project. Vercel auto-adds the
   `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables.
3. **Redeploy** (or push a commit). Done — the in-game board now reads **🌐 Global Leaderboard**.

Until then, the game just uses the on-device board, so nothing breaks. The backend is a tiny
serverless function (`api/scores.js`) that keeps each player's best score.

---

## 🎮 Make it your OWN game (the fun part)

1. Open `index.html` in a text editor (**VS Code** is great and free).
2. Near the top, find **`🎮 TWEAK ZONE 🎮`**.
3. Change a number or an emoji, **save**, and **refresh** the browser.

### Fun things to try first
| Want to… | Change this | Try |
|---|---|---|
| Be a different boat | `BOATS` → `canoe: { emoji: "🛶" …` | `"🦆"`, `"🐊"`, `"🚀"` |
| Make it easier | `lives` | `5` |
| Slow the river down | `baseScroll` | `2` |
| Reach new levels faster | `levelDuration` | `15` (seconds) |
| More coins | `baseCoinEvery` | `0.8` |
| Jump higher | `jumpLift` | `50` |
| Change the water color | `waterTop` / `waterBottom` | any color like `"#114488"` |
| Turn off sound | `soundOn` | `false` |

> Broke something? Press **Cmd/Ctrl + Z** to undo, save, and refresh. You can't break it permanently.

---

## 🛠️ Ideas to build next

The code is split into labeled `SECTION` comments to help you find things:

- **A bridge or waterfall** — a mini event between levels.
- **Day/night** — change the water colors as the levels go up.
- **Combo bonus** — extra points for grabbing coins without getting hit.
- **More boats** — add one to the `BOATS` list with an `unlockLevel` of 12, 15, …
- **Swap the backdrop** — replace `assets/river-bg.jpg` with any tall picture (see that folder's note).

---

## 🧰 What's under the hood (for the curious)

- **Plain HTML, CSS, and JavaScript** — no frameworks, no build step, nothing to install.
- It draws on an **HTML `<canvas>`** (a digital sketchpad the code paints ~60 times a second).
- The art is drawn by code (coins, gems, logs, fish, the otter & Olive, the boats) plus a few **emoji**, over one cartoony **background image** (`assets/river-bg.jpg`).
- Sounds are generated live by the browser's **Web Audio**, so there are no sound files either.
- The **global leaderboard** is a tiny Vercel serverless function (`api/scores.js`) backed by Redis.

Have fun out there! 🛶⭐

---

## 🎮 Credits

**River Run** — a game by **Ezra & Eli Simon-Harris**
🎮 **E Brothers Gaming Corp.** · June 9, 2026
