# AGSAPAULA — Concept B portfolio

A scroll-driven "game" portfolio: plain HTML + CSS + JavaScript with no build step, made for GitHub Pages.

## Files
```
index.html      Home: the Concept B scroll game (title → console boot → player select → world map → experience → credits).
                The page layout lives in the <template> inside index.html; its animation logic is js/game.js.
level.html      One case-study template for every game (level.html?game=tidal-wins)
bonus.html      3D models + animations gallery
css/base.css    Colors, fonts, buttons, shared pieces
css/pages.css   Level + bonus pages
js/data.js      ← ALL your content lives here (projects, links, images, videos, code)
js/common.js    Chiptune sound, contact form (EmailJS), helpers
js/game.js      Concept B scroll game logic (stages, transitions, text content)
js/scene-runtime.js  Small renderer that draws the template in index.html
profile*.png    Your photo + pixelated steps used in the photo-to-pixel transition
js/islands.js   Pixel island art for the level pages
(js/home.js and css/home.css are from the older home page and are no longer used)
js/level.js     Builds level.html from data.js
js/bonus.js     Builds bonus.html from data.js
```

## Phones
The home page has a phone layout (screens 760px wide and below). It lives in the `@media (max-width: 760px)` block
of the `<style>` inside index.html's template, plus the `isM` branches in js/game.js. The desktop layout is unaffected by both.

## Install on your GitHub Pages repo
1. Rename your current `index.html` to `classic.html`. The "Quick view" button links to it.
2. Copy all of these files and folders into the repo root, next to your images (TW1.jpg, AS1.jpg, ProfilePicture.png, Resume_AgSapaula.pdf…).
3. Commit and push. The image and video names already match the ones your old site used.

## Things to fill in (in js/data.js)
- `SITE.linkedin`, `SITE.itch`: empty links are hidden automatically.
- Per game, `stats`: real numbers, e.g. `[{ "value": "96.5%", "label": "Final RTP" }]`. This shows a LEVEL STATS section.
- Per game, `challenge`: `{ "problem": "...", "strategy": "...", "lesson": "..." }`. This shows a BOSS FIGHT section.
- Per game, `playUrl`: an itch.io / WebGL link. This shows a PLAY IT button.

## Adding a new game
Copy one object in `window.GAMES` and change it. It automatically gets an island on the world map and its own level page. The array order sets the level order.

## Test locally
Run `python -m http.server` in this folder, then open http://localhost:8000.
