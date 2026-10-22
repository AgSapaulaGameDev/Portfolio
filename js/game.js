/* Concept B scroll game. Generated from the Concept B design; edit content in this file or js/data.js. */
const SITE_SLUGS = {}, SITE_COVERS = {};
(window.GAMES || []).forEach((g) => { SITE_SLUGS[g.title] = g.slug; SITE_COVERS[g.title] = g.cover; });
SITE_COVERS['Bonus Stage'] = ((window.ART || [])[0] || {}).cover;
class Component extends DCLogic {
  constructor(props) {
    super(props);
    const lv0 = parseInt(new URLSearchParams(location.search).get('level'), 10);
    const p0 = lv0 > 0 ? 0.37 + (0.28 + 0.66 * ((Math.min(9, lv0) - 1) / 8)) * 0.41 : 0;
    this.state = { p: p0, sound: false, mx: 0, my: 0, pix: null, ptab: null, etab: null };
    this.scroller = null;
    this.raf = 0;
    this.mraf = 0;
    this.onScroll = (e) => {
      let el = e && e.target;
      if (!el || el === document || el.nodeType !== 1) el = document.scrollingElement || document.documentElement;
      // ignore scrolls from small inner panels (tab content, experience details); only the page scroller drives the game
      if (el.scrollHeight < 3000) return;
      const max = el.scrollHeight - el.clientHeight;
      if (max < 50) return;
      this.scroller = el;
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => {
        this.raf = 0;
        const q = Math.min(1, Math.max(0, el.scrollTop / max));
        const K = [[0, 0], [0.13, 0.09], [0.21, 0.198], [0.275, 0.205], [0.77, 0.88], [1, 1]]; let p = 1; for (let k = 1; k < K.length; k++) { if (q <= K[k][0]) { const a = K[k - 1], b = K[k]; p = a[1] + (b[1] - a[1]) * (q - a[0]) / (b[0] - a[0]); break; } }
        this.targetP = p;
        const pk = this.state.ptab, ek = this.state.etab;
        if ((pk && Math.abs(pk.p - p) > 0.012) || (ek && Math.abs(ek.p - p) > 0.012)) { const ns = {}; if (pk && Math.abs(pk.p - p) > 0.012) ns.ptab = null; if (ek && Math.abs(ek.p - p) > 0.012) ns.etab = null; this.setState(ns); }
        this.glide();
      });
    };
    // eases the displayed progress toward the scroll position so wheel steps become one smooth motion
    this.targetP = 0;
    this.glideRaf = 0;
    this.glide = () => {
      if (this.glideRaf) return;
      const step = (now) => {
        const dt = Math.min(64, now - (this.glideT || now)); this.glideT = now;
        const cur = this.state.p, d = this.targetP - cur;
        if (Math.abs(d) < 0.00004) { this.glideRaf = 0; this.glideT = 0; if (d !== 0) this.setState({ p: this.targetP }); return; }
        const k = 1 - Math.pow(1 - 0.14, dt / 16.67 || 1);
        this.setState({ p: cur + d * k });
        this.glideRaf = requestAnimationFrame(step);
      };
      this.glideRaf = requestAnimationFrame(step);
    };
    this.onMove = () => {}; // mouse parallax disabled (performance)
    this.onMoveOld = (e) => {
      const r = e.currentTarget && e.currentTarget.getBoundingClientRect ? e.currentTarget.getBoundingClientRect() : null;
      if (!r || !r.width) return;
      const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const my = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (this.mraf) return;
      this.mraf = requestAnimationFrame(() => { this.mraf = 0; this.setState({ mx: mx, my: my }); });
    };
    this.art = this.buildArt();
    const fi = [];
    for (let i = 0; i < 26; i++) fi.push({ x: 40 + i * 155 + ((i * 97) % 90), y: 150 + ((i * 53) % 230), s: 0.45 + ((i * 37) % 40) / 100 });
    this.farIslandData = fi;
    const cl = [];
    for (let i = 0; i < 10; i++) cl.push({ x: 120 + i * 520 + ((i * 131) % 200), y: 140 + ((i * 71) % 260), s: 0.8 + ((i * 29) % 60) / 100 });
    this.cloudData = cl;
    const pal = ['#33429B', '#F4A57F', '#7DBDF2', '#C3C1EA', '#B8A25E', '#8785C6', '#FFFFFF', '#28348A', '#C68A8C', '#5A99E0'];
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const pw = [];
    for (let i = 0; i < 180; i++) {
      const x = rnd() * 110 - 5, y = rnd() * 110 - 5;
      pw.push({ x: x, y: y, b: rnd() * 0.55, L: 0.3 + rnd() * 0.22, spin: (2.2 + rnd() * 2.4) * (rnd() < 0.85 ? 1 : -1), size: 2 + Math.floor(rnd() * 6), color: pal[Math.floor(rnd() * pal.length)], glow: rnd() < 0.35 });
    }
    this.powderData = pw;
  }
  buildArt() {
    let sd = 4242;
    const rnd = () => { sd = (sd * 16807) % 2147483647; return (sd - 1) / 2147483646; };
    const uri = (svg) => "url('data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg) + "')";
    const n1 = (v) => v.toFixed(1);
    // sky: wavy colour bands
    const bands = ['#7DBDF2', '#69ABEA', '#5A99E0', '#5A86D2', '#6576C2', '#7468B2', '#8A6AA6', '#A8749C', '#C68A8C', '#D49B82', '#B87C8E', '#9270A4', '#7466AE', '#6260AA'];
    let sky = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><rect width="1440" height="900" fill="' + bands[0] + '"/>';
    bands.forEach((c, k) => {
      if (!k) return;
      const y0 = 40 + k * 52, amp = 10 + (k % 3) * 6, ph = k * 1.7;
      let d = 'M0 ' + n1(y0 + Math.sin(ph) * amp);
      for (let x = 40; x <= 1440; x += 40) d += 'L' + x + ' ' + n1(y0 + Math.sin(ph + x / 210) * amp + Math.sin(x / 90 + k) * 4);
      sky += '<path d="' + d + 'L1440 900L0 900Z" fill="' + c + '"/>';
    });
    [560, 610, 655].forEach((y, k) => {
      let d = 'M' + (120 + k * 160) + ' ' + y;
      for (let x = 160 + k * 160; x <= 1300 - k * 80; x += 40) d += 'L' + x + ' ' + n1(y + Math.sin(x / 160 + k) * 8);
      sky += '<path d="' + d + '" fill="none" stroke="#F4A57F" stroke-width="' + (3 - k * 0.6) + '" stroke-opacity="0.55" stroke-linecap="round"/>';
    });
    sky += '</svg>';
    // clouds: navy puffs with peach rim light
    let cid = 0;
    const cloud = (puffs, flatY) => {
      cid++;
      let rimO = '', rimI = '', body = '', lift = '', curls = '';
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      puffs.forEach((q, k) => {
        const x = q[0], y = q[1], r = q[2];
        x0 = Math.min(x0, x - r); y0 = Math.min(y0, y - r); x1 = Math.max(x1, x + r); y1 = Math.max(y1, y + r);
        rimO += '<circle cx="' + n1(x - 4) + '" cy="' + n1(y - 9) + '" r="' + n1(r + 2) + '"/>';
        rimI += '<circle cx="' + n1(x - 2) + '" cy="' + n1(y - 5) + '" r="' + n1(r + 1) + '"/>';
        body += '<circle cx="' + n1(x) + '" cy="' + n1(y) + '" r="' + n1(r) + '"/>';
        lift += '<circle cx="' + n1(x - r * 0.1) + '" cy="' + n1(y - r * 0.34) + '" r="' + n1(r * 0.97) + '"/>';
        if (k % 2 === 1 && r > 22) {
          const a0 = (0.1 + 0.15 * (k % 3)) * Math.PI, a1 = a0 + 0.6 * Math.PI, rr = r * 0.74;
          curls += '<path d="M' + n1(x + Math.cos(a0) * rr) + ' ' + n1(y + Math.sin(a0) * rr) + ' A' + n1(rr) + ' ' + n1(rr) + ' 0 0 1 ' + n1(x + Math.cos(a1) * rr) + ' ' + n1(y + Math.sin(a1) * rr) + '"/>';
        }
      });
      const g = 'g' + cid;
      const fb = flatY ? '<clipPath id="fb' + cid + '"><rect x="-500" y="-500" width="3000" height="' + n1(flatY + 500) + '"/></clipPath>' : '';
      const wrapA = flatY ? '<g clip-path="url(#fb' + cid + ')">' : '<g>';
      return fb + wrapA + '<defs><linearGradient id="' + g + '" gradientUnits="userSpaceOnUse" x1="0" y1="' + n1(y0) + '" x2="0" y2="' + n1(y1) + '"><stop offset="0" stop-color="#9A8CCF"/><stop offset="0.55" stop-color="#7E70BE"/><stop offset="1" stop-color="#6658A8"/></linearGradient><clipPath id="c' + cid + '">' + body + '</clipPath></defs>' +
        '<g fill="#F6CF78" opacity="0.6">' + rimO + '</g><g fill="#E9AE52">' + rimI + '</g>' +
        '<g clip-path="url(#c' + cid + ')"><rect x="' + n1(x0) + '" y="' + n1(y0) + '" width="' + n1(x1 - x0) + '" height="' + n1(y1 - y0) + '" fill="#544792"/><g fill="url(#' + g + ')">' + lift + '</g>' +
        '<g fill="none" stroke="#E9AE52" stroke-width="4" stroke-linecap="round" opacity="0.75">' + curls + '</g></g>' + '</g>';
    };
    const chain = (pts, r0, r1, fill) => {
      const out = [];
      for (let k = 0; k < pts.length - 1; k++) {
        const a = pts[k], b = pts[k + 1];
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const steps = Math.max(1, Math.round(len / ((r0 + r1) * 0.34)));
        for (let t = 0; t < steps; t++) {
          const f = t / steps;
          const rr = rnd(); out.push([a[0] + (b[0] - a[0]) * f + (rnd() - 0.5) * 22, a[1] + (b[1] - a[1]) * f + (rnd() - 0.5) * 16, r0 + rr * rr * (r1 - r0) * 1.25]);
        }
      }
      return out.concat(fill || []);
    };
    // cloud layout traced from the mock (stage %, converted to layer space)
    const P2 = (pts) => pts.map((q) => [((q[0] + 5) / 110) * 1440, ((q[1] + 5) / 110) * 900].concat(q.length > 2 ? [q[2]] : []));
    const Y = (y) => ((y + 5) / 110) * 900;
    const front = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="none">' +
      cloud(chain(P2([[-6, -4], [2, 6], [8, 16], [12, 26], [14, 34], [10, 42]]), 46, 86, P2([[-10, 8, 210], [-6, 30, 120], [2, 2, 140]]))) +
      cloud(chain(P2([[105, 42], [99, 34], [94, 25], [90, 15], [87, 5], [85, -5]]), 46, 84, P2([[110, 10, 210], [104, 30, 120], [96, 0, 120]]))) +
      cloud(chain(P2([[-6, 70], [2, 66], [9, 64], [16, 65], [23, 67], [28, 70]]), 18, 34), Y(73)) +
      cloud(chain(P2([[74, 72], [80, 69], [87, 67], [94, 66], [101, 67], [107, 70]]), 18, 34), Y(75)) +
      '</svg>';
    const mid = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="none">' +
      cloud(chain(P2([[2, 55], [9, 53], [16, 52], [23, 53], [30, 55], [37, 57]]), 16, 30), Y(59)) +
      cloud(chain(P2([[62, 59], [68, 57], [75, 56], [82, 55.5], [89, 56], [96, 57], [104, 59]]), 16, 32), Y(62)) +
      cloud(chain(P2([[40, 62], [46, 61], [52, 62]]), 10, 18), Y(64)) +
      '</svg>';
    const back = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="none">' +
      cloud(chain(P2([[0, 30], [6, 28], [13, 30]]), 16, 28)) +
      cloud(chain(P2([[30, 40], [36, 38], [42, 40]]), 12, 22)) +
      cloud(chain(P2([[58, 37], [64, 36], [70, 38]]), 10, 18)) +
      '</svg>';
    // snow-capped pixel mountains
    let pid = 0;
    const snowPeak = (x, top, w, base, far) => {
      pid++;
      const C = far ? { lt: '#8D90D4', md: '#6E72BC', dk: '#5457A0', sn: '#EEEEFF', ss: '#C6C8EE', ol: '#3E3F86' } : { lt: '#6A70C4', md: '#4A4F9F', dk: '#2E3172', sn: '#F7F7FF', ss: '#BFC4EE', ol: '#1A1B4A' };
      const L = [x - w, base], A = [x, top], R = [x + w, base], M = [x + w * 0.1, base];
      const H = base - top;
      const jag = (p, q, n, s) => { const pts = []; for (let k = 1; k < n; k++) { const f = k / n; const bump = (k % 2 ? -1 : 1) * (0.3 + rnd() * 0.7); pts.push([p[0] + (q[0] - p[0]) * f + bump * w * 0.09 * s, p[1] + (q[1] - p[1]) * f + (rnd() - 0.55) * H * 0.11]); } return pts; };
      const left = jag(L, A, 7, 1), right = jag(A, R, 7, 1);
      const ridge = [[x + w * 0.02, top + H * 0.25], [x - w * 0.03, top + H * 0.5], [x + w * 0.06, top + H * 0.75]];
      const P = (arr) => arr.map((q) => n1(q[0]) + ' ' + n1(q[1])).join(' L');
      const sil = 'M' + P([L].concat(left, [A], right, [R])) + 'Z';
      const lightF = 'M' + P([L].concat(left, [A], ridge, [M])) + 'Z';
      const darkF = 'M' + P([A].concat(right, [R, M], ridge.slice().reverse())) + 'Z';
      const lc = [A[0] + (L[0] - A[0]) * 0.3, A[1] + (L[1] - A[1]) * 0.3], rc = [A[0] + (R[0] - A[0]) * 0.25, A[1] + (R[1] - A[1]) * 0.25];
      const drips = [];
      for (let k = 1; k < 9; k++) { const f = k / 9; drips.push([lc[0] + (rc[0] - lc[0]) * f, lc[1] + (rc[1] - lc[1]) * f + (k % 2 ? H * (0.04 + rnd() * 0.09) : -H * (0.02 + rnd() * 0.04))]); }
      const cap = 'M' + P([[A[0], A[1] - 20], [lc[0] - 30, lc[1]]].concat(drips, [[rc[0] + 30, rc[1]]])) + 'Z';
      let streaks = '';
      for (let k = 0; k < 3; k++) { const f = 0.36 + k * 0.1, sx = x - w * (0.15 + rnd() * 0.5) * (k % 2 ? -0.6 : 1), sy = top + H * f; streaks += 'M' + n1(sx) + ' ' + n1(sy) + ' L' + n1(sx + w * 0.07) + ' ' + n1(sy - H * 0.03) + ' L' + n1(sx + w * 0.04) + ' ' + n1(sy + H * 0.08) + 'Z'; }
      return '<defs><clipPath id="m' + pid + '"><path d="' + sil + '"/></clipPath><clipPath id="d' + pid + '"><path d="' + darkF + '"/></clipPath></defs>' +
        '<g clip-path="url(#m' + pid + ')"><path d="' + sil + '" fill="' + C.md + '"/><path d="' + lightF + '" fill="' + C.lt + '"/><path d="' + darkF + '" fill="' + C.dk + '"/>' +
        '<path d="' + cap + '" fill="' + C.sn + '"/><path d="' + streaks + '" fill="' + C.sn + '"/><g clip-path="url(#d' + pid + ')"><path d="' + cap + '" fill="' + C.ss + '"/><path d="' + streaks + '" fill="' + C.ss + '"/></g></g>' +
        '<path d="M' + P([L].concat(left, [A], right, [R])) + '" fill="none" stroke="' + C.ol + '" stroke-width="5" stroke-linejoin="round"/>';
    };
    const mtn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">' +
      [[600, 600, 150, 960], [850, 590, 160, 960], [60, 540, 180, 960], [250, 505, 200, 960], [430, 570, 170, 960], [1010, 525, 190, 960], [1200, 485, 210, 960], [1400, 545, 180, 960]].map((q) => snowPeak(q[0], q[1], q[2], q[3], true)).join('') +
      '</svg>';
    const peakSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="none">' +
      [[150, 745, 240, 1000], [1300, 735, 250, 1000], [420, 700, 250, 1000], [1030, 690, 260, 1000], [720, 515, 300, 1000], [520, 835, 180, 1010], [930, 825, 200, 1010]].map((q) => snowPeak(q[0], q[1], q[2], q[3], false)).join('') +
      '</svg>';
    // foreground land (khaki mesa) in the middle
    let specks2 = '';
    for (let k = 0; k < 70; k++) { const x = 470 + rnd() * 500, y = 740 + rnd() * 40 + (x - 720) * 0.02; specks2 += '<rect x="' + n1(x) + '" y="' + n1(y) + '" width="' + n1(4 + rnd() * 6) + '" height="' + n1(3 + rnd() * 4) + '" fill="' + (rnd() < 0.5 ? '#A99254' : '#DCC883') + '"/>'; }
    for (let k = 0; k < 40; k++) { const x = 440 + rnd() * 560, y = 800 + rnd() * 120; specks2 += '<rect x="' + n1(x) + '" y="' + n1(y) + '" width="' + n1(5 + rnd() * 8) + '" height="' + n1(4 + rnd() * 5) + '" fill="' + (x < 760 ? '#86703A' : '#5C4C26') + '"/>'; }
    const bone = (x, y, r) => '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ')"><rect x="-22" y="-4" width="44" height="8" fill="#EDE6D3"/><circle cx="-22" cy="-5" r="6" fill="#EDE6D3"/><circle cx="-22" cy="5" r="6" fill="#EDE6D3"/><circle cx="22" cy="-5" r="6" fill="#EDE6D3"/><circle cx="22" cy="5" r="6" fill="#EDE6D3"/></g>';
    const skull = (x, y) => '<g transform="translate(' + x + ' ' + y + ')"><path d="M-26 6 C-28 -22 28 -22 26 6 L18 10 L18 22 L-18 22 L-18 10 Z" fill="#EDE6D3" stroke="#2E2412" stroke-width="4"/><circle cx="-10" cy="2" r="7" fill="#2E2412"/><circle cx="10" cy="2" r="7" fill="#2E2412"/><rect x="-3" y="12" width="6" height="6" fill="#2E2412"/></g>';
    const landSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="none">' +
      '<g transform="translate(720 0) scale(1.2 1.12) translate(-720 -95)">' +
      '<path d="M330 1000 L380 880 L430 800 L470 760 L540 742 L640 728 L730 722 L820 730 L900 746 L960 770 L1010 800 L1060 880 L1110 1000 Z" fill="#9C8448"/>' +
      '<path d="M470 760 L540 742 L640 728 L730 722 L820 730 L900 746 L960 770 L940 790 L860 794 L760 800 L650 798 L560 796 L490 790 Z" fill="#CDB86E"/>' +
      '<path d="M490 790 L560 796 L650 798 L760 800 L860 794 L940 790 L960 770 L1010 800 L1060 880 L1110 1000 L780 1000 L790 900 L770 830 Z" fill="#6E5C30"/>' +
      '<path d="M330 1000 L380 880 L430 800 L470 760 L490 790 L450 840 L420 920 L410 1000 Z" fill="#B49D5B"/>' +
      '<path d="M490 790 L560 796 L650 798 L760 800 L860 794 L940 790" fill="none" stroke="#7E6A36" stroke-width="5"/>' + specks2 +
      '<path d="M600 735 L620 760 L605 790 M720 724 L745 760 L728 800 L752 860 L740 930 M860 742 L880 775 M560 820 L585 870 L570 930 M900 820 L880 880" fill="none" stroke="#3E321A" stroke-width="5" stroke-linecap="round"/>' +
      skull(640, 820) + skull(880, 812) + bone(560, 770, 18) + bone(800, 770, -12) + bone(700, 860, 30) +
      '<g transform="translate(905 690) rotate(14)"><rect x="-6" y="40" width="12" height="80" fill="#D9DEE5"/><rect x="0" y="40" width="6" height="80" fill="#9AA4B2"/><rect x="-26" y="30" width="52" height="12" fill="#E3B341"/><rect x="-7" y="-8" width="14" height="38" fill="#6B4423"/><rect x="-10" y="-20" width="20" height="14" fill="#E3B341"/><rect x="-5" y="-16" width="10" height="7" fill="#F85149"/></g>' +
      '<path d="M330 1000 L380 880 L430 800 L470 760 L540 742 L640 728 L730 722 L820 730 L900 746 L960 770 L1010 800 L1060 880 L1110 1000" fill="none" stroke="#2E2412" stroke-width="6" stroke-linejoin="round"/>' +
      '</g></svg>';
    return { sky: uri(sky), front: uri(front), back: uri(back), mtn: uri(mtn), peak: uri(peakSvg), land: uri(landSvg), landSvg: landSvg, skySvg: sky, midSvg: mid, frontSvg: front, backSvg: back, mtnSvg: mtn, peakSvg: peakSvg };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
    this.pixelate();
    this.onResize = () => { clearTimeout(this.pixTimer); this.pixTimer = setTimeout(() => this.pixelate(), 300); };
    window.addEventListener('resize', this.onResize);
    // index.html?level=N (from a level page's WORLD MAP button) opens straight on island N of the world map
    const lv = parseInt(new URLSearchParams(location.search).get('level'), 10);
    if (lv > 0) {
      const N = 9, k = Math.min(N, lv) - 1;
      const frac = 0.37 + (0.28 + 0.66 * (k / (N - 1))) * (0.78 - 0.37);
      this.targetP = frac;
      const go = () => {
        const el = document.scrollingElement || document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        const K = [[0, 0], [0.13, 0.09], [0.21, 0.198], [0.275, 0.205], [0.77, 0.88], [1, 1]]; let q = 1; for (let j = 1; j < K.length; j++) { if (frac <= K[j][1]) { const a = K[j - 1], b = K[j]; q = a[0] + (b[0] - a[0]) * (frac - a[1]) / (b[1] - a[1]); break; } }
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        el.scrollTo({ top: Math.round(q * max), behavior: 'auto' });
        this.scroller = el;
        this.setState({ p: frac });
        requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.remove('jumping')));
      };
      go();
    }
  }
  renderTerrain(lw, lh) {
    const cv = document.createElement('canvas'); cv.width = lw; cv.height = lh;
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(lw, lh), D = img.data;
    const LY = new Uint8Array(lw * lh), ZS = 290;
    const hash = (i, j) => { const v = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return v - Math.floor(v); };
    const vn = (x, z) => { const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi, u = xf * xf * (3 - 2 * xf), w = zf * zf * (3 - 2 * zf); const a = hash(xi, zi), b = hash(xi + 1, zi), c = hash(xi, zi + 1), d = hash(xi + 1, zi + 1); return a + (b - a) * u + (c - a) * w + (a - b - c + d) * u * w; };
    const ridged = (x, z) => { let s = 0, a = 1, f = 1, t = 0; for (let o = 0; o < 5; o++) { let n = 1 - Math.abs(vn(x * f, z * f) * 2 - 1); n *= n; s += n * a; t += a; a *= 0.5; f *= 2.03; } return s / t; };
    const camH = 26, f = lh * 1.15, asp = lw / lh, hor = lh * 0.8;
    const toLy = (y) => (y + 5) / 110, toLx = (x) => (x + 5) / 110;
    // layout traced from the mock: [screen x %, screen top %, half-width (fraction of screen), depth]
    const spec = [
      [79, 33, 0.3, 560], [62, 50, 0.13, 640], [35, 54, 0.14, 640],
      [67, 46, 0.12, 400], [42, 46, 0.15, 430], [25, 52, 0.13, 320],
      [51, 60.5, 0.15, 240],
      [22, 66, 0.14, 170], [87, 63, 0.13, 175], [3, 67, 0.08, 185], [98, 70, 0.07, 190], [72, 71, 0.09, 150]
    ];
    const peaks = spec.map((q) => { const z = q[3], x = (toLx(q[0]) - 0.5) * asp * 0.87 * z, ty = toLy(q[1]) * lh; return [x, z, camH + (hor - ty) * z / f, q[2] * asp * 0.87 * z * (q[1] === 60.5 ? 1.15 : 1.4), q[1]]; });
    const subs = [];
    peaks.forEach((q, k) => { if (k === 6) return; [-1, 1].forEach((sgn) => { const off = (0.32 + 0.12 * vn(k, sgn + 3)) * q[3] * sgn; subs.push({ host: q, off: off, dz: q[3] * 0.15 * sgn, hf: 0.62 + 0.18 * vn(k * 3, sgn), rf: 0.55 }); }); });
    let dom = -1, domT = 0;
    const Hraw = (x0, z, track) => {
      const x = x0 + 9 * (vn(x0 / 28, z / 28) - 0.5);
      let h = 5 * vn(x / 45, z / 45) - 3, di = -1, dt = 0;
      for (let k = 0; k < peaks.length; k++) { const q = peaks[k], d = Math.hypot(x - q[0], (z - q[1]) * 0.9); if (d < q[3]) { const t = 1 - d / q[3], v = q[2] * Math.pow(t, 1.6); if (v > h) { h = v; di = k; dt = t; } } }
      for (let k = 0; k < subs.length; k++) { const sb = subs[k], q = sb.host, R = q[3] * sb.rf, d = Math.hypot(x - q[0] - sb.off, (z - q[1] - sb.dz) * 0.9); if (d < R) { const t = 1 - d / R, v = q[2] * sb.hf * Math.pow(t, 1.1); if (v > h) { h = v; di = peaks.indexOf(q); dt = t * sb.hf; } } }
      if (track) { dom = di; domT = dt; }
      return h + 11 * ridged(x / 48, z / 48) * (0.3 + Math.max(0, h) / 70) + 4 * ridged(x / 13, z / 13) * Math.min(1, Math.max(0, h) / 60);
    };
    // calibrate so each summit lands where it is in the mock
    for (let it = 0; it < 3; it++) peaks.forEach((q) => { let best = -1e9; for (let dx = -q[3] * 0.15; dx <= q[3] * 0.15; dx += q[3] * 0.03) for (let dz = -q[3] * 0.15; dz <= q[3] * 0.15; dz += q[3] * 0.03) best = Math.max(best, Hraw(q[0] + dx, q[1] + dz)); const want = camH + (hor - toLy(q[4]) * lh) * q[1] / f; q[2] += (want - best) * 0.9; });
    const H = (x, z) => Hraw(x, z, false);
    const KZ = 58, KH = camH + (hor - toLy(91) * lh) * KZ / f;
    const knoll = (x, z) => {
      const dx = x, dz = (z - KZ) * 1.35, d = Math.hypot(dx, dz);
      const R = 40 + 5 * vn(Math.atan2(dz, dx) * 3, 2.2);
      if (d > R) return -99;
      const t = 1 - d / R;
      return KH * Math.pow(t, 0.3) + 1.2 * vn(x / 4, z / 4) - 0.03 * dz;
    };
    const hex = (s) => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
    const rock = ['#262A44', '#3A4064', '#555D86', '#7681A8', '#99A6C8'].map(hex);
    const snow = ['#5A76AE', '#7E9FD0', '#A9C8E8', '#D2E6F6', '#F2F8FF'].map(hex);
    const forest = ['#0F2120', '#17332A', '#224834', '#2F6040', '#3F7A4A'].map(hex);
    const grass = ['#1F3B2A', '#2D5634', '#3F713C', '#588C46', '#77A653'].map(hex);
    const fogC = hex('#8F88C9');
    const pal = rock.concat(snow, forest, grass, ['#7E7BC0', '#958DCB', '#A99ECF', '#6C6CB4', '#B8B0DA', '#5F63A8'].map(hex));
    const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    const L = [-0.78, 0.5, -0.38];
    const ybuf = new Int32Array(lw).fill(lh);
    const zbuf = new Float32Array(lw * lh).fill(1e9);
    const matAt = (x, z, h, slope, isKnoll) => {
      if (isKnoll) return 3;
      Hraw(x, z, true);
      const n = vn(x / 14, z / 14);
      const thr = 0.66 - (n - 0.5) * 0.2 + slope * 0.22 - (peaks[dom >= 0 ? dom : 0][1] > 380 ? 0.1 : 0);
      if (dom >= 0 && domT > thr) return 1;
      if (dom >= 0 && domT > thr - 0.22 && ridged(x / 7, z / 7) > 0.8) return 1;
      if ((dom < 0 || domT < 0.32) && slope < 0.55 && vn(x / 9, z / 9) > 0.36 && z < 460) return 2;
      return 0;
    };
    const ramps = [rock, snow, forest, grass];
    for (let i = 0; i < lw; i++) {
      const dir = (i / lw - 0.5) * asp * 0.87;
      let z = 6, dz = 0.35;
      while (z < 1300) {
        const x = dir * z, kv = z < 130 ? knoll(x, z) : -99, h0 = H(x, z), isK = kv >= h0, h = isK ? kv : h0;
        const sy = Math.max(0, Math.floor(hor - ((h - camH) / z) * f));
        if (sy < ybuf[i]) {
          const e = 1.2 + z * 0.004, HF = isK ? knoll : H;
          const hx = HF(x + e, z) - HF(x - e, z), hz = HF(x, z + e) - HF(x, z - e);
          let nx = -hx, ny = 2 * e, nz = -hz; const nl = Math.hypot(nx, ny, nz); nx /= nl; ny /= nl; nz /= nl;
          const lam = Math.max(0, nx * L[0] + ny * L[1] + nz * L[2]);
          const ramp = ramps[matAt(x, z, h, 1 - ny, isK)];
          const fz = Math.min(0.6, Math.max(0, (z - 320) / 700));
          for (let y = sy; y < ybuf[i]; y++) {
            const t = bayer[(y & 3) * 4 + (i & 3)] / 16 - 0.5;
            const v = Math.min(ramp.length - 1, Math.max(0, Math.round(Math.pow(lam, 0.85) * 1.45 * (ramp.length - 1) - 0.7 + t * 0.9)));
            let c = ramp[v];
            if (fz > 0) {
              const r = c[0] + (fogC[0] - c[0]) * fz + t * 22, g = c[1] + (fogC[1] - c[1]) * fz + t * 22, b = c[2] + (fogC[2] - c[2]) * fz + t * 22;
              let best = c, bd = 1e9; for (let k = 0; k < pal.length; k++) { const q = pal[k], dd = (q[0] - r) ** 2 + (q[1] - g) ** 2 + (q[2] - b) ** 2; if (dd < bd) { bd = dd; best = q; } }
              c = best;
            }
            const o = (y * lw + i) * 4; D[o] = c[0]; D[o + 1] = c[1]; D[o + 2] = c[2]; D[o + 3] = 255; zbuf[y * lw + i] = z; LY[y * lw + i] = z > ZS ? 2 : 1;
          }
          ybuf[i] = sy;
        }
        z += dz; dz *= 1.012;
      }
    }
    const project = (x, z, h) => [Math.round((x / z / (asp * 0.87) + 0.5) * lw), Math.round(hor - ((h - camH) / z) * f)];
    const put = (px, py, c, zz) => { if (px < 0 || py < 0 || px >= lw || py >= lh) return; const o = (py * lw + px) * 4; D[o] = c[0]; D[o + 1] = c[1]; D[o + 2] = c[2]; D[o + 3] = 255; LY[py * lw + px] = (zz || 0) > ZS ? 2 : 1; };
    const visible = (px, py, z) => px >= 0 && py >= 0 && px < lw && py < lh && Math.abs(zbuf[py * lw + px] - z) < z * 0.06;
    // winding trail up the central peak
    const trailA = hex('#D8B98A'), trailB = hex('#8E7458');
    for (let k = 0; k <= 1400; k++) {
      const cp = peaks[6], u = k / 1400, ang = Math.PI * 0.5 + Math.sin(u * Math.PI * 3.5) * 0.55, rad = cp[3] * 0.75 * (1 - u) + cp[3] * 0.12;
      const x = cp[0] + Math.cos(ang) * rad * 0.9, z = cp[1] - Math.sin(ang) * rad * 0.9;
      const h = H(x, z) + 0.3, p = project(x, z, h);
      if (visible(p[0], p[1], z) && u < 0.8) put(p[0], p[1], (k >> 2) % 3 ? trailA : trailB, z);
    }
    // trail on the knoll, leading to the sword
    for (let k = 0; k <= 400; k++) {
      const u = k / 400, z = 52 + u * 26, x = Math.sin(u * 5) * 4 + 6 * u;
      const h = knoll(x, z) + 0.2, p = project(x, z, h);
      if (visible(p[0], p[1], z)) { put(p[0], p[1], trailA); put(p[0] + 1, p[1], trailB); }
    }
    // pine trees on forested slopes
    const pine = [hex('#0B1A17'), hex('#173A2C'), hex('#2C5E3E'), hex('#4E8A52')];
    let sd = 99; const rnd = () => { sd = (sd * 16807) % 2147483647; return (sd - 1) / 2147483646; };
    const trees = [];
    for (let k = 0; k < 2600; k++) {
      const z = 110 + rnd() * 380, x = (rnd() - 0.5) * z * asp * 0.87 * 1.05, h = H(x, z);
      const e = 1.5, ny = 2 * e / Math.hypot(H(x + e, z) - H(x - e, z), 2 * e, H(x, z + e) - H(x, z - e));
      if (matAt(x, z, h, 1 - ny, false) !== 2) continue;
      const p = project(x, z, h);
      if (!visible(p[0], p[1], z)) continue;
      trees.push([p[0], p[1], z]);
    }
    trees.sort((a, b) => b[2] - a[2]);
    trees.forEach((t) => {
      const ht = Math.max(3, Math.min(14, Math.round(lh * 1.6 / t[2])));
      for (let r = 0; r < ht; r++) {
        const half = Math.floor((r / ht) * (ht * 0.38) + 0.5 * (r % 3 === 2 ? 1 : 0));
        for (let dx = -half; dx <= half; dx++) put(t[0] + dx, t[1] - ht + r, dx < 0 ? pine[2] : (dx === 0 ? pine[1] : pine[0]), t[2]);
      }
      put(t[0], t[1] - ht, pine[3], t[2]);
      put(t[0], t[1], pine[0], t[2]);
    });
    // silhouette outline against the sky
    const out = new Uint8ClampedArray(D);
    for (let y = 1; y < lh; y++) for (let i = 0; i < lw; i++) {
      const o = (y * lw + i) * 4, u2 = ((y - 1) * lw + i) * 4;
      if (D[o + 3] && !D[u2 + 3]) { out[o] = 30; out[o + 1] = 32; out[o + 2] = 70; }
    }
    const farImg = ctx.createImageData(lw, lh), FD = farImg.data;
    for (let k = 0; k < lw * lh; k++) { if (out[k * 4 + 3]) { const o = k * 4; FD[o] = out[o]; FD[o + 1] = out[o + 1]; FD[o + 2] = out[o + 2]; FD[o + 3] = 255; if (LY[k] === 2) out[o + 3] = 0; } }
    img.data.set(out);
    ctx.putImageData(img, 0, 0);
    const fc = document.createElement('canvas'); fc.width = lw; fc.height = lh; fc.getContext('2d').putImageData(farImg, 0, 0);
    // props on the knoll: sword, rocks, ferns
    const px1 = (x0, y0, w, h2, c) => { ctx.fillStyle = c; ctx.fillRect(x0, y0, w, h2); };
    const sp = project(8, KZ - 3, knoll(8, KZ - 3));
    px1(sp[0], sp[1] - 12, 2, 12, '#D9DEE5'); px1(sp[0] + 1, sp[1] - 12, 1, 12, '#8B95A3'); px1(sp[0] - 3, sp[1] - 14, 8, 2, '#E3B341'); px1(sp[0] - 3, sp[1] - 13, 8, 1, '#9E6A03');
    px1(sp[0], sp[1] - 19, 2, 5, '#6B4423'); px1(sp[0] - 1, sp[1] - 21, 4, 2, '#E3B341'); px1(sp[0], sp[1] - 21, 2, 1, '#F85149');
    const rockAt = (x, z, w, h2) => { const p = project(x, z, knoll(x, z)); px1(p[0] - w, p[1] - h2, w * 2, h2, '#5E6478'); px1(p[0] - w, p[1] - h2, w, 1, '#9AA2B6'); px1(p[0] - w, p[1] - 1, w * 2, 1, '#2A2E3E'); };
    rockAt(24, 66, 4, 4); rockAt(28, 70, 2, 3); rockAt(-22, 68, 3, 3);
    const fern = (x, z, s) => { const p = project(x, z, knoll(x, z)); for (let k = -3; k <= 3; k++) { for (let r = 0; r < s - Math.abs(k); r++) px1(p[0] + k * 2 + (k < 0 ? -r * 0.4 : r * 0.4), p[1] - r - 1, 1, 1, r % 2 ? '#3E8A3A' : '#5DB04A'); } };
    fern(18, 62, 7); fern(-14, 60, 6); fern(22, 74, 5);
    return { near: "url('" + cv.toDataURL('image/png') + "')", far: "url('" + fc.toDataURL('image/png') + "')" };
  }
  pixelate() {
    if (typeof document === 'undefined') return;
    const W = window.innerWidth || 1440, H = Math.min(920, Math.max(640, window.innerHeight || 900));
    const PX = W < 700 ? 3 : 4;
    const lw = Math.max(80, Math.round((W * 1.1) / PX)), lh = Math.max(60, Math.round((H * 1.1) / PX));
    const key = lw + 'x' + lh;
    if (this.pixKey === key) return;
    this.pixKey = key;
    const make = (svg) => new Promise((res) => {
      const pal = [];
      (svg.match(/#[0-9A-Fa-f]{6}/g) || []).forEach((h) => { const c = [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; if (!pal.some((q) => q[0] === c[0] && q[1] === c[1] && q[2] === c[2])) pal.push(c); });
      const im = new Image();
      im.onload = () => {
        const c = document.createElement('canvas'); c.width = lw; c.height = lh;
        const x = c.getContext('2d');
        x.drawImage(im, 0, 0, lw, lh);
        const d = x.getImageData(0, 0, lw, lh), a = d.data;
        for (let i = 0; i < a.length; i += 4) {
          if (a[i + 3] < 110) { a[i + 3] = 0; continue; }
          const al = a[i + 3] / 255;
          const r = a[i] / al, g = a[i + 1] / al, b = a[i + 2] / al;
          let best = 0, bd = 1e9;
          for (let k = 0; k < pal.length; k++) { const q = pal[k], dd = (q[0] - r) * (q[0] - r) * 0.3 + (q[1] - g) * (q[1] - g) * 0.59 + (q[2] - b) * (q[2] - b) * 0.11; if (dd < bd) { bd = dd; best = k; } }
          a[i] = pal[best][0]; a[i + 1] = pal[best][1]; a[i + 2] = pal[best][2]; a[i + 3] = 255;
        }
        x.putImageData(d, 0, 0);
        res("url('" + c.toDataURL('image/png') + "')");
      };
      im.onerror = () => res(null);
      im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', '<svg width="' + lw + '" height="' + lh + '" '));
    });
    const A = this.art;
    Promise.all([make(A.skySvg), make(A.backSvg), make(A.mtnSvg), make(A.peakSvg), make(A.frontSvg), make(A.midSvg)]).then((r) => {
      if (this.pixKey !== key) return;
      if (r.some((u) => !u)) return;
      let terr = null;
      try { terr = this.renderTerrain(lw, lh); } catch (e) { terr = null; }
      this.setState({ pix: { sky: r[0], back: r[1], mtn: terr ? terr.far : r[2], peak: terr ? terr.near : r[3], mid: r[5], front: r[4], land: 'none' } });
    });
  }
  componentWillUnmount() {
    clearTimeout(this.pixTimer);
    if (this.onResize) window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    document.removeEventListener('scroll', this.onScroll, { capture: true });
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.mraf) cancelAnimationFrame(this.mraf);
  }
  jumpTo(frac) {
    const el = this.scroller || document.scrollingElement || document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const K = [[0, 0], [0.13, 0.09], [0.21, 0.198], [0.275, 0.205], [0.77, 0.88], [1, 1]]; let q = 1; for (let k = 1; k < K.length; k++) { if (frac <= K[k][1]) { const a = K[k - 1], b = K[k]; q = a[0] + (b[0] - a[0]) * (frac - a[1]) / (b[1] - a[1]); break; } }
    if (el.scrollTo) el.scrollTo({ top: q * max, behavior: 'smooth' });
  }
  renderVals() {
    const p = this.state.p;
    const mx = this.state.mx, my = this.state.my;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const seg = (a, b) => clamp((p - a) / (b - a), 0, 1);
    const px = (v) => v.toFixed(1) + 'px';

    const scenes = [
      { id: 'title', name: 'TITLE SCREEN', a: 0, b: 0.1, short: 'START', E: 0, z: 11 },
      { id: 'boot', name: 'BOOTING', a: 0.1, b: 0.235, short: 'BOOT', E: 0, z: 10 },
      { id: 'player', name: 'PLAYER SELECT', a: 0.235, b: 0.37, short: 'P1', E: 0.025, z: 12 },
      { id: 'world', name: 'WORLD MAP', a: 0.37, b: 0.78, short: 'MAP', E: 0.1, z: 13 },
      { id: 'boss', name: 'BOSS LEVEL', a: 0.78, b: 0.88, short: 'BOSS', E: 0.025, z: 14 },
      { id: 'credits', name: 'CREDITS', a: 0.88, b: 1.0001, short: 'END', E: 0.045, z: 15 }
    ];
    const stageBg = 'background: radial-gradient(ellipse at 50% 120%, #0D2A5C 0%, #0D1117 45%, #010409 100%);';
    let current = 0;
    scenes.forEach((s, i) => { if (p >= s.a) current = i; s.local = (p - s.a) / (s.b - s.a); s.fi = s.E ? clamp((p - s.a) / s.E, 0, 1) : 1; });
    const sc = {};
    scenes.forEach((s, i) => {
      const next = scenes[i + 1];
      const until = next ? next.a + next.E + 0.01 : 2;
      const from = s.id === 'boot' ? 0 : s.a - 0.0001;
      const vis = p >= from && p < until;
      const fe = ease(s.fi);
      let extra = '';
      if (s.id === 'title') {
        extra = '';
      } else if (s.id === 'boot') {
        extra = 'background: radial-gradient(ellipse at 50% 32%, #3A3D42 0%, #26282C 50%, #17181B 100%);';
      } else if (s.id === 'player') {
        extra = stageBg + 'opacity: ' + fe.toFixed(3) + ';';
      } else if (s.id === 'world') {
        const bfe = ease(scenes[4].fi) * (p >= scenes[4].a ? 1 : 0);
        extra = '__WORLDBG__ opacity: ' + (s.fi >= 0.999 || s.fi > 0.58 ? 1 : 0) + '; transform-origin: 50% 35%; transform: scale(' + ((1 + 0.55 * (1 - ease(Math.min(1, Math.max(0, (s.fi - 0.62) / 0.36))))) * (1 + 0.45 * bfe)).toFixed(4) + ');' + (bfe > 0 ? ' filter: blur(' + (bfe * 4).toFixed(2) + 'px) brightness(' + (1 - 0.45 * bfe).toFixed(3) + ');' : '');
      } else if (s.id === 'boss') {
        const dR = (fe * 34).toFixed(2), sw = (fe * 150 - 30).toFixed(1);
        const dm = 'radial-gradient(circle, #000 ' + dR + 'px, transparent ' + (fe * 34 + 0.6).toFixed(2) + 'px) 0 0 / 40px 40px, linear-gradient(115deg, #000 ' + sw + '%, transparent ' + (fe * 150 - 12).toFixed(1) + '%)';
        extra = stageBg + (fe < 0.999 ? '-webkit-mask: ' + dm + '; mask: ' + dm + '; -webkit-mask-composite: source-over; mask-composite: add;' : '');
      } else {
        extra = 'background: linear-gradient(#050818 0%, #0B1438 40%, #1A2A6C 75%, #2B3A7A 100%); border-top: 2px solid rgba(143, 211, 255, 0.45); box-shadow: 0 -30px 80px rgba(0, 0, 0, 0.7); transform: translateY(' + ((1 - fe) * 100).toFixed(2) + '%); border-radius: ' + (40 * (1 - fe)).toFixed(1) + 'px ' + (40 * (1 - fe)).toFixed(1) + 'px 0 0;';
      }
      sc[s.id] = 'position: absolute; inset: 0; overflow: hidden; z-index: ' + s.z + '; visibility: ' + (vis ? 'visible' : 'hidden') + '; pointer-events: ' + (i === current && s.fi >= 0.98 ? 'auto' : 'none') + '; ' + extra;
    });

    // ---- Title parallax (scroll + mouse) ----
    const lt = clamp(scenes[0].local, 0, 1);
    const layer = (scrollY, mDepth, scale, origin) => 'transform: translate(' + px(-mx * mDepth) + ', ' + px(scrollY - my * mDepth * 0.5) + ') scale(' + scale.toFixed(4) + '); transform-origin: ' + origin + ';';
    const CLIMB_A = 0.004, CLIMB_B = 0.034, GRAB_A = 0.034, GRAB_B = 0.044, SUCK_A = 0.046, SUCK_B = 0.079, FLY_A = 0.079;
    const climbT = seg(CLIMB_A, CLIMB_B);
    const grab = ease(seg(GRAB_A, GRAB_B));
    const suckE = ease(seg(SUCK_A, SUCK_B));
    const cam = ease(seg(0, GRAB_B));
    const art = this.art;
    const mR = (1 - suckE) * 1500;
    // each layer twists and shrinks into the cartridge; nearer layers go first and faster (depth parallax)
    const pull = (depth, mDepth, scale, pf, rot) => {
      const lag = 0.18 * (1 - pf); // far layers start a little later (depth parallax)
      const s = ease(clamp((suckE - lag) / (1 - lag), 0, 1));
      const pe = 0.55 + 0.45 * pf;
      const shrink = 1 - Math.min(0.97, pe * Math.pow(s, 1.1));
      // soft round edge appears as the layer pulls away, so no rectangle corners are ever visible
      const R = (150 - 100 * Math.min(1, s * 4)).toFixed(1); // mask ellipse shrinks from beyond the corners to the layer's edges
      const soft = s > 0.001 ? ' -webkit-mask-image: radial-gradient(' + R + '% ' + R + '% at 50% 48%, #000 45%, transparent 100%); mask-image: radial-gradient(' + R + '% ' + R + '% at 50% 48%, #000 45%, transparent 100%);' : '';
      return soft + ' will-change: transform, opacity; transform-origin: 50% 48%; transform: translate3d(0, ' + px(cam * depth * (1 - s)) + ', 0) rotate(' + (rot * 0.7 * s * s).toFixed(2) + 'deg) scale(' + ((scale + cam * 0.04) * shrink).toFixed(4) + '); opacity: ' + (1 - clamp((s - 0.78) / 0.2, 0, 1)).toFixed(3) + ';';
    };
    const pix = this.state.pix;
    const lay = (k) => 'position: absolute; inset: -5%; background-image: ' + (pix ? pix[k] : (k === 'mtn' || k === 'peak' || k === 'land' || k === 'mid' ? 'none' : art[k])) + '; background-size: 100% 100%; background-repeat: no-repeat; image-rendering: pixelated; image-rendering: crisp-edges;';
    const skyStyle = lay('sky') + pull(14, 4, 1.02, 0.12, 0);
    const cloudsBackWrap = 'position: absolute; inset: 0; ' + pull(26, 12, 1, 0.85, 75);
    const cloudsBackImg = lay('back') + ' animation: driftA 18s steps(9) infinite;';
    const mtnStyle = lay('mtn') + pull(0, 10, 1, 0.62, -40);
    const midWrap = 'position: absolute; inset: 0; ' + pull(20, 18, 1, 0.8, 60);
    const midImg = lay('mid') + ' animation: driftA 22s steps(11) infinite;';
    const peakWrap = lay('peak') + pull(0, 10, 1, 0.62, -40);
    const landWrap = 'display: none;';
    const cloudsFrontWrap = 'position: absolute; inset: 0; ' + pull(-10, 40, 1.03, 0.95, 110);
    const grainSvg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 2.2 -1.1"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>');
    const grainStyle = 'position: absolute; inset: -40px; pointer-events: none; z-index: 2; background-image: url(\'data:image/svg+xml;charset=utf-8,' + grainSvg + '\'); background-size: 240px 240px; opacity: 0.4; mix-blend-mode: soft-light; animation: noiseShift 0.5s steps(4) infinite;';
    const cloudsFrontImg = lay('front') + ' animation: driftB 14s steps(7) infinite;';
    const dustStyle = 'display: none;';
    const titleText = 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 12vh 24px 0; gap: 18px; text-align: center; opacity: ' + (1 - clamp(climbT / 0.35, 0, 1)).toFixed(3) + '; transform: translateY(' + px(-cam * 120) + ');';
    const scrollCue = 'position: absolute; left: 50%; bottom: 128px; transform: translateX(-50%); z-index: 5; display: flex; flex-direction: row; align-items: center; gap: 14px; padding: 12px 22px; background: rgba(13, 17, 23, 0.78); border: 2px solid #FFFFFF; border-radius: 999px; box-shadow: 4px 4px 0 #26317E, 0 0 24px rgba(255, 255, 255, 0.25); pointer-events: none; opacity: ' + (1 - clamp(climbT / 0.15, 0, 1)).toFixed(3) + ';';

    // ---- Console boot sequence ----
    const INS_A = 0.09, INS_B = 0.13, CAB_A = 0.13, CAB_B = 0.16, CRT_A = 0.16, CRT_B = 0.185, LOAD_B = 0.205, SW_A = 0.205, SW_B = 0.215, ZOOM_A = 0.215, ZOOM_B = 0.26;
    const zoomT = ease(seg(ZOOM_A, ZOOM_B));
    const zoom = 1 + zoomT * 1.974;
    const rigBase = 'position: absolute; left: 50%; top: 50%; height: 72%; aspect-ratio: 760 / 600; transform-origin: 50% 33%; transform: translate(-50%, -50%) translate(' + px(-mx * 10 * (1 - zoomT)) + ', ' + px(-my * 6 * (1 - zoomT)) + ') translate(0, ' + (16.95 * zoomT).toFixed(3) + '%) scale(' + zoom.toFixed(4) + ');';
    const cartVisible = p < ZOOM_A + (ZOOM_B - ZOOM_A) * 0.7;
    const cartRig = rigBase + ' z-index: 30; pointer-events: none; visibility: ' + (cartVisible ? 'visible' : 'hidden') + ';';

    const CW = 15.8, CH = 22.5, SLOT = 72.9;
    const fly = ease(seg(FLY_A, INS_A));
    const ins = ease(seg(INS_A, INS_B));
    const idleTop = 34.5, holdTop = 36, hoverTop = 32, insertedTop = SLOT - CH * 0.31;
    const recede = ease(seg(CLIMB_A, GRAB_B));
    const reveal = clamp((suckE - 0.15) / 0.75, 0, 1);
    const labelArt = 'position: absolute; inset: 3px; overflow: hidden; border-radius: 2px; background: linear-gradient(#7DBDF2 0%, #5A99E0 22%, #6576C2 40%, #8A6AA6 52%, #C68A8C 62%, #7466AE 72%); clip-path: circle(' + (reveal * 75).toFixed(1) + '% at 50% 55%);' + (reveal > 0 && reveal < 1 ? ' filter: brightness(' + (1 + (1 - reveal) * 0.6).toFixed(2) + ');' : '');
    let cTop = idleTop + (holdTop - idleTop) * recede;
    cTop = cTop + (hoverTop - cTop) * fly;
    cTop = cTop + (insertedTop - cTop) * ins;
    let cScale = 1.45 - 0.62 * recede + 0.2 * Math.sin(suckE * Math.PI * 0.5);
    cScale = cScale + (1 - cScale) * fly;
    const below = Math.max(0, (cTop + CH) - SLOT) / CH * 100;
    const wob = Math.sin(ins * Math.PI) * 4;
    const cart = 'position: absolute; left: ' + (50 - CW / 2).toFixed(2) + '%; top: ' + cTop.toFixed(2) + '%; width: ' + CW + '%; height: ' + CH + '%; transform: scale(' + cScale.toFixed(4) + ') rotate(' + wob.toFixed(2) + 'deg); ' + (below > 0 ? 'clip-path: inset(0 0 ' + below.toFixed(2) + '% 0);' : '');
    const spinning = p < 0.016;
    const suck = suckE;
    const swirl = Math.sin(suck * Math.PI);
    const jit = swirl * 3.5;
    const cartBob = 'width: 100%; height: 100%; ' + (p < CLIMB_B ? 'animation: hover3d 4s ease-in-out infinite;' : '') + ' filter: drop-shadow(0 0 ' + (8 + swirl * 46).toFixed(1) + 'px rgba(255, 214, 170, ' + (0.45 + swirl * 0.5).toFixed(2) + '));';
    const sk = Math.max(0.002, Math.pow(1 - suck, 1.8));
    const dis1 = clamp((suck - 0.32) / 0.5, 0, 1), dis2 = clamp((suck - 0.4) / 0.5, 0, 1);
    const r1 = 5.2 * (1 - dis1), r2 = 8.2 * (1 - dis2);
    const wMask = 'radial-gradient(circle, #000 ' + r1.toFixed(2) + 'px, transparent ' + (r1 + 0.8).toFixed(2) + 'px), radial-gradient(circle, #000 ' + r2.toFixed(2) + 'px, transparent ' + (r2 + 0.8).toFixed(2) + 'px)';
    const maskCss = suck > 0.001 ? '-webkit-mask-image: ' + wMask + '; mask-image: ' + wMask + '; -webkit-mask-size: 7px 7px, 11px 11px; mask-size: 7px 7px, 11px 11px; -webkit-mask-composite: source-in; mask-composite: intersect;' : '';
    const worldStyle = 'position: absolute; inset: 0; overflow: hidden; transform-origin: 50% 48%; opacity: ' + (1 - clamp((suck - 0.86) / 0.12, 0, 1)).toFixed(3) + ';';
    const PW = (typeof window !== 'undefined' && window.innerWidth) || 1440;
    const PH = Math.min(920, Math.max(640, (typeof window !== 'undefined' && window.innerHeight) || 900));
    const powder = [];
    if (suck > 0.0005 && suck < 0.9999) {
      this.powderData.forEach((d) => {
        const t = clamp((suck - d.b) / d.L, 0, 1);
        if (t <= 0 || t >= 1) return;
        const ti = Math.pow(t, 2.1);
        const dx0 = (d.x - 50) / 100 * PW, dy0 = (d.y - 48) / 100 * PH;
        const r0 = Math.sqrt(dx0 * dx0 + dy0 * dy0), a0 = Math.atan2(dy0, dx0);
        const a = a0 + d.spin * ti, r = r0 * (1 - ti);
        const o = Math.min(1, t * 6) * (1 - clamp((t - 0.82) / 0.18, 0, 1));
        const sz = d.size * (1 - 0.6 * ti);
        powder.push('position: absolute; left: 50%; top: 48%; width: ' + sz.toFixed(1) + 'px; height: ' + sz.toFixed(1) + 'px; background: ' + d.color + '; opacity: ' + o.toFixed(3) + '; transform: translate(' + (Math.cos(a) * r).toFixed(1) + 'px, ' + (Math.sin(a) * r).toFixed(1) + 'px) rotate(' + (a * 57.3).toFixed(0) + 'deg) scaleX(' + (1 + ti * 2.5).toFixed(2) + ');' + (d.glow ? ' box-shadow: 0 0 6px ' + d.color + ';' : ''));
      });
    }
    const streakMask = 'radial-gradient(circle at 50% 50%, transparent 1.5%, #000 7%, transparent 30%)';
    const streakStyle = 'position: absolute; left: 50%; top: 48%; width: 220vmax; height: 220vmax; margin: -110vmax 0 0 -110vmax; pointer-events: none; will-change: transform, opacity; transform: rotate(' + (suck * 540).toFixed(1) + 'deg); background: repeating-conic-gradient(from 0deg at 50% 50%, rgba(255, 230, 210, 0) 0deg, rgba(255, 236, 220, 0.7) 1.5deg, rgba(255, 230, 210, 0) 5deg, rgba(255, 230, 210, 0) 11deg); -webkit-mask-image: ' + streakMask + '; mask-image: ' + streakMask + '; opacity: ' + (swirl * 0.35).toFixed(3) + ';';
    const coreStyle = 'position: absolute; left: 50%; top: 48%; width: 640px; height: 640px; margin: -320px 0 0 -320px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(255, 246, 232, 0.98), rgba(244, 165, 127, 0.45) 22%, transparent 60%); transform: scale(' + (0.15 + swirl * 1.05).toFixed(3) + ') rotate(' + (suck * -300).toFixed(1) + 'deg); opacity: ' + swirl.toFixed(3) + ';';
    const tilt = 1 - ins;
    let cartSpin;
    if (spinning) {
      if (this.spinA0 != null) { this.spinDelay = (((this.spinA0 % 360) + 360) % 360) / 360 * 9; this.spinA0 = null; }
      cartSpin = 'position: relative; width: 100%; height: 100%; transform-style: preserve-3d; animation: spinY 9s linear infinite; animation-delay: -' + (this.spinDelay || 0).toFixed(3) + 's;';
    } else {
      if (this.spinA0 == null) {
        // read where the idle spin currently is, so the scroll pose continues from that angle (no snap)
        let a = -28;
        try { const an = (document.getAnimations ? document.getAnimations() : []).find((x) => x.animationName === 'spinY'); if (an) { const pr = an.effect.getComputedTiming().progress; if (pr != null) a = pr * 360; } } catch (e) {}
        this.spinA0 = a - 360 * Math.round((a + 28) / 360);
      }
      const k = ease(seg(0.016, CLIMB_B));
      const ry = this.spinA0 + (-28 - this.spinA0) * k; // idle angle -> -28deg pose
      const rot = ry + 360 * suck; // one smooth turn while sucking in, ends at 332deg = the -28deg pose
      cartSpin = 'position: relative; width: 100%; height: 100%; transform-style: preserve-3d; will-change: transform; transform: rotateX(' + (14 * tilt + swirl * 6).toFixed(2) + 'deg) rotateY(' + (suck >= 1 ? (360 - 28 * tilt) : rot).toFixed(2) + 'deg);';
    }

    const insFlash = Math.max(0, 1 - Math.abs(p - INS_B) / 0.012);
    const slot = 'position: absolute; left: 40.6%; top: 72.2%; width: 18.8%; height: 1.4%; background: #050506; border-radius: 2px; box-shadow: inset 0 2px 3px #000, 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 ' + (6 + insFlash * 30).toFixed(0) + 'px rgba(88, 166, 255, ' + (insFlash * 0.9).toFixed(2) + ');';
    const cab = ease(seg(CAB_A, CAB_B));
    const sparkT = Math.max(0, 1 - Math.abs(p - CAB_B) / 0.01);
    const powered = p >= CRT_A;
    const led = 'position: absolute; left: 27.4%; top: 85.4%; width: 1.7%; aspect-ratio: 1; border-radius: 50%; ' + (powered ? 'background: radial-gradient(circle at 40% 35%, #8BF59A, #3FB950 60%); box-shadow: 0 0 10px #3FB950, 0 0 22px rgba(63, 185, 80, 0.6);' : (p >= INS_B ? 'background: #8E1519; box-shadow: 0 0 6px rgba(248, 81, 73, 0.5);' : 'background: #2A2C30; box-shadow: inset 0 1px 2px #000;'));
    const crtT = seg(CRT_A, CRT_B);
    const loadT = seg(CRT_B, LOAD_B);
    const screen = 'position: absolute; left: 19.2%; top: 9.7%; width: 61.4%; height: 46.7%; border-radius: 20px; overflow: hidden; background: #050608; ' + (powered ? 'box-shadow: 0 0 50px rgba(120, 170, 255, ' + (0.08 + 0.18 * crtT).toFixed(2) + ');' : '');
    const lineScale = powered ? 0.012 + 0.988 * ease(clamp((crtT - 0.3) / 0.6, 0, 1)) : 0;
    const crtLine = 'position: absolute; left: 0; right: 0; top: 50%; height: 100%; background: #DDEBFF; transform: translateY(-50%) scaleY(' + lineScale.toFixed(4) + ') scaleX(' + (powered ? Math.min(1, 0.05 + crtT * 4).toFixed(3) : 0) + '); opacity: ' + (powered ? (1 - clamp((crtT - 0.8) / 0.2, 0, 1)).toFixed(3) : 0) + ';';
    const bootContent = 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; background: radial-gradient(ellipse at 50% 45%, #10141C 0%, #06080C 60%, #020304 100%); opacity: ' + clamp((crtT - 0.75) / 0.25, 0, 1).toFixed(3) + ';';
    const lgOn = (t0) => { const t = clamp((loadT - t0) / 0.14, 0, 1); return 'transition: none; opacity: ' + (0.08 + 0.92 * t).toFixed(3) + '; filter: brightness(' + (0.4 + 0.6 * t + Math.sin(t * Math.PI) * 0.8).toFixed(2) + ') drop-shadow(0 0 ' + (2 + Math.sin(t * Math.PI) * 14 + t * 4).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.15 + Math.sin(t * Math.PI) * 0.6).toFixed(2) + '));'; };
    const wordT = clamp((loadT - 0.45) / 0.15, 0, 1), sweepT = clamp((loadT - 0.6) / 0.2, 0, 1);
    const lg = { a: lgOn(0.0), b: lgOn(0.12), c: lgOn(0.24), d: lgOn(0.36), word: 'opacity: ' + wordT.toFixed(3) + '; transform: translateY(' + ((1 - wordT) * 6).toFixed(1) + 'px);', sweep: 'position: absolute; top: 0; bottom: 0; width: 40%; left: ' + (-50 + sweepT * 160).toFixed(1) + '%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent); mix-blend-mode: overlay; opacity: ' + (sweepT > 0 && sweepT < 1 ? 1 : 0) + ';' };
    const loadBar = 'height: 100%; background: linear-gradient(90deg, #3FB950, #58A6FF); width: ' + (loadT * 100).toFixed(1) + '%';
    const pressStart = 'font-size: 9px; color: #FFFFFF; opacity: ' + (loadT >= 1 ? 1 : 0) + '; ' + (loadT >= 1 ? 'animation: blink 0.9s steps(1) infinite;' : '');
    const zoomFade = 'display: none;';
    const swT = seg(SW_A, SW_B);
    const sideOpen = clamp((zoomT - 0.85) / 0.15, 0, 1);
    const vw = (typeof window !== 'undefined' && window.innerWidth) || 1440;
    const vh = Math.min(920, Math.max(640, (typeof window !== 'undefined' && window.innerHeight) || 900));
    const side = Math.max(0, (vw - vh * 1.6656) / 2) * (1 - sideOpen);
    const k = 0.3362 * zoom;
    const pVis = p >= SW_A && p < scenes[3].a + scenes[3].E + 0.01;
    const flashIn = p < SW_A ? 0 : Math.max(0, 1 - (p - SW_A) / 0.006);
    let pExtra = stageBg;
    if (p < ZOOM_B) {
      pExtra += 'opacity: ' + swT.toFixed(3) + '; transform-origin: 50% 50%; transform: translate(' + px(-mx * 10 * (1 - zoomT)) + ', calc(' + (-12.2 * (1 - zoomT)).toFixed(3) + '% + ' + px(-my * 6 * (1 - zoomT)) + ')) scale(' + k.toFixed(4) + '); clip-path: inset(0 ' + px(side) + ' round ' + px((20 / k) * (1 - zoomT)) + ');';
    }
    const wfe = ease(scenes[3].fi);
    if (p >= ZOOM_B && wfe > 0) pExtra += 'transform-origin: 50% 40%; transform: scale(' + (1 + 0.12 * wfe).toFixed(4) + ');';
    sc.player = 'position: absolute; inset: 0; overflow: hidden; z-index: 12; visibility: ' + (pVis ? 'visible' : 'hidden') + '; pointer-events: ' + (current === 2 ? 'auto' : 'none') + '; ' + pExtra;
    const screenFlash = 'position: absolute; inset: 0; pointer-events: none; background: #DDEBFF; opacity: ' + (flashIn * 0.85).toFixed(3) + ';';
    let bootCaption = 'SCROLL ▼ TO INSERT CARTRIDGE';
    if (p >= INS_A && p < INS_B) bootCaption = 'INSERTING CARTRIDGE...';
    else if (p >= CAB_A && p < CAB_B) bootCaption = 'CONNECTING CONTROLLER...';
    else if (p >= CRT_A && p < CRT_B) bootCaption = 'POWER ON';
    else if (p >= CRT_B && p < LOAD_B) bootCaption = 'LOADING ' + Math.round(loadT * 100) + '%';
    else if (p >= LOAD_B) bootCaption = 'PRESS START ▼';

    // ---- World map ----
    const games = [
      { title: 'Tidal Wins', kind: 'SLOT · UNITY · C#', role: 'Lead Developer', blurb: 'Ocean-themed slot game with a paytable balanced through RTP computations.', built: ['Reel spin and staggered stop system', 'Payline win evaluation', 'RTP-balanced symbol weights'] },
      { title: 'MinaTamis', kind: 'SIMULATION · UNITY', role: 'PM · Game Designer · Lead Dev', blurb: 'A 3D Filipino dessert vendor simulator.', built: ['Dessert preparation workflows', 'Customer interaction system', 'UI/UX and store customization'] },
      { title: 'Agent Snow', kind: 'STEALTH · UNITY', role: 'Game Designer & Developer', blurb: 'Tactical stealth-action shooter in a high-security facility.', built: ['NavMesh patrol AI with sight cones', 'Weapon, ammo and reload system', 'Freeze and poison status effects'] },
      { title: 'Pixel Z', kind: '2D PLATFORMER · UNITY', role: 'Lead Developer', blurb: 'Retro-inspired platformer with tight, modern movement.', built: ['Double jump and wall-jump controller', 'Collectible-driven progression', 'Pixel art assets'] },
      { title: 'Tusok Tusok', kind: 'ARCADE · MOBILE', role: 'Solo Game Developer', blurb: 'Fast-paced Filipino street-food catcher.', built: ['Touch drag catcher controls', 'Level, spawn and timer system', 'Lives and bomb hazard mechanic'] },
      { title: 'Lucid Dreams', kind: 'PHYSICS ACTION · UNITY', role: 'Game Designer', blurb: 'A surreal dream world where furniture fights back.', built: ['Dreamscape environments', 'Physics sandbox encounters', 'Surreal visual style'] },
      { title: 'Space Shooter', kind: 'ARCADE · MONOGAME', role: 'Solo Developer', blurb: 'Retro arcade shooter written without an engine.', built: ['Collision detection', 'Enemy and boss patterns', 'Score and power-ups'] },
      { title: 'Card Matching', kind: 'PUZZLE · C#', role: 'Solo Developer', blurb: 'Memory puzzle with scoring and sound feedback.', built: ['Shuffle and match logic', 'Scoring with penalties', 'Flip and win audio'] },
      { title: 'Bonus Stage', bonus: true, kind: '★ SECRET AREA · 3D MODELS & ANIMATION', role: 'Maya · Blender · Substance Painter', blurb: 'My 3D art collection: 8 models and 3 animated scenes.', built: ['3D models: Door Console, Cooking Environment, Food Truck, Chef Character, Weapon, Sci-Fi Control Room, Sci-Fi Wall, Chess Piece', 'Animations: Helicopter Island Scene, Billiards Room, Set Drive Helicopter', 'Modeling, texturing, lighting and animation'] }
    ];
    const N = games.length;
    const SP = 380;
    const w = scenes[3];
    const mapT = clamp((w.local - 0.28) / 0.66, 0, 1);
    const pos = mapT * (N - 1);
    const active = Math.round(pos);
    const cy = (i) => (i % 2 ? 146 : 82);
    const pathD = games.map((g, i) => (i ? 'L' : 'M') + (SP / 2 + i * SP) + ' ' + cy(i)).join(' ');
    const i0 = Math.floor(pos), i1 = Math.min(N - 1, i0 + 1);
    const markerY = cy(i0) + (cy(i1) - cy(i0)) * (pos - i0);
    const TH = [
      ['ocean', '#7A5A2E', '#F2D59A', '#C9A55E', '#3FB950'],
      ['store', '#6B4423', '#E3C27A', '#C9A55E', '#4E9A3A'],
      ['snow', '#5A6E86', '#D6E2EE', '#A9BBCF', '#F4F8FF'],
      ['zombie', '#3A2E24', '#6E6650', '#4F4938', '#5E7A3A'],
      ['street', '#6B4423', '#D9B07A', '#B08A55', '#C9A55E'],
      ['dream', '#4A3F7A', '#B9A8E6', '#8E7CC8', '#C7B8F2'],
      ['space', '#241A44', '#5A4A90', '#3B2E66', '#7B5FC0'],
      ['cards', '#1B5E3A', '#E6EDF3', '#B9C2CC', '#2E8B57'],
      ['art', '#5E4526', '#FFE08A', '#C9962A', '#F2C14E']
    ];
    const nodes = games.map((g, i) => {
      const th = TH[i % TH.length], thFlags = {}; TH.forEach((t) => { thFlags[t[0]] = t[0] === th[0]; });
      const isA = i === active, done = i < active;
      return {
        num: g.bonus ? '★' : String(i + 1),
        title: g.title,
        state: isA ? 'NOW PLAYING' : (done ? 'CLEARED' : 'LOCKED'),
        wrap: 'width: ' + SP + 'px; flex: none; position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; padding-top: ' + (cy(i) - 32) + 'px; box-sizing: border-box',
        island: 'width: 124px; height: 76px; position: relative; flex: none; transition: transform .3s ease, filter .3s ease; ' + (isA ? 'transform: scale(1.14); filter: drop-shadow(0 0 16px rgba(88,166,255,.85));' : (done ? 'filter: drop-shadow(0 4px 6px rgba(0,0,0,.45));' : 'filter: grayscale(.7) brightness(.72);')),
        rings: 'position: absolute; left: 50%; top: 44px; width: 0; height: 0; opacity: ' + (isA ? 1 : (done ? 0.6 : 0.4)) + ';',
        r1: 'position: absolute; left: 50%; top: 50%; width: 170px; height: 85px; margin: -42px 0 0 -85px; border-radius: 50%; background: radial-gradient(ellipse, rgba(140, 210, 255, 0) 55%, rgba(140, 210, 255, 0.22) 92%, rgba(220, 245, 255, 0.35200000000000004) 97%, rgba(140, 210, 255, 0) 100%);' + (isA ? ' animation: ringPulse 3s ease-in-out 0s infinite;' : ''),
        r2: 'position: absolute; left: 50%; top: 50%; width: 250px; height: 125px; margin: -62px 0 0 -125px; border-radius: 50%; background: radial-gradient(ellipse, rgba(140, 210, 255, 0) 55%, rgba(140, 210, 255, 0.16) 92%, rgba(220, 245, 255, 0.256) 97%, rgba(140, 210, 255, 0) 100%);' + (isA ? ' animation: ringPulse 3s ease-in-out 0.4s infinite;' : ''),
        r3: 'position: absolute; left: 50%; top: 50%; width: 340px; height: 170px; margin: -85px 0 0 -170px; border-radius: 50%; background: radial-gradient(ellipse, rgba(140, 210, 255, 0) 55%, rgba(140, 210, 255, 0.11) 92%, rgba(220, 245, 255, 0.17600000000000002) 97%, rgba(140, 210, 255, 0) 100%);' + (isA ? ' animation: ringPulse 3s ease-in-out 0.8s infinite;' : ''),
        r0: 'position: absolute; left: 50%; top: 50%; width: 420px; height: 210px; margin: -105px 0 0 -210px; border-radius: 50%; background: radial-gradient(ellipse, rgba(120, 200, 255, ' + (isA ? 0.28 : 0.12) + '), rgba(120, 200, 255, 0) 70%);',
        fog: done || isA ? 'display: none;' : 'position: absolute; left: -110px; right: -110px; top: -30px; height: 150px; border-radius: 50%; background: radial-gradient(ellipse 50% 40% at 40% 55%, rgba(215, 235, 250, 0.42), rgba(215, 235, 250, 0) 70%), radial-gradient(ellipse 40% 35% at 65% 45%, rgba(215, 235, 250, 0.32), rgba(215, 235, 250, 0) 70%); pointer-events: none; animation: driftA 9s ease-in-out infinite;',
        ripple: 'position: absolute; left: -16px; right: -16px; top: 10px; height: 66px; border-radius: 50%; border: 2px solid rgba(121,192,255,.55); ' + (isA ? 'animation: ripple 1.6s ease-out infinite;' : 'opacity: .35;'),
        th: thFlags,
        cliff: 'position: absolute; left: 0; right: 0; top: 16px; height: 56px; border-radius: 50%; background: ' + th[1] + ';',
        sand: 'position: absolute; left: 0; right: 0; top: 4px; height: 56px; border-radius: 50%; background: ' + th[2] + '; box-shadow: inset 0 -4px 0 ' + th[3] + ';',
        grass: 'position: absolute; left: 14px; right: 14px; top: 9px; height: 40px; border-radius: 50%; background: ' + th[4] + '; box-shadow: inset 0 -5px 0 rgba(0,0,0,.18);',
        label: 'font-family: Space Grotesk, sans-serif; font-weight: 700; font-size: 17px; transition: color .25s; color: ' + (isA ? '#FFFFFF' : (done ? '#C9D1D9' : '#8B949E')),
        badge: 'font-size: 8px; color: ' + (isA ? '#58A6FF' : (done ? '#3FB950' : '#8B949E'))
      };
    });
    const camX = pos * SP;
    const SKY = [
      ['#2A7FD4', '#4FA8EE', '#8FD0F7', '#CDEFFF', '#FFE9B8', '#FFD08A', 0],
      ['#3E6FC2', '#6E9FE0', '#B9C9EA', '#F6D8B0', '#F4B482', '#E8955E', 0],
      ['#6B83B8', '#93A9D6', '#C3D2EC', '#E4ECF7', '#F4F7FB', '#FFFFFF', 0],
      ['#121A14', '#22331F', '#3E5A2E', '#6E8A42', '#A3B464', '#C9C98A', 0.45],
      ['#0E1238', '#241E5A', '#4A2E78', '#8A3E7A', '#D45E6A', '#F2A05A', 0.75],
      ['#6A5AC8', '#9A88E6', '#C7B8F2', '#F2C6E6', '#FFD9E8', '#FFF0F5', 0.15],
      ['#05040F', '#0E0A2A', '#1E1650', '#3A2A7A', '#6A4AA8', '#A88BEA', 1],
      ['#0E2A1C', '#164A30', '#1F6B44', '#2E8B57', '#C9A44A', '#F2D58A', 0.2],
      ['#2A1B4A', '#4A2E78', '#7A4AA8', '#C77DCE', '#F2B6C8', '#FFE2A8', 0.35]
    ];
    const hx = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const mix = (a, b, t) => { const A = hx(a), B = hx(b); return 'rgb(' + A.map((v, k) => Math.round(v + (B[k] - v) * t)).join(', ') + ')'; };
    const sk0 = SKY[Math.min(SKY.length - 1, i0) % SKY.length], sk1 = SKY[Math.min(SKY.length - 1, i1) % SKY.length], skT = ease(clamp(pos - i0, 0, 1));
    const stops = [0, 22, 44, 62, 80, 100].map((pc, k) => mix(sk0[k], sk1[k], skT) + ' ' + pc + '%');
    sc.world = sc.world.replace('__WORLDBG__', 'background: linear-gradient(' + stops.join(', ') + ');');
    const starO = sk0[6] + (sk1[6] - sk0[6]) * skT;
    const worldStars = 'position: absolute; inset: 0 0 35% 0; pointer-events: none; opacity: ' + starO.toFixed(3) + '; background-image: radial-gradient(#FFFFFF 1px, transparent 1.4px), radial-gradient(#CFE3FF 1px, transparent 1.4px), radial-gradient(#FFFFFF 0.8px, transparent 1.2px); background-size: 160px 120px, 110px 90px, 70px 60px; background-position: 0 0, 50px 40px, 20px 15px; transform: translateX(' + px(-camX * 0.1) + ');';

    const PHs = Math.min(920, Math.max(640, (typeof window !== 'undefined' && window.innerHeight) || 900));
    const farIslands = this.farIslandData.map((f, i) => {
      const kind = i % 3 === 1 ? 'wreck' : 'weed';
      const y = (i % 2 ? 0.2 : 0.52) * PHs + ((i * 53) % 120);
      if (kind === 'wreck') return { style: 'position: absolute; left: ' + f.x + 'px; top: ' + (PHs * (0.12 + (i % 4) * 0.13)).toFixed(0) + 'px; width: ' + (90 + f.s * 70).toFixed(0) + 'px; height: ' + (30 + f.s * 24).toFixed(0) + 'px; opacity: ' + (0.35 + f.s * 0.4).toFixed(2) + '; animation: driftA ' + (10 + i % 5) + 's ease-in-out infinite;', top: 'display: none;', html: true, weed: false };
      return { style: 'position: absolute; left: ' + f.x + 'px; top: ' + (PHs * (0.3 + (i % 5) * 0.09)).toFixed(0) + 'px; width: ' + (30 + f.s * 26).toFixed(0) + 'px; height: ' + (20 + f.s * 17).toFixed(0) + 'px; opacity: ' + (0.3 + f.s * 0.35).toFixed(2) + '; animation: islandBob ' + (4 + (i % 3)) + 's ease-in-out infinite;', top: 'display: none;', html: false, weed: true };
    });
    const clouds = this.cloudData.map((c) => ({
      style: 'position: absolute; left: ' + c.x + 'px; top: ' + c.y + 'px; width: ' + (110 * c.s).toFixed(0) + 'px; height: ' + (34 * c.s).toFixed(0) + 'px; opacity: 0.14; animation: bob 6s ease-in-out infinite;'
    }));

    const boss = scenes[4];
    const bossLocal = clamp((boss.local - 0.1) / 0.8, 0, 1);
    const hit = 1 - boss.fi;
    const bl = clamp(boss.local, 0, 1);
    const autoE = bl < 0.52 ? 0 : 1;
    const ePick = this.state.etab;
    const eI = ePick && Math.abs(ePick.p - p) < 0.012 ? ePick.i : autoE;
    const EXP = [
      { name: 'Monstronauts', sub: 'Potion Punch 2 · Unity', glyph: 'M', c1: '#F85149', c2: '#A371F7', col: '#F85149', badge: 'MAIN QUEST',
        role: 'Game Developer Engineering Intern', company: 'Monstronauts', dates: '6-month internship · [Month Year – Month Year]', kind: 'SHIPPED STUDIO TITLE',
        desc: 'Joined the development team of Potion Punch 2, a live Unity title, as an engineering intern. Worked inside an established codebase and team workflow, taking on UI, localization and integration tasks from the sprint board through to merged, reviewed changes.',
        items: ['Diagnosed and fixed UI defects in production, including tooltip layout and text-wrapping issues in a custom TooltipSource component.', 'Integrated Unity Localization smart strings so dynamic values such as shop names and level numbers render correctly in-game.', 'Worked in a feature-branch Git workflow: rebasing onto master and resolving prefab and ScriptableObject asset merge conflicts.', '[Add a measurable result, e.g. number of tickets closed or features shipped]'],
        tags: ['Unity', 'C#', 'Unity Localization', 'UI', 'Git', 'Sublime Merge'],
        facts: [['ROLE', 'Engineering Intern'], ['PROJECT', 'Potion Punch 2'], ['ENGINE', 'Unity · C#'], ['DURATION', '6 months']],
        imgHint: 'Potion Punch 2 store art or a screenshot (what Monstronauts allows you to share)', status: 'QUEST COMPLETE · TITLE SHIPPED', xp: '600' },
      { name: 'Lamina Studios', sub: 'Unreal Engine', glyph: 'L', c1: '#1F6FEB', c2: '#0D2A5C', col: '#58A6FF', badge: 'SIDE QUEST',
        role: 'Unreal Game Developer Intern', company: 'Lamina Studios', dates: 'Internship · [Month Year – Month Year]', kind: 'GAMEPLAY PROGRAMMING',
        desc: 'Worked as a game developer intern in Unreal Engine, focused on core gameplay systems: how enemies think and move, and how the player controls their character.',
        items: ['Implemented enemy AI behaviours that react to the player during encounters.', 'Built and tuned player movement for responsive, readable controls.', 'Set up navigation so enemies path correctly through level geometry.', '[Add the project name and a measurable result]'],
        tags: ['Unreal Engine', 'Enemy AI', 'Navigation', 'Player Movement'],
        facts: [['ROLE', 'Game Developer Intern'], ['FOCUS', 'Gameplay AI'], ['ENGINE', 'Unreal Engine'], ['DURATION', '[Duration]']],
        imgHint: 'A screenshot or clip still from your Lamina Studios work', status: 'QUEST COMPLETE', xp: '400' }
    ];
    const E = EXP[eI];
    const exp = {
      count: 'STUDIO ' + (eI + 1) + ' / ' + EXP.length,
      tabs: EXP.map((x, k) => ({ name: x.name, sub: x.sub, glyph: x.glyph, badge: x.badge,
        go: () => this.setState({ etab: { i: k, p: this.state.p } }),
        crest: 'flex: none; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); background: linear-gradient(' + x.c1 + ', ' + x.c2 + ');' + (k === eI ? '' : ' filter: grayscale(0.6) brightness(0.7);'),
        badgeStyle: 'align-self: flex-start; font-size: 7px; padding: 3px 6px; border: 2px solid ' + x.col + '; color: ' + x.col + ';',
        style: 'display: flex; gap: 12px; align-items: center; padding: 14px; cursor: pointer; font: inherit; text-align: left; background: ' + (k === eI ? '#111827' : '#0D1117') + '; border: 3px solid ' + (k === eI ? x.col : '#30363D') + '; box-shadow: ' + (k === eI ? '6px 6px 0 #010409, 0 0 24px ' + x.col + '33' : 'none') + '; transform: translateX(' + (k === eI ? 6 : 0) + 'px);' })),
      accent: 'height: 4px; background: linear-gradient(90deg, ' + E.c1 + ', ' + E.c2 + ');',
      anim: 'animation: ' + (eI ? 'pop' : 'popB') + ' .35s ease both;',
      ovf: 'overflow: ' + (current === 4 && boss.fi >= 0.98 ? 'auto' : 'hidden') + ';',
      kind: E.kind, kindStyle: 'font-size: 8px; color: ' + E.col + ';', role: E.role, company: E.company, dates: E.dates, desc: E.desc,
      items: E.items.map((t) => ({ text: t, dot: 'width: 8px; height: 8px; margin-top: 7px; background: ' + (t.charAt(0) === '[' ? '#30363D' : E.col) + ';' })),
      tags: E.tags, facts: E.facts.map((f) => ({ k: f[0], v: f[1] })), imgHint: E.imgHint, status: E.status, xp: E.xp
    };

    const cr = scenes[5];
    const crLocal = clamp((p - cr.a - cr.E) / (cr.b - cr.a - cr.E), 0, 1);
    const rollT = clamp(crLocal / 0.66, 0, 1);
    const contO = clamp((crLocal - 0.7) / 0.12, 0, 1);
    const tiers = ['MAIN', 'MAIN', 'RARE', 'RARE', 'EPIC', 'EPIC', 'TOOL', 'TOOL'];
    const inv = ['Unity', 'C#', 'Unreal', 'C++', 'Maya', 'Blender', 'Git', 'Substance'];
    const pfe = ease(scenes[2].fi);
    const wraw = scenes[3].fi;
    const segW = (a0, b0) => clamp((wraw - a0) / (b0 - a0), 0, 1);
    const inT = p > scenes[3].a - 0.001 && wraw < 1;
    const exitT = ease(segW(0.26, 0.4));
    const stampT = segW(0, 0.2);
    const psLeft = 'transform: translateX(' + (-130 * exitT).toFixed(1) + '%) rotate(' + (-8 * exitT).toFixed(1) + 'deg); opacity: ' + (1 - exitT).toFixed(3) + ';';
    const psRight = 'transform: translateX(' + (130 * exitT).toFixed(1) + '%); opacity: ' + (1 - exitT).toFixed(3) + ';';
    const sp = stampT < 0.35 ? stampT / 0.35 : 1;
    const readyStamp = 'position: absolute; left: 0; right: 0; top: 42%; display: flex; justify-content: center; pointer-events: none; z-index: 5; opacity: ' + (stampT > 0 ? (1 - segW(0.18, 0.26)).toFixed(3) : 0) + '; transform: scale(' + (stampT > 0 ? (2.2 - 1.2 * Math.min(1, sp * 1.1) + (sp >= 1 ? 0 : 0)).toFixed(3) : 1) + ') rotate(-4deg);';
    const closeT = ease(segW(0.4, 0.58)), openT = ease(segW(0.66, 0.86));
    const cover = closeT * (1 - openT);
    const bankH = 58;
    const diveTop = 'position: absolute; left: -2%; right: -2%; top: 0; height: ' + bankH + '%; z-index: 16; pointer-events: none; display: ' + (inT && cover > 0.001 ? 'block' : 'none') + '; transform: translateY(' + (-(1 - cover) * 135).toFixed(1) + '%);';
    const diveBot = 'position: absolute; left: -2%; right: -2%; bottom: 0; height: ' + bankH + '%; z-index: 16; pointer-events: none; display: ' + (inT && cover > 0.001 ? 'block' : 'none') + '; transform: translateY(' + ((1 - cover) * 135).toFixed(1) + '%);';
    const diveStreaks = 'position: absolute; inset: 0; z-index: 17; pointer-events: none; display: ' + (inT && cover > 0.05 ? 'block' : 'none') + '; opacity: ' + (cover * 0.6).toFixed(3) + '; background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0) 0 22px, rgba(255, 255, 255, 0.55) 22px 24px, rgba(255, 255, 255, 0) 24px 70px); background-size: 100% 140px; animation: rise 0.6s linear infinite;';
    const landT = segW(0.78, 0.98);
    const bounce = (t) => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375; return n * (t -= 2.625 / d) * t + 0.984375; };
    const dropOff = 0;
    const splashT = segW(0.86, 1);
    const splash = 'display: none;';
    const mv = (a0, b0) => ease(segW(a0, b0));
    const morphOn = inT && wraw > 0.26 && wraw < 0.88;
    const cardCx = (vw > 1220 ? (vw - 1220) / 2 : 0) + 32 + 150, cardCy = 96 + 40 + 150;
    const go1 = mv(0.26, 0.38);
    const tgtCx = vw / 2, tgtCy = vh * 0.46;
    const endCx = vw / 2, endCy = 132 + (cy(0) - 74) + 27;
    const shrink = mv(0.66, 0.88);
    let mx0 = cardCx + (tgtCx - cardCx) * go1, my0 = cardCy + (tgtCy - cardCy) * go1;
    mx0 = mx0 + (endCx - mx0) * shrink; my0 = my0 + (endCy - my0) * shrink;
    const big = 270 * (1 + 0.15 * go1);
    const size = big + (55 - big) * shrink;
    const pixT = segW(0.38, 0.52);
    const blocks = pixT <= 0 ? 0 : [48, 32, 22, 15, 10][Math.min(4, Math.floor(pixT * 5))];
    const swapT = mv(0.5, 0.58);
    const flashT = Math.max(0, 1 - Math.abs(wraw - 0.54) / 0.05);
    const mWrap = 'position: absolute; left: ' + px(mx0) + '; top: ' + px(my0) + '; width: ' + px(size) + '; height: ' + px(size) + '; transform: translate(-50%, -50%); z-index: 18; pointer-events: none; display: ' + (morphOn ? 'block' : 'none') + ';';
    const mGlow = 'position: absolute; inset: -40%; border-radius: 50%; background: radial-gradient(circle, rgba(143, 211, 255, 0.55), rgba(143, 211, 255, 0) 65%); opacity: ' + (go1 * (1 - shrink)).toFixed(3) + ';';
    const mPhotoBox = 'position: absolute; inset: 0; overflow: hidden; border: 3px solid #58A6FF; box-shadow: 0 0 30px rgba(88, 166, 255, 0.6); background: #E9EEF3; opacity: ' + (1 - swapT).toFixed(3) + ';';
    const mPhoto = 'position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; image-rendering: pixelated;';
    const mP = {}; [['p0', 0], ['p48', 48], ['p32', 32], ['p22', 22], ['p15', 15], ['p10', 10]].forEach((q) => { mP[q[0]] = mPhoto + (blocks === q[1] ? '' : ' display: none;'); });
    const mSprite = 'position: absolute; left: 10%; top: 0; width: 80%; height: 100%; shape-rendering: crispEdges; overflow: visible; opacity: ' + swapT.toFixed(3) + '; transform: scale(' + (0.85 + 0.15 * swapT).toFixed(3) + '); filter: drop-shadow(0 0 ' + (12 * (1 - shrink)).toFixed(1) + 'px rgba(143, 211, 255, 0.9));';
    const mFlash = 'position: absolute; inset: -30%; border-radius: 50%; background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 60%); opacity: ' + flashT.toFixed(3) + ';';
    const worldZoom = 1 + 0.55 * (1 - ease(segW(0.5, 0.95)));
    const worldShow = wraw >= 0.999 || segW(0.45, 0.5) > 0;
    const pl = scenes[2];
    const autoTab = clamp(Math.floor(clamp((pl.local - 0.22) / 0.72, 0, 0.999) * 4), 0, 3);
    const pick = this.state.ptab;
    const tabI = pick && Math.abs(pick.p - p) < 0.012 ? pick.i : autoTab;
    const tabDefs = [['BIO', '☺', '#58A6FF'], ['SKILLS', '★', '#3FB950'], ['QUESTS', '!', '#E3B341'], ['ACHIEVEMENTS', '♦', '#A371F7']];
    const ptabs = tabDefs.map((t, i) => ({
      label: t[0], glyph: t[1],
      go: () => this.setState({ ptab: { i: i, p: this.state.p } }),
      icon: 'display: inline-flex; width: 16px; height: 16px; align-items: center; justify-content: center; margin-right: 8px; font-size: 9px; background: ' + (i === tabI ? '#010409' : t[2]) + '; color: ' + (i === tabI ? t[2] : '#010409') + ';',
      style: 'font-size: 9px; height: 40px; padding: 0 14px; cursor: pointer; display: inline-flex; align-items: center; border: 3px solid ' + (i === tabI ? t[2] : '#30363D') + '; border-bottom: 0; ' + (i === tabI ? 'background: ' + t[2] + '; color: #010409; transform: translateY(3px);' : 'background: #0D1117; color: #8B949E;')
    }));
    const panelBase = 'position: absolute; inset: 0; padding: 22px 26px; box-sizing: border-box; overflow: ' + (p >= scenes[2].a + scenes[2].E && p < scenes[3].a ? 'auto' : 'hidden') + '; display: flex; flex-direction: column; gap: 14px;';
    const pt = {};
    ['bio', 'skills', 'quests', 'certs'].forEach((k, i) => { pt[k] = panelBase + (i === tabI ? ' animation: ' + (tabI % 2 ? 'pop' : 'popB') + ' .35s ease both;' : ' display: none;'); });
    const seg10 = (v, c) => { const out = []; for (let k = 0; k < 10; k++) out.push('flex: 1; height: 100%; background: ' + (k < Math.round(v / 10) ? c : '#21262D') + ';' + (k < Math.round(v / 10) ? ' box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.25);' : '')); return out; };
    const lvOf = (v) => (v >= 90 ? 'MAX' : 'LV ' + Math.round(v / 10));
    const skillGroups = [
      ['ENGINES', '#58A6FF', [['Unity', 90], ['Unreal Engine', 50], ['Godot', 50]]],
      ['PROGRAMMING', '#3FB950', [['C#', 90], ['C++', 85], ['Python', 80]]],
      ['3D & ART', '#A371F7', [['Maya', 95], ['Blender', 80], ['Substance Painter', 85]]],
      ['DESIGN', '#E3B341', [['Game Design', 90], ['Level Design', 85], ['UI / UX', 75]]]
    ].map((g) => ({ name: g[0], items: g[2].map((it) => ({ name: it[0], lv: lvOf(it[1]), segs: seg10(it[1], g[1]) })) }));
    const tools = ['Git', 'GitHub', 'Visual Studio', 'MonoGame', 'Photoshop', 'Illustrator', 'Audacity', 'SQL', 'JavaScript', 'HTML / CSS'];
    const quests = [
      ['Game Developer Engineering Intern', 'MAIN QUEST', '#3FB950', 'Monstronauts · Potion Punch 2 · 6 months', 'Worked on a live team Unity project: UI and tooltip fixes, Unity Localization, and a full Git branch-and-rebase workflow.'],
      ['Unreal Game Developer Intern', 'SIDE QUEST', '#58A6FF', 'Lamina Studios', 'Built enemy AI, player movement and navigation in Unreal Engine.'],
      ['BS Information Technology', 'TRAINING ARC', '#E3B341', 'Major in Animation & Game Development', 'Shipped student games including MinaTamis, Agent Snow and Pixel Z. [Add school and year]']
    ].map((q, i) => ({ title: q[0], tag: q[1], org: q[3], text: q[4], tagStyle: 'font-size: 7px; padding: 4px 6px; border: 2px solid ' + q[2] + '; color: ' + q[2] + ';', dot: 'width: 14px; height: 14px; margin-top: 4px; background: ' + (i === 0 ? q[2] : '#0D1117') + '; border: 3px solid ' + q[2] + '; box-shadow: 0 0 10px ' + q[2] + '66;' }));
    const certs = [
      ['★', 'Shipped a studio title', 'Potion Punch 2 · Monstronauts', 'UNLOCKED', '#3FB950'],
      ['◆', 'Graduated', 'BSIT · Animation & Game Dev', 'UNLOCKED', '#3FB950'],
      ['?', '[Certificate name]', '[Issuer · Year]', 'LOCKED', '#484F58'],
      ['?', '[Certificate name]', '[Issuer · Year]', 'LOCKED', '#484F58'],
      ['?', '[Certificate name]', '[Issuer · Year]', 'LOCKED', '#484F58'],
      ['?', '[Award / game jam]', '[Event · Year]', 'LOCKED', '#484F58']
    ].map((c) => ({ glyph: c[0], title: c[1], sub: c[2], state: c[3],
      style: 'display: flex; gap: 12px; align-items: center; padding: 12px; background: #161B22; border: 2px ' + (c[3] === 'LOCKED' ? 'dashed #30363D' : 'solid ' + c[4]) + ';' + (c[3] === 'LOCKED' ? ' opacity: 0.75;' : ' box-shadow: 0 0 18px rgba(63, 185, 80, 0.15);'),
      badge: 'flex: none; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); background: ' + (c[3] === 'LOCKED' ? '#21262D' : '#E3B341') + '; color: ' + (c[3] === 'LOCKED' ? '#6E7681' : '#010409') + ';',
      stateStyle: 'font-size: 7px; color: ' + c[4] + ';' }));


    return {
      sc: sc,
      onMove: this.onMove,
      starStyle: 'position: absolute; inset: -10%; background-image: radial-gradient(#58A6FF 1px, transparent 1.5px), radial-gradient(#E6EDF3 1px, transparent 1.5px); background-size: 140px 140px, 90px 90px; background-position: 0 0, 40px 60px; opacity: 0.35; transform: translate(' + px(-mx * 4) + ', ' + px(-p * 300 - my * 3) + ');',
      skyStyle: skyStyle, cloudsBackWrap: cloudsBackWrap, cloudsBackImg: cloudsBackImg, mtnStyle: mtnStyle, midWrap: midWrap, midImg: midImg, peakWrap: peakWrap, landWrap: landWrap, cloudsFrontWrap: cloudsFrontWrap, cloudsFrontImg: cloudsFrontImg, grainStyle: grainStyle,
      
      titleText: titleText, scrollCue: scrollCue,
      worldStyle: worldStyle, streakStyle: streakStyle, coreStyle: coreStyle, powder: powder,
      rig: rigBase, cartRig: cartRig, cart: cart, cartBob: cartBob, cartSpin: cartSpin, labelArt: labelArt,
      slot: slot, led: led, screen: screen, crtLine: crtLine, bootContent: bootContent, lg: lg, loadBar: loadBar, pressStart: pressStart, zoomFade: zoomFade, screenFlash: screenFlash, bootCaption: bootCaption,
      cableDash: (1 - cab).toFixed(4),
      plugO: (cab >= 0.98 ? 1 : 0).toFixed(0),
      sparkR: (6 + (1 - sparkT) * 18).toFixed(1),
      sparkO: sparkT.toFixed(3),
      playerInner: '',
      sceneName: scenes[current].name,
      levelHud: String(current + 1),
      xpBar: 'height: 100%; background: linear-gradient(90deg, #3FB950, #58A6FF); width: ' + (p * 100).toFixed(2) + '%',
      psLeft: psLeft, psRight: psRight, readyStamp: readyStamp, diveTop: diveTop, diveBot: diveBot, diveStreaks: diveStreaks, splash: splash, mWrap: mWrap, mGlow: mGlow, mPhotoBox: mPhotoBox, mPhoto: mPhoto, mP: mP, mSprite: mSprite, mFlash: mFlash, cardPhoto: 'position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; opacity: ' + (inT && wraw > 0.26 ? 0 : 1) + ';', ptabs: ptabs, pt: pt, skillGroups: skillGroups, tools: tools, quests: quests, certs: certs,
      inventory: inv.map((n, i) => ({ name: n, tier: tiers[i], style: 'height: 64px; display: flex; flex-direction: column; justify-content: space-between; padding: 10px; background: #161B22; border: 2px solid ' + (i < 2 ? '#1F6FEB' : '#30363D') + ';' })),
      nodes: nodes,
      farIslands: farIslands,
      clouds: clouds,
      farIslandStrip: 'position: absolute; left: 0; top: 0; width: 4200px; height: 100%; transform: translateX(' + px(-camX * 0.35 - mx * 12) + ');',
      cloudStrip: 'display: none; position: absolute; left: 0; top: 0; width: 6000px; height: 100%; pointer-events: none; transform: translateX(' + px(-camX * 1.5 - mx * 30) + ');',
      trackW: String(N * SP),
      pathD: pathD,
      dash: (1 - (N > 1 ? pos / (N - 1) : 0)).toFixed(4),
      trackStyle: 'position: absolute; left: 50%; top: 0; height: 276px; display: flex; width: ' + (N * SP) + 'px; transform: translateX(' + (-(camX + SP / 2)).toFixed(1) + 'px)',
      markerStyle: 'visibility: ' + (inT && wraw < 0.88 ? 'hidden' : 'visible') + '; position: absolute; left: 50%; margin-left: -22px; top: ' + (markerY - 74 + dropOff).toFixed(1) + 'px; z-index: 2; animation: bob 0.9s ease-in-out infinite; shape-rendering: crispEdges; filter: drop-shadow(0 4px 6px rgba(0,0,0,.6))',
      worldStars: worldStars,
      levelNo: games[active].bonus ? '★' : String(active + 1),
      levelCount: String(games.filter((g) => !g.bonus).length),
      lvl: games[active],
      lvlHref: games[active].bonus ? 'bonus.html' : 'level.html?game=' + (SITE_SLUGS[games[active].title] || ''),
      lvlWatch: games[active].bonus ? 'bonus.html?tab=Animations' : 'level.html?game=' + (SITE_SLUGS[games[active].title] || '') + '#cutscene',
      lvlThumb: 'background: ' + (SITE_COVERS[games[active].title] ? 'url("' + SITE_COVERS[games[active].title] + '") center / cover no-repeat' : '#0D1117') + ';',
      linkedinHref: (window.SITE && window.SITE.linkedin) || 'https://www.linkedin.com/',
      lvlEnter: games[active].bonus ? 'ENTER BONUS STAGE' : 'ENTER LEVEL',
      cardStyle: 'height: 100%; max-width: 1116px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 28px; align-items: center; animation: ' + (active % 2 ? 'pop' : 'popB') + ' .4s ease both',
      flash: 'position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle, rgba(248, 81, 73, 0.55), rgba(248, 81, 73, 0.15) 60%, transparent); opacity: ' + (hit * 0.9).toFixed(3),
      shake: 'transform: translate(' + (Math.sin(boss.fi * 42) * 14 * hit).toFixed(1) + 'px, ' + (Math.cos(boss.fi * 37) * 8 * hit).toFixed(1) + 'px)',
      exp: exp,
      creditsRoll: 'position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; align-items: center; gap: 34px; text-align: center; padding-left: 24px; padding-right: 24px; box-sizing: border-box; transform: translateY(' + (100 - rollT * 200).toFixed(1) + '%); opacity: ' + (1 - contO).toFixed(3) + '; padding-top: 30vh',
      continueStyle: 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 0 24px; opacity: ' + contO.toFixed(3) + '; transform: scale(' + (0.92 + 0.08 * contO).toFixed(3) + '); pointer-events: ' + (contO > 0.6 ? 'auto' : 'none'),
      countdown: String(Math.max(0, 9 - Math.floor(clamp((crLocal - 0.82) / 0.18, 0, 1) * 9))),
      soundOn: this.state.sound,
      soundText: this.state.sound ? 'SOUND ON' : 'SOUND OFF',
      soundLabel: this.state.sound ? 'Turn chiptune sound off' : 'Turn chiptune sound on',
      toggleSound: () => this.setState({ sound: !this.state.sound }),
      jumps: scenes.map((s, i) => ({
        label: s.short,
        go: () => this.jumpTo(i === 0 ? 0 : (s.id === 'boot' ? 0.086 : Math.min(0.999, s.a + s.E + (s.b - s.a) * 0.12))),
        style: 'font-size: 9px; height: 36px; padding: 0 12px; border: 0; cursor: pointer; ' + (i === current ? 'background: #1F6FEB; color: #FFFFFF;' : 'background: transparent; color: #8B949E;')
      }))
    };
  }
}

(function () {
  let lastSound = false;
  window.mountScene(document.getElementById('scene-tpl'), document.getElementById('app'), Component, (st) => {
    if (window.AG && window.AG.Sound && st.sound !== lastSound) { lastSound = st.sound; window.AG.Sound.set(!!st.sound); }
  });
})();
