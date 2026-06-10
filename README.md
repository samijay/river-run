# 🛶 River Run

A little river-boat game that runs right in your web browser. Pick a boat, paddle down
the river, **grab coins** 🪙, **dodge the rocks** 🪨 — and survive long enough to **level up**,
where the river speeds up and new hazards (logs, sticks, jumping fish, and fisherman boats)
start showing up.

Built to be **easy to change** so the nephews can learn by tinkering. The whole game is one
file (`index.html`) with friendly comments and a clearly-marked **TWEAK ZONE**.

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
Each level lasts about **35 seconds** — survive it and you advance. The gold bar across the
very top shows how close you are to the next level.

---

## 📈 What changes as you level up

| Level | What appears |
|---|---|
| 1 | A few **rocks** 🪨 + coins 🪙 — learn to steer and jump |
| 2 | **Logs** 🪵 and **sticks**, plus "rock walls" with a gap to thread |
| 3 | **Jumping fish** 🐟 that weave (you can't jump over these!) + **gems** 💎 worth more |
| 4+ | **Fisherman boats** 🚣 that drift side to side, faster water, more coins |

> 💡 **Jumping** lets you pass over rocks, logs, and sticks — but **not** fish or boats.
> Those you have to steer around.

After you finish **Level 1**, the game asks if you'd like to add a **name to the leaderboard**
(totally optional). Top scores are saved on your computer and shown on the start screen.
New boats — **⛵ Sailboat** (Level 2) and **🚤 Speedboat** (Level 3) — unlock as you progress.

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

- **Shield power-up** — a special item that protects you for a few seconds.
- **A coin shop** — spend collected coins to buy the sailboat/speedboat/submarine.
- **Rapids** — a stretch where the river pushes your boat sideways.
- **A bridge or waterfall** — a mini event between levels.
- **Day/night** — change the water colors as the levels go up.

---

## 🧰 What's under the hood (for the curious)

- **Plain HTML, CSS, and JavaScript** — no frameworks, no build step, nothing to install.
- It draws on an **HTML `<canvas>`** (a digital sketchpad the code paints ~60 times a second).
- Boats, coins, and most obstacles are just **emoji** drawn as text — so there are no image files.
- Sounds are generated live by the browser's **Web Audio**, so there are no sound files either.

Have fun out there! 🛶⭐
