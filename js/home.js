/* ===== Home: scroll drives the game =====
   Scroll progress p (0 → 1) through a tall page moves a sticky 100vh stage
   through six scenes: TITLE → BOOT → PLAYER SELECT → WORLD MAP → BOSS → CREDITS. */
(function () {
  const { $, esc, Sound } = window.AG;
  const S = window.SITE, GAMES = window.GAMES;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const px = (v) => v.toFixed(1) + 'px';
  const levelUrl = (g, hash) => 'level.html?game=' + encodeURIComponent(g.slug) + (hash || '');

  const scenes = [
    { id: 'title', name: 'TITLE SCREEN', a: 0, b: 0.1, short: 'START', E: 0, z: 11 },
    { id: 'boot', name: 'BOOTING', a: 0.1, b: 0.235, short: 'BOOT', E: 0, z: 10 },
    { id: 'player', name: 'PLAYER SELECT', a: 0.235, b: 0.37, short: 'P1', E: 0.025, z: 12 },
    { id: 'world', name: 'WORLD MAP', a: 0.37, b: 0.78, short: 'MAP', E: 0.03, z: 13 },
    { id: 'boss', name: 'BOSS LEVEL', a: 0.78, b: 0.88, short: 'BOSS', E: 0.025, z: 14 },
    { id: 'credits', name: 'CREDITS', a: 0.88, b: 1.0001, short: 'END', E: 0.045, z: 15 }
  ];
  const INS_A = 0.09, INS_B = 0.13, CAB_A = 0.13, CAB_B = 0.16, CRT_A = 0.16, CRT_B = 0.185, LOAD_B = 0.205, SW_A = 0.205, SW_B = 0.215, ZOOM_A = 0.215, ZOOM_B = 0.26;

  /* ---------- Bind elements ---------- */
  const bound = {};
  document.querySelectorAll('[data-s]').forEach((el) => { bound[el.getAttribute('data-s')] = { el: el, css: null }; });
  const setCss = (key, css) => { const b = bound[key]; if (b && b.css !== css) { b.css = css; b.el.style.cssText = css; } };
  const attrCache = new Map();
  const setAttr = (el, name, val) => { const k = el.id + name; if (attrCache.get(k) !== val) { attrCache.set(k, val); el.setAttribute(name, val); } };
  const textCache = new Map();
  const setText = (el, val) => { if (textCache.get(el) !== val) { textCache.set(el, val); el.textContent = val; } };

  /* ---------- Static content from data.js ---------- */
  $('#portrait').style.backgroundImage = 'url("' + S.portrait + '")';
  $('#quickView').href = S.classicSite || 'classic.html';
  $('#cvBtn').href = S.resume;
  window.AG.socialLinks($('#socialLinks'));
  window.AG.bindSound($('#soundBtn'));
  window.AG.contact($('#hireBtn'));

  const inv = [['Unity', 'MAIN'], ['C#', 'MAIN'], ['Unreal', 'RARE'], ['C++', 'RARE'], ['Maya', 'EPIC'], ['Blender', 'EPIC'], ['Git', 'TOOL'], ['Substance', 'TOOL']];
  $('#inventory').innerHTML = inv.map((it, i) => '<div class="' + (i < 2 ? 'main' : '') + '"><b>' + it[0] + '</b><i>' + it[1] + '</i></div>').join('');

  /* Terrain for the title screen (procedural wireframe mountains) */
  (function buildTerrain() {
    const rows = 18, cols = 34;
    const height = (x, z) => {
      const peak = (px0, pz, h, s) => h * Math.exp(-((x - px0) * (x - px0) + (z - pz) * (z - pz)) / s);
      return peak(-1.25, 4.2, 2.1, 0.5) + peak(1.35, 3.6, 1.6, 0.4) + peak(0.15, 10, 2.2, 3) + peak(-2.6, 9, 2.4, 2) + peak(3, 9.5, 2.6, 2.2) + 0.18 * (Math.sin(x * 3.7 + z * 1.3) * Math.cos(z * 2.1 - x)) + 0.12;
    };
    const P = [];
    for (let r = 0; r < rows; r++) {
      const z = 1.2 + r * 0.6, row = [];
      for (let c = 0; c < cols; c++) { const x = -4.5 + (c / (cols - 1)) * 9; row.push([720 + (x / z) * 820, 540 + ((1 - height(x, z)) / z) * 420]); }
      P.push(row);
    }
    const f = (pt) => pt[0].toFixed(1) + ' ' + pt[1].toFixed(1);
    const mesh = (r0, r1) => {
      let d = '';
      for (let r = r0; r <= r1; r++) { d += 'M' + f(P[r][0]); for (let c = 1; c < cols; c++) d += 'L' + f(P[r][c]); }
      for (let c = 0; c < cols; c++) { d += 'M' + f(P[r0][c]); for (let r = r0 + 1; r <= r1; r++) d += 'L' + f(P[r][c]); }
      for (let r = r0; r < r1; r++) for (let c = 0; c < cols - 1; c++) d += (r + c) % 2 ? 'M' + f(P[r][c]) + 'L' + f(P[r + 1][c + 1]) : 'M' + f(P[r][c + 1]) + 'L' + f(P[r + 1][c]);
      const pts = []; for (let r = r0; r <= r1; r++) for (let c = 0; c < cols; c++) pts.push(P[r][c]);
      const top = [], bins = 96;
      for (let k = 0; k <= bins; k++) {
        const x0 = -200 + (k / bins) * 1840, x1 = x0 + 1840 / bins; let best = 900;
        pts.forEach((pt) => { if (pt[0] >= x0 && pt[0] < x1 && pt[1] < best) best = pt[1]; });
        top.push([x0, best]);
      }
      return { d: d, fill: 'M-200 900L' + top.map(f).join('L') + 'L1640 900Z' };
    };
    const near = mesh(0, 8), far = mesh(8, rows - 1);
    $('#nearD').setAttribute('d', near.d); $('#nearFill').setAttribute('d', near.fill);
    $('#farD').setAttribute('d', far.d); $('#farFill').setAttribute('d', far.fill);
  })();

  /* Powder particles (seeded so they look the same every visit) */
  const pal = ['#79C0FF', '#58A6FF', '#E6EDF3', '#FFFFFF', '#1F6FEB', '#9ECBFF', '#C9D1D9', '#3A6FB8', '#0D2A5C', '#DDEBFF'];
  let seed = 7;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const powderBox = $('#powder');
  const powder = [];
  for (let i = 0; i < 180; i++) {
    const d = { x: rnd() * 110 - 5, y: rnd() * 110 - 5, b: rnd() * 0.55, L: 0.3 + rnd() * 0.22, spin: (2.2 + rnd() * 2.4) * (rnd() < 0.85 ? 1 : -1), size: 2 + Math.floor(rnd() * 6), color: pal[Math.floor(rnd() * pal.length)], glow: rnd() < 0.35 };
    d.el = document.createElement('div');
    d.el.style.cssText = 'display:none';
    d.css = 'display:none';
    powderBox.appendChild(d.el);
    powder.push(d);
  }

  /* World map: islands, far islands, clouds */
  const N = GAMES.length, SP = 380;
  const cy = (i) => (i % 2 ? 146 : 82);
  const tree = (cls) => '<svg class="i-tree ' + cls + '" viewBox="0 0 10 13" aria-hidden="true"><rect x="3" y="0" width="4" height="2" fill="#1A7F37"/><rect x="1" y="2" width="8" height="3" fill="#2EA043"/><rect x="0" y="5" width="10" height="4" fill="#1A7F37"/><rect x="4" y="9" width="2" height="4" fill="#6B4423"/></svg>';
  const track = $('#track');
  const nodeEls = GAMES.map((g, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'node locked';
    b.style.paddingTop = (cy(i) - 32) + 'px';
    b.setAttribute('aria-label', 'Level ' + (i + 1) + ': ' + g.title);
    b.innerHTML = '<div class="island"><div class="i-ripple"></div><div class="i-cliff"></div><div class="i-sand"></div><div class="i-grass"></div>' + tree('a') + tree('b') + '<div class="i-sign">' + (i + 1) + '</div></div><span class="n-title">' + esc(g.title) + '</span><span class="n-badge">LOCKED</span>';
    b.addEventListener('click', () => jumpToLevel(i));
    track.appendChild(b);
    return { el: b, badge: b.querySelector('.n-badge'), state: '' };
  });
  const pathD = GAMES.map((g, i) => (i ? 'L' : 'M') + (SP / 2 + i * SP) + ' ' + cy(i)).join(' ');
  $('#pathBase').setAttribute('d', pathD);
  $('#pathDone').setAttribute('d', pathD);
  $('#trackSvg').setAttribute('width', String(N * SP));
  $('#levelCount').textContent = String(N);

  let fi = '';
  for (let i = 0; i < 14; i++) { const x = 60 + i * 260 + ((i * 97) % 120), y = 150 + ((i * 53) % 230), s = 0.45 + ((i * 37) % 40) / 100; fi += '<div class="far-isle" style="left:' + x + 'px;top:' + y + 'px;width:' + (90 * s).toFixed(0) + 'px;height:' + (34 * s).toFixed(0) + 'px"></div>'; }
  $('#farIslands').innerHTML = fi;
  let cl = '';
  for (let i = 0; i < 10; i++) { const x = 120 + i * 520 + ((i * 131) % 200), y = 140 + ((i * 71) % 260), s = 0.8 + ((i * 29) % 60) / 100; cl += '<div class="cloud" style="left:' + x + 'px;top:' + y + 'px;width:' + (110 * s).toFixed(0) + 'px;height:' + (34 * s).toFixed(0) + 'px;animation-delay:' + (i * -0.7).toFixed(1) + 's"></div>'; }
  $('#clouds').innerHTML = cl;

  /* Jump nav */
  const jumpBtns = scenes.map((s, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = s.short; b.setAttribute('aria-label', 'Jump to ' + s.name.toLowerCase());
    b.addEventListener('click', () => jumpTo(i === 0 ? 0 : (s.id === 'boot' ? 0.075 : Math.min(0.999, s.a + s.E + (s.b - s.a) * 0.12))));
    $('#jumps').appendChild(b);
    return b;
  });

  /* ---------- Scroll + mouse state ---------- */
  const game = $('#game'), stage = $('#stage');
  let p = 0, mx = 0, my = 0, raf = 0, W = 1440, H = 900;
  const maxScroll = () => Math.max(1, game.offsetHeight - stage.offsetHeight);
  function readScroll() { p = clamp((window.scrollY - game.offsetTop) / maxScroll(), 0, 1); }
  function measure() { W = stage.clientWidth || window.innerWidth; H = stage.clientHeight || window.innerHeight; }
  function jumpTo(frac) { window.scrollTo({ top: game.offsetTop + frac * maxScroll(), behavior: 'smooth' }); }
  function jumpToLevel(i) {
    const w = scenes[3];
    const local = 0.1 + (N > 1 ? i / (N - 1) : 0) * 0.82;
    jumpTo(w.a + local * (w.b - w.a));
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; readScroll(); render(); }); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => { measure(); schedule(); });
  const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (finePointer) {
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      my = ((e.clientY - r.top) / r.height) * 2 - 1;
      schedule();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.target.closest && e.target.closest('input, textarea, .modal')) return;
    if (current === 3 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); jumpToLevel(clamp(active + (e.key === 'ArrowRight' ? 1 : -1), 0, N - 1)); }
    if (current === 3 && e.key === 'Enter' && !e.target.closest('a, button')) window.location.href = levelUrl(GAMES[active]);
  });

  /* ---------- Render ---------- */
  let current = -1, active = -1, lastScene = -1;
  const stageBg = 'background: radial-gradient(ellipse at 50% 120%, #0D2A5C 0%, #0D1117 45%, #010409 100%);';

  function setLevel(i) {
    const g = GAMES[i];
    $('#levelNo').textContent = String(i + 1);
    $('#lvlKind').textContent = g.kind;
    $('#lvlTitle').textContent = g.title;
    $('#lvlBlurb').textContent = g.blurb;
    $('#lvlRole').textContent = g.role;
    $('#lvlBuilt').innerHTML = g.built.map((b) => '<div><span>+1</span><span>' + esc(b) + '</span></div>').join('');
    $('#lvlEnter').href = levelUrl(g);
    $('#lvlWatch').href = levelUrl(g, '#cutscene');
    const thumb = $('#lvlThumb');
    thumb.href = levelUrl(g, '#cutscene');
    thumb.style.backgroundImage = 'url("' + g.cover + '")';
    thumb.setAttribute('aria-label', 'Watch ' + g.title + ' gameplay');
    const card = $('#mapCard');
    card.classList.remove('anim'); void card.offsetWidth; card.classList.add('anim');
    nodeEls.forEach((n, k) => {
      const st = k === i ? 'now' : (k < i ? 'done' : 'locked');
      if (n.state !== st) { n.state = st; n.el.className = 'node ' + st; n.badge.textContent = st === 'now' ? 'NOW PLAYING' : (st === 'done' ? 'CLEARED' : 'LOCKED'); }
    });
  }

  function render() {
    const seg = (a, b) => clamp((p - a) / (b - a), 0, 1);
    let cur = 0;
    scenes.forEach((s, i) => { if (p >= s.a) cur = i; s.local = (p - s.a) / (s.b - s.a); s.fi = s.E ? clamp((p - s.a) / s.E, 0, 1) : 1; });
    current = cur;

    scenes.forEach((s, i) => {
      if (s.id === 'player') return;
      const next = scenes[i + 1];
      const until = next ? next.a + next.E + 0.01 : 2;
      const from = s.id === 'boot' ? 0 : s.a - 0.0001;
      const vis = p >= from && p < until;
      const fe = ease(s.fi);
      let extra = '';
      if (s.id === 'boot') extra = 'background: radial-gradient(ellipse at 50% 30%, #0E1B33 0%, #070C16 55%, #03060C 100%);';
      else if (s.id === 'world') extra = 'background: radial-gradient(ellipse at 50% 35%, #0D4A80 0%, #072A52 48%, #031326 100%); clip-path: inset(0 0 0 ' + ((1 - fe) * 100).toFixed(2) + '%);';
      else if (s.id === 'boss') extra = stageBg + 'opacity: ' + fe.toFixed(3) + ';';
      else if (s.id === 'credits') extra = 'background: #000; border-top: 1px solid rgba(88,166,255,.35); box-shadow: 0 -30px 80px rgba(0,0,0,.7); transform: translateY(' + ((1 - fe) * 100).toFixed(2) + '%); border-radius: ' + (40 * (1 - fe)).toFixed(1) + 'px ' + (40 * (1 - fe)).toFixed(1) + 'px 0 0;';
      setCss('sc.' + s.id, 'position: absolute; inset: 0; overflow: hidden; z-index: ' + s.z + '; visibility: ' + (vis ? 'visible' : 'hidden') + '; pointer-events: ' + (i === cur ? 'auto' : 'none') + '; ' + extra);
    });

    /* Title parallax */
    const lt = clamp(scenes[0].local, 0, 1);
    const layer = (sy, md, sc, o) => 'transform: translate(' + px(-mx * md) + ', ' + px(sy - my * md * 0.5) + ') scale(' + sc.toFixed(4) + '); transform-origin: ' + o + ';';
    setCss('sunStyle', 'position: absolute; left: 50%; top: 52%; width: 900px; height: 900px; margin: -450px 0 0 -450px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(121,192,255,.75) 16%, rgba(31,111,235,.35) 34%, transparent 62%); ' + layer(lt * 110, 8, 1 + 0.12 * lt, '50% 50%'));
    setCss('farStyle', 'position: absolute; left: -4%; top: -4%; width: 108%; height: 108%; ' + layer(lt * 60, 16, 1 + 0.06 * lt, '50% 60%'));
    setCss('fogStyle', 'position: absolute; left: -10%; right: -10%; top: 50%; height: 22%; background: linear-gradient(rgba(11,35,80,0), rgba(30,80,160,.35), rgba(11,35,80,0)); animation: flicker 5s ease-in-out infinite; ' + layer(lt * 100, 24, 1, '50% 50%'));
    setCss('nearStyle', 'position: absolute; left: -6%; top: -6%; width: 112%; height: 112%; ' + layer(lt * 190, 36, 1 + 0.32 * lt, '50% 100%'));
    setCss('dustStyle', 'position: absolute; inset: -10%; pointer-events: none; background-image: radial-gradient(circle, rgba(121,192,255,.9) 0 1.5px, transparent 2px), radial-gradient(circle, rgba(255,255,255,.7) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(88,166,255,.6) 0 2.5px, transparent 3px); background-size: 180px 220px, 120px 160px, 260px 300px; animation: rise 14s linear infinite; opacity: .7; ' + layer(-lt * 420, 64, 1, '50% 50%'));
    setCss('titleText', 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 12vh 24px 0; gap: 18px; text-align: center; opacity: ' + (1 - clamp(lt / 0.3, 0, 1)).toFixed(3) + '; transform: translate(' + px(mx * 10) + ', ' + px(-lt * 140 + my * 6) + ');');
    setCss('scrollCue', 'position: absolute; left: 50%; bottom: 72px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 10px; opacity: ' + (1 - clamp(lt / 0.2, 0, 1)).toFixed(3) + ';');
    setCss('starStyle', 'position: absolute; inset: -10%; background-image: radial-gradient(#58A6FF 1px, transparent 1.5px), radial-gradient(#E6EDF3 1px, transparent 1.5px); background-size: 140px 140px, 90px 90px; background-position: 0 0, 40px 60px; opacity: .35; transform: translate(' + px(-mx * 4) + ', ' + px(-p * 300 - my * 3) + ');');

    /* Console rig — sized to fit both desktop and phones */
    const RA = 760 / 600;
    const Rh = Math.min(0.72 * H, (0.96 * W) / RA);
    const Zf = H / (0.467 * Rh);              // zoom at which the TV screen fills the stage height
    const zoomT = ease(seg(ZOOM_A, ZOOM_B));
    const zoom = 1 + zoomT * (Zf - 1);
    const rigBase = 'position: absolute; left: 50%; top: 50%; height: ' + px(Rh) + '; width: ' + px(Rh * RA) + '; transform-origin: 50% 33%; transform: translate(-50%, -50%) translate(' + px(-mx * 10 * (1 - zoomT)) + ', ' + px(-my * 6 * (1 - zoomT)) + ') translate(0, ' + (16.95 * zoomT).toFixed(3) + '%) scale(' + zoom.toFixed(4) + ');';
    setCss('rig', rigBase);
    const cartVisible = p < ZOOM_A + (ZOOM_B - ZOOM_A) * 0.7;
    setCss('cartRig', rigBase + ' z-index: 30; pointer-events: none; visibility: ' + (cartVisible ? 'visible' : 'hidden') + ';');

    /* Cartridge: spin → powder suck → fly → insert */
    const CW = 15.8, CH = 22.5, SLOT = 70;
    const fly = ease(seg(0.07, INS_A)), ins = ease(seg(INS_A, INS_B));
    let cTop = 36 + (32 - 36) * fly;
    cTop = cTop + ((SLOT - CH * 0.32) - cTop) * ins;
    const cScale = 1.35 - 0.35 * fly;
    const below = Math.max(0, (cTop + CH) - SLOT) / CH * 100;
    const wob = Math.sin(ins * Math.PI) * 4;
    setCss('cart', 'position: absolute; left: ' + (50 - CW / 2).toFixed(2) + '%; top: ' + cTop.toFixed(2) + '%; width: ' + CW + '%; height: ' + CH + '%; transform: scale(' + cScale.toFixed(4) + ') rotate(' + wob.toFixed(2) + 'deg); ' + (below > 0 ? 'clip-path: inset(0 0 ' + below.toFixed(2) + '% 0);' : ''));
    const spinning = p < 0.012;
    const suck = ease(seg(0.012, 0.07));
    const swirl = Math.sin(suck * Math.PI);
    const jit = swirl * 3.5;
    setCss('cartBob', 'width: 100%; height: 100%; ' + (spinning ? 'animation: hover3d 4s ease-in-out infinite;' : 'transform: translate(' + px(Math.sin(p * 2400) * jit) + ', ' + px(Math.cos(p * 2100) * jit) + ');') + ' filter: drop-shadow(0 0 ' + (8 + swirl * 46).toFixed(1) + 'px rgba(121,192,255,' + (0.35 + swirl * 0.6).toFixed(2) + '));');
    setCss('cartSpin', 'position: relative; width: 100%; height: 100%; transform-style: preserve-3d; ' + (spinning ? 'animation: spinY 9s linear infinite;' : 'transform: rotateY(0deg); transition: transform .5s ease;'));

    /* Vaporized-powder dissolve of the title world */
    const dis1 = clamp(suck / 0.6, 0, 1), dis2 = clamp((suck - 0.08) / 0.6, 0, 1);
    const r1 = 5.2 * (1 - dis1), r2 = 8.2 * (1 - dis2);
    const wMask = 'radial-gradient(circle, #000 ' + r1.toFixed(2) + 'px, transparent ' + (r1 + 0.8).toFixed(2) + 'px), radial-gradient(circle, #000 ' + r2.toFixed(2) + 'px, transparent ' + (r2 + 0.8).toFixed(2) + 'px)';
    const maskCss = suck > 0.001 ? '-webkit-mask-image: ' + wMask + '; mask-image: ' + wMask + '; -webkit-mask-size: 7px 7px, 11px 11px; mask-size: 7px 7px, 11px 11px; -webkit-mask-composite: source-in; mask-composite: intersect;' : '';
    setCss('worldStyle', 'position: absolute; inset: 0; overflow: hidden; transform-origin: 50% 48%; transform: scale(' + (1 - 0.1 * suck).toFixed(4) + '); filter: brightness(' + (1 + suck * 0.9).toFixed(3) + ') blur(' + (suck * 1.2).toFixed(2) + 'px); opacity: ' + (1 - clamp((suck - 0.62) / 0.12, 0, 1)).toFixed(3) + '; ' + maskCss);
    const live = suck > 0.0005 && suck < 0.9999;
    powder.forEach((d) => {
      let css = 'display:none';
      if (live) {
        const t = clamp((suck - d.b) / d.L, 0, 1);
        if (t > 0 && t < 1) {
          const ti = Math.pow(t, 2.1);
          const dx0 = (d.x - 50) / 100 * W, dy0 = (d.y - 48) / 100 * H;
          const r0 = Math.sqrt(dx0 * dx0 + dy0 * dy0), a0 = Math.atan2(dy0, dx0);
          const a = a0 + d.spin * ti, r = r0 * (1 - ti);
          const o = Math.min(1, t * 6) * (1 - clamp((t - 0.82) / 0.18, 0, 1));
          const sz = d.size * (1 - 0.6 * ti);
          css = 'position: absolute; left: 50%; top: 48%; width: ' + sz.toFixed(1) + 'px; height: ' + sz.toFixed(1) + 'px; background: ' + d.color + '; opacity: ' + o.toFixed(3) + '; transform: translate(' + (Math.cos(a) * r).toFixed(1) + 'px, ' + (Math.sin(a) * r).toFixed(1) + 'px) rotate(' + (a * 57.3).toFixed(0) + 'deg) scaleX(' + (1 + ti * 2.5).toFixed(2) + ');' + (d.glow ? ' box-shadow: 0 0 6px ' + d.color + ';' : '');
        }
      }
      if (d.css !== css) { d.css = css; d.el.style.cssText = css; }
    });
    const streakMask = 'radial-gradient(circle at 50% 48%, transparent 3%, #000 14%, transparent 62%)';
    setCss('streakStyle', 'position: absolute; inset: 0; pointer-events: none; background: repeating-conic-gradient(from ' + (suck * 900).toFixed(1) + 'deg at 50% 48%, rgba(121,192,255,0) 0deg, rgba(160,210,255,.6) 1.5deg, rgba(121,192,255,0) 5deg, rgba(121,192,255,0) 11deg); -webkit-mask-image: ' + streakMask + '; mask-image: ' + streakMask + '; opacity: ' + (swirl * 0.35).toFixed(3) + ';');
    setCss('coreStyle', 'position: absolute; left: 50%; top: 48%; width: 640px; height: 640px; margin: -320px 0 0 -320px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(220,238,255,.95), rgba(88,166,255,.4) 22%, transparent 60%); transform: scale(' + (0.15 + swirl * 1.05).toFixed(3) + ') rotate(' + (suck * -300).toFixed(1) + 'deg); opacity: ' + swirl.toFixed(3) + ';');

    /* Boot: slot glow, cable, LED, CRT, load bar */
    const insFlash = Math.max(0, 1 - Math.abs(p - INS_B) / 0.012);
    setCss('slot', 'position: absolute; left: 41%; top: 69%; width: 18%; height: 2.6%; background: #010409; border-radius: 3px; box-shadow: 0 0 ' + (8 + insFlash * 30).toFixed(0) + 'px rgba(88,166,255,' + (insFlash * 0.9).toFixed(2) + ');');
    const cab = ease(seg(CAB_A, CAB_B));
    const sparkT = Math.max(0, 1 - Math.abs(p - CAB_B) / 0.01);
    setAttr($('#cable'), 'stroke-dashoffset', (1 - cab).toFixed(4));
    setAttr($('#plug'), 'fill-opacity', cab >= 0.98 ? '1' : '0');
    setAttr($('#spark'), 'r', (6 + (1 - sparkT) * 18).toFixed(1));
    setAttr($('#spark'), 'stroke-opacity', sparkT.toFixed(3));
    const powered = p >= CRT_A;
    setCss('led', 'position: absolute; left: 28%; top: 81.5%; width: 1.8%; aspect-ratio: 1; border-radius: 50%; ' + (powered ? 'background: #3FB950; box-shadow: 0 0 12px #3FB950, 0 0 24px rgba(63,185,80,.6);' : (p >= INS_B ? 'background: #8E1519;' : 'background: #22272E;')));
    const crtT = seg(CRT_A, CRT_B), loadT = seg(CRT_B, LOAD_B);
    setCss('screen', 'position: absolute; left: 19.2%; top: 9.7%; width: 61.4%; height: 46.7%; border-radius: 14px; overflow: hidden; background: #010409; border: 3px solid #0D1117; ' + (powered ? 'box-shadow: 0 0 60px rgba(88,166,255,' + (0.15 + 0.3 * crtT).toFixed(2) + '), inset 0 0 40px rgba(0,0,0,.6);' : 'box-shadow: inset 0 0 40px rgba(0,0,0,.6);'));
    const lineScale = powered ? 0.012 + 0.988 * ease(clamp((crtT - 0.3) / 0.6, 0, 1)) : 0;
    setCss('crtLine', 'position: absolute; left: 0; right: 0; top: 50%; height: 100%; background: #DDEBFF; transform: translateY(-50%) scaleY(' + lineScale.toFixed(4) + ') scaleX(' + (powered ? Math.min(1, 0.05 + crtT * 4).toFixed(3) : 0) + '); opacity: ' + (powered ? (1 - clamp((crtT - 0.8) / 0.2, 0, 1)).toFixed(3) : 0) + ';');
    setCss('bootContent', 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: radial-gradient(ellipse at 50% 40%, #12357A, #0B2350 60%, #071735); opacity: ' + clamp((crtT - 0.75) / 0.25, 0, 1).toFixed(3) + ';');
    setCss('loadBar', 'height: 100%; background: linear-gradient(90deg, #3FB950, #58A6FF); width: ' + (loadT * 100).toFixed(1) + '%');
    setCss('pressStart', 'font-size: 9px; color: #fff; opacity: ' + (loadT >= 1 ? 1 : 0) + '; ' + (loadT >= 1 ? 'animation: blink .9s steps(1) infinite;' : ''));
    const flashIn = Math.max(0, 1 - Math.abs(p - SW_A) / 0.006);
    setCss('screenFlash', 'position: absolute; inset: 0; pointer-events: none; background: #DDEBFF; opacity: ' + (flashIn * 0.85).toFixed(3) + ';');
    let cap = 'SCROLL ▼ TO INSERT CARTRIDGE';
    if (p >= INS_A && p < INS_B) cap = 'INSERTING CARTRIDGE...';
    else if (p >= CAB_A && p < CAB_B) cap = 'CONNECTING CONTROLLER...';
    else if (p >= CRT_A && p < CRT_B) cap = 'POWER ON';
    else if (p >= CRT_B && p < LOAD_B) cap = 'LOADING ' + Math.round(loadT * 100) + '%';
    else if (p >= LOAD_B) cap = 'PRESS START ▼';
    setText($('#bootCaption'), cap);

    /* Player select grows out of the TV screen (seamless zoom) */
    const swT = seg(SW_A, SW_B);
    const k = (0.467 * Rh / H) * zoom;
    const screenW = 0.614 * Rh * RA;
    const sideOpen = clamp((zoomT - 0.85) / 0.15, 0, 1);
    const side = Math.max(0, (W - screenW / (0.467 * Rh / H)) / 2) * (1 - sideOpen);
    const offY = -0.1695 * Rh * (1 - zoomT);
    const pVis = p >= SW_A && p < scenes[3].a + scenes[3].E + 0.01;
    let pExtra = stageBg;
    if (p < ZOOM_B) pExtra += 'opacity: ' + swT.toFixed(3) + '; transform-origin: 50% 50%; transform: translate(' + px(-mx * 10 * (1 - zoomT)) + ', ' + px(offY - my * 6 * (1 - zoomT)) + ') scale(' + k.toFixed(4) + '); clip-path: inset(0 ' + px(side) + ' round ' + px((14 / k) * (1 - zoomT)) + ');';
    setCss('sc.player', 'position: absolute; inset: 0; overflow: hidden; z-index: 12; visibility: ' + (pVis ? 'visible' : 'hidden') + '; pointer-events: ' + (cur === 2 ? 'auto' : 'none') + '; ' + pExtra);

    /* World map */
    const w = scenes[3];
    const mapT = clamp((w.local - 0.1) / 0.82, 0, 1);
    const pos = mapT * (N - 1);
    const act = Math.round(pos);
    if (act !== active) { if (active !== -1 && cur === 3) Sound.blip('coin'); active = act; setLevel(act); }
    const i0 = Math.floor(pos), i1 = Math.min(N - 1, i0 + 1);
    const markerY = cy(i0) + (cy(i1) - cy(i0)) * (pos - i0);
    const camX = pos * SP;
    setAttr($('#pathDone'), 'stroke-dashoffset', (1 - (N > 1 ? pos / (N - 1) : 0)).toFixed(4));
    setCss('trackStyle', 'position: absolute; left: 50%; top: 0; height: 276px; display: flex; width: ' + (N * SP) + 'px; transform: translateX(' + (-(camX + SP / 2)).toFixed(1) + 'px)');
    setCss('markerStyle', 'position: absolute; left: 50%; margin-left: -17px; top: ' + (markerY - 56).toFixed(1) + 'px; z-index: 2; animation: bob .9s ease-in-out infinite; shape-rendering: crispEdges; filter: drop-shadow(0 4px 6px rgba(0,0,0,.6)); pointer-events: none');
    setCss('farIslandStrip', 'position: absolute; left: 0; top: 0; width: 4200px; height: 100%; transform: translateX(' + px(-camX * 0.35 - mx * 12) + ');');
    setCss('cloudStrip', 'position: absolute; left: 0; top: 0; width: 6000px; height: 100%; pointer-events: none; transform: translateX(' + px(-camX * 1.5 - mx * 30) + ');');

    /* Boss hit */
    const boss = scenes[4];
    const bossLocal = clamp((boss.local - 0.1) / 0.8, 0, 1);
    const hit = 1 - boss.fi;
    setCss('flash', 'position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle, rgba(248,81,73,.55), rgba(248,81,73,.15) 60%, transparent); opacity: ' + (cur >= 4 ? hit * 0.9 : 0).toFixed(3));
    setCss('shake', 'transform: translate(' + (Math.sin(boss.fi * 42) * 14 * hit).toFixed(1) + 'px, ' + (Math.cos(boss.fi * 37) * 8 * hit).toFixed(1) + 'px)');
    setCss('bossBar', 'height: 100%; background: #F85149; width: ' + ((1 - bossLocal) * 100).toFixed(1) + '%');

    /* Credits → Continue? */
    const cr = scenes[5];
    const crLocal = clamp((p - cr.a - cr.E) / (cr.b - cr.a - cr.E), 0, 1);
    const rollT = clamp(crLocal / 0.55, 0, 1);
    const contO = clamp((crLocal - 0.45) / 0.2, 0, 1);
    setCss('creditsRoll', 'position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; align-items: center; gap: 44px; padding: 30vh 24px 0; text-align: center; transform: translateY(' + (100 - rollT * 120).toFixed(1) + '%); opacity: ' + (1 - contO).toFixed(3));
    setCss('continueStyle', 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 0 24px 60px; opacity: ' + contO.toFixed(3) + '; transform: scale(' + (0.92 + 0.08 * contO).toFixed(3) + '); visibility: ' + (contO > 0.05 ? 'visible' : 'hidden') + '; pointer-events: ' + (contO > 0.6 ? 'auto' : 'none'));
    setText($('#countdown'), String(Math.max(0, 9 - Math.floor(clamp((crLocal - 0.6) / 0.4, 0, 1) * 9))));

    /* HUD */
    setCss('xpBar', 'height: 100%; background: linear-gradient(90deg, #3FB950, #58A6FF); width: ' + (p * 100).toFixed(2) + '%');
    setText($('#sceneName'), scenes[cur].name);
    setText($('#levelHud'), String(cur + 1));
    if (cur !== lastScene) {
      if (lastScene !== -1) Sound.blip(cur === 4 ? 'boss' : (cur > lastScene ? 'level' : 'blip'));
      lastScene = cur;
      jumpBtns.forEach((b, i) => { b.classList.toggle('on', i === cur); b.setAttribute('aria-current', i === cur ? 'step' : 'false'); });
    }
  }

  /* Coming back from a level page: land on that island */
  function restore() {
    const m = /[?&]level=(\d+)/.exec(location.search);
    if (m) {
      const i = clamp(parseInt(m[1], 10) - 1, 0, N - 1);
      const w = scenes[3];
      window.scrollTo(0, game.offsetTop + (w.a + (0.1 + (N > 1 ? i / (N - 1) : 0) * 0.82) * (w.b - w.a)) * maxScroll());
    }
  }

  measure(); restore(); readScroll(); render();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); schedule(); });
})();
