/* ===== Hero: pixel-art scene =====
   A pixel me (suit, white shirt, black tie) stands on a night-time hill under the hero text.
   Scrolling through the pinned-hero stretch (window.INTRO_ANIM_PX -> window.INTRO_PX, set in js/intro.js)
   makes him run down the slope, jump off the cliff and fall out of the bottom of the screen into the page.
   Everything is drawn at low resolution and scaled up with image-rendering: pixelated. */
(function () {
  const cv = document.getElementById('heroCanvas');
  const hero = document.getElementById('home');
  if (!cv || !hero) return;
  const ctx = cv.getContext('2d');
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- palette ---------- */
  const COL = {
    hair: '#14161B', hairHi: '#2C3240', skin: '#E9B48C', skinSh: '#C98F69', eye: '#15171C', mouth: '#B9675E',
    jacket: '#262B35', jacketBack: '#1A1E26', lapel: '#3A4150', shirt: '#F1F3F5', tie: '#0B0C0F',
    pants: '#1D2129', pantsBack: '#14171D', shoe: '#050506',
    outline: 'rgba(150, 200, 255, 0.85)',
    grassHi: '#6EE787', grass: '#2E9E4F', grassDk: '#21733A', earth: '#16213A', earthDot: '#1F2D4B', rock: '#2B3B5E',
    mtnFar: '#0E1A35', mtnNear: '#122347', moon: '#E6EDF3', moonDk: '#C3CCD8', star: '#CFE3FF',
    post: '#7A4B26', board: '#C4894B', boardDk: '#6B4423', dust: '#9AA6B8'
  };
  // head, 10 x 11, facing right (K hair, h hair highlight, S skin, s shade, e eye, m mouth)
  const HEAD = [
    '..KKKKKK..',
    '.KKKhKKKKK',
    'KKKhKKKKKK',
    'KKKKKKKKKK',
    'KKKKSKSSKK',
    'KKKSSSSSSS',
    'KKSSSSeSSe',
    'KsSSSSSSSS',
    '.SSSSSSSmS',
    '..SSSSSSS.',
    '...sSSSs..'
  ];
  const HEADC = { K: COL.hair, h: COL.hairHi, S: COL.skin, s: COL.skinSh, e: COL.eye, m: COL.mouth };

  /* ---------- sprite: drawn into a small canvas, then outlined + flipped onto the scene ---------- */
  const SW = 52, SH = 52, OX = 26, OY = 44; // feet sit at (OX, OY)
  const spr = document.createElement('canvas'); spr.width = SW; spr.height = SH;
  const sp = spr.getContext('2d');
  const sil = document.createElement('canvas'); sil.width = SW; sil.height = SH;
  const sl = sil.getContext('2d');
  const R = Math.PI / 180;

  const px = (c, x, y, w, h) => { sp.fillStyle = c; sp.fillRect(Math.round(x), Math.round(y), w || 1, h || 1); };
  // a limb: two segments from (x0, y0); angles in degrees from straight down, positive = forward
  const limb = (x0, y0, a1, l1, a2, l2, th, col, endCol, endW, endH) => {
    const stamp = (x, y) => px(col, x - (th >> 1), y - (th >> 1), th, th);
    let x = x0, y = y0;
    for (let i = 0; i <= l1 * 2; i++) stamp(x0 + Math.sin(a1 * R) * i / 2, y0 + Math.cos(a1 * R) * i / 2);
    x = x0 + Math.sin(a1 * R) * l1; y = y0 + Math.cos(a1 * R) * l1;
    for (let i = 0; i <= l2 * 2; i++) stamp(x + Math.sin(a2 * R) * i / 2, y + Math.cos(a2 * R) * i / 2);
    const ex = x + Math.sin(a2 * R) * l2, ey = y + Math.cos(a2 * R) * l2;
    if (endCol) px(endCol, ex - 1, ey - 1, endW, endH);
    return [ex, ey];
  };

  function pose(kind, ph, time) {
    if (kind === 'run') {
      const s = Math.sin(ph), c = Math.cos(ph), s2 = Math.sin(ph + Math.PI), c2 = Math.cos(ph + Math.PI);
      return {
        legs: [{ a: 40 * s, k: 40 * s - 75 * Math.max(0, c) }, { a: 40 * s2, k: 40 * s2 - 75 * Math.max(0, c2) }],
        arms: [{ u: -45 * s, f: -45 * s + 70 }, { u: -45 * s2, f: -45 * s2 + 70 }],
        lean: 1, bob: Math.sin(2 * ph) > 0 ? -1 : 0, upper: 0
      };
    }
    // raised arms hang off the outer shoulders (sh) so they frame the head instead of crossing the face
    if (kind === 'jump') return { legs: [{ a: 60, k: 5 }, { a: -30, k: -85 }], arms: [{ u: 135, f: 150 }, { u: -70, f: -40 }], sh: [3, -2], lean: 1, bob: 0, upper: 0 };
    if (kind === 'fall') {
      const w = reduce ? 0 : Math.sin(time / 65), v = reduce ? 0 : Math.cos(time / 80);
      return { legs: [{ a: 22 + 14 * w, k: -6 + 10 * v }, { a: -18 - 12 * w, k: -48 }], arms: [{ u: 135 + 14 * w, f: 155 + 18 * v }, { u: -135 - 14 * w, f: -155 - 18 * v }], sh: [3, -3], lean: 0, bob: 0, upper: 0 };
    }
    const breathe = reduce ? 0 : (Math.floor(time / 650) % 2);
    return { legs: [{ a: 5, k: 5 }, { a: -5, k: -5 }], arms: [{ u: 8, f: 16 }, { u: -6, f: -2 }], lean: 0, bob: 0, upper: breathe };
  }

  function drawSprite(p) {
    sp.clearRect(0, 0, SW, SH);
    const b = p.bob, u = b + p.upper, ox = OX + p.lean;
    const hipX = OX, hipY = OY - 11 + b, shY = OY - 20 + u, sh = p.sh || [0, 0];
    // back limbs first (darker), then body, then front limbs
    limb(ox + sh[1], shY, p.arms[1].u, 4, p.arms[1].f, 4, 2, COL.jacketBack, COL.skinSh, 2, 2);
    limb(hipX, hipY, p.legs[1].a, 5, p.legs[1].k, 5, 3, COL.pantsBack, COL.shoe, 4, 2);
    px(COL.jacket, ox - 4, OY - 21 + u, 9, 8);               // jacket
    px(COL.pants, OX - 4, OY - 13 + b, 9, 3);                // hips
    px(COL.shirt, ox - 1, OY - 21 + u, 3, 1);                // collar
    px(COL.shirt, ox - 1, OY - 20 + u, 1, 2); px(COL.shirt, ox + 1, OY - 20 + u, 1, 2);
    px(COL.tie, ox, OY - 20 + u, 1, 5);                      // tie
    px(COL.lapel, ox - 2, OY - 20 + u, 1, 4); px(COL.lapel, ox + 2, OY - 20 + u, 1, 4);
    limb(hipX, hipY, p.legs[0].a, 5, p.legs[0].k, 5, 3, COL.pants, COL.shoe, 4, 2);
    for (let r = 0; r < HEAD.length; r++) for (let c = 0; c < HEAD[r].length; c++) {
      const ch = HEAD[r][c]; if (ch !== '.') px(HEADC[ch], ox - 4 + c, OY - 32 + u + r);
    }
    limb(ox + sh[0], shY, p.arms[0].u, 4, p.arms[0].f, 4, 2, COL.jacket, COL.skin, 2, 2);
    // outline silhouette
    sl.clearRect(0, 0, SW, SH);
    sl.globalCompositeOperation = 'source-over'; sl.drawImage(spr, 0, 0);
    sl.globalCompositeOperation = 'source-in'; sl.fillStyle = COL.outline; sl.fillRect(0, 0, SW, SH);
    sl.globalCompositeOperation = 'source-over';
  }

  function blitSprite(x, y, dir, g) {
    g = g || ctx;
    g.save();
    g.translate(Math.round(x), Math.round(y));
    g.scale(dir, 1);
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach((o) => g.drawImage(sil, -OX + o[0], -OY + o[1]));
    g.drawImage(spr, -OX, -OY);
    g.restore();
  }

  /* ---------- the mob: a pixel bug (every programmer's enemy) that chases pixel-me down the hill ----------
     16 x 11, facing right. S shell, s shell shine, l shell split, D underside, H head, W eye white, e pupil,
     a antenna, m mandible. Rows 9-10 are the legs and swap between two frames as it scuttles. */
  const BUG = [
    '............a...',
    '.............a.a',
    '....SSSSS..HHa..',
    '..SSsSSSSSHHHH..',
    '.SSsSSlSSSHWeH..',
    '.SSSSSlSSSHHHHm.',
    '.SSSSSlSSSSHHHm.',
    '..SSSSlSSSS.....',
    '...DDDDDDD......'
  ];
  const BUG_LEGS = [['..L..L..L.......', '.L..L..L........'], ['...L..L..L......', '....L..L..L.....']];
  const BUGC = { S: '#D73A49', s: '#FF7B72', l: '#7A1621', D: '#4A0F1A', H: '#2B1B2E', W: '#FFFFFF', e: '#000000', a: '#3B2A40', m: '#F2C14E', L: '#2B1B2E' };
  const MW = 20, MH = 16, MOX = 8, MOY = 13;            // mob canvas; its feet sit at (MOX, MOY)
  const mob = document.createElement('canvas'); mob.width = MW; mob.height = MH;
  const mb = mob.getContext('2d');
  const mobSil = document.createElement('canvas'); mobSil.width = MW; mobSil.height = MH;
  const mbs = mobSil.getContext('2d');
  function drawMob(legFrame) {
    mb.clearRect(0, 0, MW, MH);
    const rows = BUG.concat(BUG_LEGS[legFrame]);
    for (let r = 0; r < rows.length; r++) for (let c = 0; c < rows[r].length; c++) {
      const ch = rows[r][c]; if (ch !== '.') { mb.fillStyle = BUGC[ch]; mb.fillRect(c + 2, MOY - rows.length + 1 + r, 1, 1); }
    }
    mbs.clearRect(0, 0, MW, MH);
    mbs.globalCompositeOperation = 'source-over'; mbs.drawImage(mob, 0, 0);
    mbs.globalCompositeOperation = 'source-in'; mbs.fillStyle = 'rgba(255, 140, 140, 0.75)'; mbs.fillRect(0, 0, MW, MH);
    mbs.globalCompositeOperation = 'source-over';
  }
  function blitMob(x, y, dir) {
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(dir, 1);
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach((o) => ctx.drawImage(mobSil, -10 + o[0], -MOY + o[1]));
    ctx.drawImage(mob, -10, -MOY);
    ctx.restore();
  }

  /* ---------- scene layout + static background ----------
     The scene is laid out in "logical" coordinates (hill on the left, running right) and drawn mirrored,
     so on screen pixel-me starts on the right and runs left, falling onto the About card's photo. */
  let W = 0, H = 0, P = 4, L = null, stars = [];
  const bg = document.createElement('canvas'); const bgc = bg.getContext('2d');
  const sky = document.createElement('canvas'); const skyc = sky.getContext('2d');
  const hash = (x, y) => { let h = (x * 374761393 + y * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const groundY = (x) => {
    if (x <= L.hx1) return L.hy;
    if (x <= L.cx) { const k = (x - L.hx1) / (L.cx - L.hx1); return Math.round(L.hy + (L.cy - L.hy) * (k * k * (3 - 2 * k))); }
    return Infinity;
  };

  function layout() {
    const w = hero.clientWidth, h = hero.clientHeight;
    if (!w || !h) return;
    const mobile = w < 760;
    P = mobile ? 3 : 4;
    W = Math.ceil(w / P); H = Math.ceil(h / P);
    cv.width = W; cv.height = H; bg.width = W; bg.height = H; sky.width = W; sky.height = H;
    const wrap = hero.querySelector('.wrap'), txt = hero.querySelector('.hero-text');
    const textBottom = txt && wrap ? (wrap.offsetTop + txt.offsetTop + txt.offsetHeight) / P : H * 0.5;
    const hy = Math.round(Math.min(H - 22, Math.max(H * 0.56, textBottom + 40)));
    const cy = Math.round(Math.min(H - 6, hy + Math.max(12, H * 0.15)));
    L = {
      hy: hy, cy: cy,
      hx1: Math.round(W * (mobile ? 0.34 : 0.3)), cx: Math.round(W * (mobile ? 0.74 : 0.62)),
      sx: Math.round(W * (mobile ? 0.16 : 0.13)), jdx: Math.round(W * (mobile ? 0.13 : 0.1)), jh: mobile ? 18 : 26
    };
    // aim the jump so the fall ends straight above the About photo (screen x -> logical x is mirrored)
    const photo = document.querySelector('.p-photo');
    if (photo) {
      const r = photo.getBoundingClientRect();
      if (r.width) {
        const tl = W - (r.left + r.width / 2) / P, drift = W * 0.03;
        L.cx = Math.round(Math.min(W * 0.8, Math.max(W * 0.5, tl - L.jdx - drift)));
        L.jdx = Math.max(6, Math.round(tl - drift - L.cx + 1));
        L.hx1 = Math.min(L.hx1, Math.round(L.cx - W * 0.22));
      }
    }
    stars = [];
    const n = Math.round(W * H / 700);
    for (let i = 0; i < n; i++) stars.push({ x: Math.floor(hash(i, 1) * W), y: Math.floor(hash(i, 2) * H * 0.75), t: hash(i, 3) * 6.28, big: hash(i, 4) < 0.12 });
    drawBackground(mobile);
  }

  function drawBackground(mobile) {
    let g = skyc;                       // moon goes on the un-mirrored sky layer so it stays top-right
    g.clearRect(0, 0, W, H);
    const mx = Math.round(W * 0.86), my = Math.round(H * 0.2), mr = mobile ? 6 : 9;
    for (let y = -mr - 3; y <= mr + 3; y++) for (let x = -mr - 3; x <= mr + 3; x++) {
      const d = x * x + y * y;
      if (d <= mr * mr) { g.fillStyle = COL.moon; g.fillRect(mx + x, my + y, 1, 1); }
      else if (d <= (mr + 3) * (mr + 3)) { g.fillStyle = 'rgba(200,225,255,0.07)'; g.fillRect(mx + x, my + y, 1, 1); }
    }
    g.fillStyle = COL.moonDk;
    [[-3, -2, 2], [2, 1, 3], [-1, 4, 1], [3, -4, 1]].forEach((c) => g.fillRect(mx + c[0], my + c[1], c[2], c[2]));
    g = bgc;
    g.clearRect(0, 0, W, H);
    // mountains, far then near
    const ridge = (base, amp, f, ph, col) => {
      g.fillStyle = col;
      for (let x = 0; x < W; x++) {
        const y = Math.round(base - amp * Math.abs(Math.sin(x * f + ph)) - amp * 0.25 * Math.sin(x * f * 3.7 + ph));
        g.fillRect(x, y, 1, H - y);
      }
    };
    ridge(H * 0.66, H * 0.1, 0.012, 1.1, COL.mtnFar);
    ridge(H * 0.78, H * 0.08, 0.02, 2.3, COL.mtnNear);
    // hill + slope + cliff
    for (let x = 0; x <= L.cx; x++) {
      const gy = groundY(x);
      g.fillStyle = COL.earth; g.fillRect(x, gy, 1, H - gy);
      for (let y = gy + 4; y < H; y++) if (hash(x, y) < 0.05) { g.fillStyle = COL.earthDot; g.fillRect(x, y, 1, 1); }
      g.fillStyle = COL.grassHi; g.fillRect(x, gy, 1, 1);
      g.fillStyle = COL.grass; g.fillRect(x, gy + 1, 1, 2);
      g.fillStyle = COL.grassDk; g.fillRect(x, gy + 3, 1, 1);
      if (hash(x, 7) < 0.18 && x < L.cx - 3) { g.fillStyle = COL.grassHi; g.fillRect(x, gy - 1, 1, 1); if (hash(x, 8) < 0.4) g.fillRect(x, gy - 2, 1, 1); }
    }
    g.fillStyle = COL.rock;                                     // cliff face
    for (let y = L.cy + 4; y < H; y++) { g.fillRect(L.cx - (hash(3, y) < 0.5 ? 1 : 0), y, 1, 1); if (hash(5, y) < 0.3) g.fillRect(L.cx - 2, y, 1, 1); }
    // signpost at the cliff edge, arrow pointing down-right
    const sx = L.cx - 27, sy = groundY(sx);   // set back from the edge so the bug can stop in front of it
    g.fillStyle = COL.post; g.fillRect(sx, sy - 8, 1, 8);
    g.fillStyle = COL.boardDk; g.fillRect(sx - 5, sy - 13, 11, 6);
    g.fillStyle = COL.board; g.fillRect(sx - 4, sy - 12, 9, 4);
    g.fillStyle = COL.boardDk; [[-2, -11], [-1, -11], [0, -11], [0, -10], [1, -10], [1, -9], [-1, -9], [2, -9]].forEach((q) => g.fillRect(sx + q[0], sy + q[1], 1, 1));
    // a small flag where pixel-me starts
    const fx = Math.max(4, L.sx - 14), fy = groundY(fx);
    g.fillStyle = COL.post; g.fillRect(fx, fy - 12, 1, 12);
    g.fillStyle = '#F85149'; g.fillRect(fx + 1, fy - 12, 6, 2); g.fillRect(fx + 1, fy - 10, 4, 2);
  }

  /* ---------- scroll -> where pixel-me is ---------- */
  const T_IDLE = 0.06, T_RUN = 0.6, T_JUMP = 0.78;
  function place(t, time) {
    if (t <= T_IDLE) return { x: L.sx, y: L.hy, kind: 'idle', ph: 0 };
    if (t <= T_RUN) {
      const k = (t - T_IDLE) / (T_RUN - T_IDLE), x = L.sx + (L.cx - 1 - L.sx) * k;
      return { x: x, y: groundY(Math.round(x)), kind: 'run', ph: (x - L.sx) * 0.34 };
    }
    if (t <= T_JUMP) {
      const k = (t - T_RUN) / (T_JUMP - T_RUN);
      return { x: L.cx - 1 + L.jdx * k, y: L.cy - L.jh * 4 * k * (1 - k), kind: k < 0.55 ? 'jump' : 'fall', ph: 0 };
    }
    const k = (t - T_JUMP) / (1 - T_JUMP);
    return { x: L.cx - 1 + L.jdx + W * 0.03 * k, y: L.cy + (H + 50 - L.cy) * Math.pow(k, 1.5), kind: 'fall', ph: 0 };
  }

  /* ---------- loop ---------- */
  let shown = 0, dir = 1, lastX = null, dustAcc = 0, dust = [], raf = 0, lastNow = 0, wasJump = false;
  const target = () => {
    const a = window.INTRO_ANIM_PX || 3500, b = window.INTRO_PX || a + 1000, y = window.scrollY || 0;
    return Math.min(1, Math.max(0, (y - a) / (b - a)));
  };
  const active = () => { const y = window.scrollY || 0, b = window.INTRO_PX || 4500; return !document.hidden && y > b * 0.5 && y < b + window.innerHeight * 1.2; };

  function frame(now) {
    raf = 0;
    if (!L) layout();
    if (!L) return;
    const dt = Math.min(64, now - (lastNow || now)); lastNow = now;
    const tg = target(), d = tg - shown;
    shown = Math.abs(d) < 0.0004 ? tg : shown + d * (1 - Math.pow(0.84, dt / 16.67 || 1));
    const s = place(shown, now);
    if (lastX !== null && Math.abs(s.x - lastX) > 0.05) dir = s.x > lastX ? 1 : -1;
    if (s.kind === 'run' && lastX !== null) {
      dustAcc += Math.abs(s.x - lastX);
      while (dustAcc > 6) { dustAcc -= 6; dust.push({ x: s.x - dir * 3, y: s.y - 1, vx: -dir * (0.15 + Math.random() * 0.2), vy: -0.12 - Math.random() * 0.1, life: 26, max: 26 }); }
    }
    const jumping = s.kind !== 'run' && s.kind !== 'idle' && shown < T_JUMP;
    if (jumping && !wasJump && dir > 0) for (let i = 0; i < 7; i++) dust.push({ x: L.cx - 2, y: L.cy - 1, vx: -0.4 + Math.random() * 0.5, vy: -0.25 - Math.random() * 0.25, life: 30, max: 30 });
    wasJump = jumping;
    lastX = s.x;

    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < stars.length; i++) {
      const st = stars[i], a = reduce ? 0.6 : 0.35 + 0.35 * Math.sin(now / 700 + st.t);
      ctx.fillStyle = 'rgba(207,227,255,' + a.toFixed(2) + ')';
      ctx.fillRect(st.x, st.y, 1, 1);
      if (st.big) { ctx.fillRect(st.x - 1, st.y, 3, 1); ctx.fillRect(st.x, st.y - 1, 1, 3); }
    }
    ctx.drawImage(sky, 0, 0);
    ctx.save(); ctx.translate(W, 0); ctx.scale(-1, 1);          // mirrored scene
    ctx.drawImage(bg, 0, 0);
    dust = dust.filter((p) => (p.life -= dt / 16.67) > 0);
    dust.forEach((p) => { p.x += p.vx; p.y += p.vy; ctx.globalAlpha = Math.max(0, p.life / p.max) * 0.8; ctx.fillStyle = COL.dust; const z = p.life > p.max / 2 ? 2 : 1; ctx.fillRect(Math.round(p.x), Math.round(p.y), z, z); });
    ctx.globalAlpha = 1;
    // the bug: off-screen while I idle, gains on me down the slope, then skids to a stop at the cliff edge
    let bx, by = 0, angry = false;
    if (shown <= T_IDLE) bx = L.sx - 80;
    else if (shown <= T_RUN) bx = s.x - (64 - 46 * ((shown - T_IDLE) / (T_RUN - T_IDLE)));
    else { const k = Math.min(1, (shown - T_RUN) / (T_JUMP - T_RUN)); bx = L.cx - 19 + 10 * (1 - Math.pow(1 - k, 2)); angry = k >= 1 || shown > T_RUN + 0.05; }
    const bgY = groundY(Math.max(0, Math.round(bx)));
    if (angry && !reduce) by = -Math.round(Math.abs(Math.sin(now / 110)) * 3);
    drawMob(angry ? Math.floor(now / 90) % 2 : Math.floor(Math.abs(bx) / 3) % 2);
    blitMob(bx, (bgY === Infinity ? L.cy : bgY) + by, angry ? 1 : dir);
    if (angry) {                                                    // "!" over its head
      const ex = Math.round(bx), ey = Math.round(bgY + by - 18);
      ctx.fillStyle = '#F2C14E'; ctx.fillRect(ex, ey, 2, 4); ctx.fillRect(ex, ey + 5, 2, 2);
    }
    drawSprite(pose(s.kind, s.ph, now));
    blitSprite(s.x, s.y, dir);
    ctx.restore();

    if (active()) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf && active()) { lastNow = 0; raf = requestAnimationFrame(frame); } if (!mraf && morphActive()) mraf = requestAnimationFrame(morph); };

  /* ---------- About card: pixel-me lands in the photo frame and resolves into the real photo ----------
     Scroll-driven: 0 when the photo's top enters the bottom of the screen, 1 when the About section fills
     the screen (its top reaches the bottom of the nav). Fall (0-.2), stand around as pixel-me (.2-.55), de-pixelate (.55-1). */
  const M_FALL = 0.2, M_LAND = 0.55;
  const photo = document.querySelector('.p-photo');
  const mcv = photo && photo.querySelector('.p-morph');
  const img = photo && photo.querySelector('img');
  const mctx = mcv && mcv.getContext('2d');
  const scene = document.createElement('canvas'), scx = scene.getContext('2d');
  const tiny = document.createElement('canvas'), tnx = tiny.getContext('2d');
  let mShown = -1, mraf = 0, mLast = 0;
  const MQ = 6;                                                  // screen px per sprite pixel inside the frame
  const aboutSec = photo && photo.closest('section');
  const navBar = document.getElementById('nav');
  const morphTarget = () => {
    const r = photo.getBoundingClientRect(), vh = window.innerHeight || 800;
    const navH = navBar ? navBar.offsetHeight : 64;
    const inset = aboutSec ? r.top - aboutSec.getBoundingClientRect().top : 0;   // photo's distance below the section top
    const span = Math.max(1, vh - navH - inset);                                   // scroll needed from "photo enters" to "section fills screen"
    return Math.min(1, Math.max(0, (vh - r.top) / span));
  };
  const morphActive = () => { if (!mcv || document.hidden) return false; const r = photo.getBoundingClientRect(); return r.bottom > -50 && r.top < (window.innerHeight || 800) + 50; };

  function morph(now) {
    mraf = 0;
    const fw = mcv.clientWidth, fh = mcv.clientHeight;
    if (!fw || !fh) return;
    if (mcv.width !== fw || mcv.height !== fh) { mcv.width = fw; mcv.height = fh; }
    const dt = Math.min(64, now - (mLast || now)); mLast = now;
    const tg = morphTarget();
    mShown = mShown < 0 ? tg : (Math.abs(tg - mShown) < 0.0005 ? tg : mShown + (tg - mShown) * (1 - Math.pow(0.82, dt / 16.67 || 1)));
    const m = mShown;
    mcv.style.opacity = m >= 0.999 ? '0' : '1';
    if (m < 0.999) {
      const nw = Math.ceil(fw / MQ), nh = Math.ceil(fh / MQ);
      if (scene.width !== nw || scene.height !== nh) { scene.width = nw; scene.height = nh; }
      mctx.imageSmoothingEnabled = false;
      // pixel stage: dark screen, a little floor, pixel-me falling in then standing
      scx.fillStyle = '#0B1530'; scx.fillRect(0, 0, nw, nh);
      for (let i = 0; i < 18; i++) { scx.fillStyle = 'rgba(207,227,255,' + (0.25 + 0.3 * Math.sin(now / 600 + i)).toFixed(2) + ')'; scx.fillRect(Math.floor(hash(i, 9) * nw), Math.floor(hash(i, 10) * nh * 0.6), 1, 1); }
      const floor = nh - 4;
      scx.fillStyle = COL.grassHi; scx.fillRect(0, floor, nw, 1);
      scx.fillStyle = COL.grass; scx.fillRect(0, floor + 1, nw, 2);
      scx.fillStyle = COL.earth; scx.fillRect(0, floor + 3, nw, 2);
      const cxm = Math.round(nw / 2);
      let kind = 'idle', y = floor;
      if (m < M_FALL) { kind = 'fall'; y = -6 + (floor + 6) * Math.pow(m / M_FALL, 1.6); }
      drawSprite(pose(kind, 0, now));
      blitSprite(cxm, y, 1, scx);
      if (m >= M_FALL && m < M_FALL + 0.1) {                               // landing puff
        const k = (m - M_FALL) / 0.1; scx.fillStyle = 'rgba(154,166,184,' + (0.8 * (1 - k)).toFixed(2) + ')';
        for (let i = 1; i <= 3; i++) { scx.fillRect(cxm - 6 - i * 2 * k - i, floor - 1 - i % 2, 2, 1); scx.fillRect(cxm + 6 + i * 2 * k + i, floor - 1 - i % 2, 2, 1); }
      }
      mctx.clearRect(0, 0, fw, fh);
      mctx.drawImage(scene, 0, 0, nw * MQ, nh * MQ);
      // de-pixelate: the real photo comes in as big blocks that shrink to full resolution
      if (m >= M_LAND && img && img.complete && img.naturalWidth) {
        const k = Math.min(1, (m - M_LAND) / (1 - M_LAND));
        const block = Math.max(1, Math.round(Math.pow(1 - k, 2) * 40 + 1));
        const tw = Math.max(1, Math.ceil(fw / block)), th = Math.max(1, Math.ceil(fh / block));
        tiny.width = tw; tiny.height = th;
        const iw = img.naturalWidth, ih = img.naturalHeight, sc = Math.max(fw / iw, fh / ih), dw = iw * sc, dh = ih * sc;
        tnx.imageSmoothingEnabled = true;
        tnx.drawImage(img, (fw - dw) * 0.5 / block, (fh - dh) * 0.15 / block, dw / block, dh / block);  // matches object-position 50% 15%
        mctx.globalAlpha = Math.min(1, k * 4);
        mctx.drawImage(tiny, 0, 0, tw * block, th * block);
        mctx.globalAlpha = 1;
        if (k < 0.18) { mctx.fillStyle = 'rgba(255,255,255,' + (0.7 * (1 - k / 0.18)).toFixed(2) + ')'; mctx.fillRect(0, 0, fw, fh); }  // flash
      }
    }
    if (morphActive()) mraf = requestAnimationFrame(morph);
  }
  if (mcv) { mcv.style.opacity = '1'; window.addEventListener('resize', () => { mShown = -1; kick(); }); }
  window.addEventListener('scroll', kick, { passive: true });
  document.addEventListener('visibilitychange', kick);
  const relayout = () => { layout(); if (!raf) { raf = requestAnimationFrame(frame); } };
  if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(hero); else window.addEventListener('resize', relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  layout();
  shown = target();
  raf = requestAnimationFrame(frame);
  kick();
})();
