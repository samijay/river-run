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

**Controls**
| Action | Keys | Or… |
|---|---|---|
| Steer | **← ↑ → ↓** arrow keys (or **W A S D**) | move your **mouse / finger** |
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
| 5, 10, 15… | **Rapids** speed the river up — and every 5th level is a **checkpoint** |
| 10+ | **Submerged whirlpools** lurk underwater — steer around them |

> 💡 **Jumping** clears rocks, logs, and sticks — but **not** fish, boats, or whirlpools.
> The **Submarine** is special: it **dives** (Space) to slip under everything on the surface.

**Leaderboard:** after Level 1 (and at Game Over) the game always asks **who's playing** —
keep the name or type a new one, so siblings can take turns. Top scores save on your computer.

**Boats unlock every 3 levels:** ⛵ Sailboat (Lv 3), 🚤 Speedboat (Lv 6), 🤿 Submarine (Lv 9).
Between levels, tap **🛟 Dock & Shop** to switch to any boat you own, or spend coins on upgrades
(Racing Flag, Golden Crown, Coin Magnet, Bumper Shield, Speed Tune, Extra Heart).

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
- **Your own backdrop** — drop a picture at `assets/river-bg.png` (see that folder's note).

---

## 🧰 What's under the hood (for the curious)

- **Plain HTML, CSS, and JavaScript** — no frameworks, no build step, nothing to install.
- It draws on an **HTML `<canvas>`** (a digital sketchpad the code paints ~60 times a second).
- The art is drawn by code (coins, gems, logs, fish, the forest, the boats) plus a few **emoji** — no image files needed.
- Sounds are generated live by the browser's **Web Audio**, so there are no sound files either.

Have fun out there! 🛶⭐

---

## 🎮 Credits

**River Run** — a game by **Ezra & Eli Simon-Harris**
🎮 **E Brothers Gaming Corp.** · June 9, 2026
