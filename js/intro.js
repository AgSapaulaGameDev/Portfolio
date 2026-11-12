/* Home page intro: title screen -> cartridge -> console boot -> zoom into the TV, which reveals the hero.
   Driven by the first INTRO_PX pixels of page scroll; everything below the intro is a normal page (js/site.js). */
// the animation plays over the first INTRO_ANIM_PX px; the finished hero then stays pinned for HERO_HOLD_PX more
// so visitors land on it before the page scrolls on (keep .intro's height in css/site.css in sync)
const INTRO_ANIM_PX = 3800;
const HERO_HOLD_PX = 1000;
const INTRO_PX = INTRO_ANIM_PX + HERO_HOLD_PX;
window.INTRO_ANIM_PX = INTRO_ANIM_PX;
// scroll position (px) -> intro progress p. The p timeline is the original game's: title 0-0.1, boot 0.1-0.205, zoom 0.205-0.26
const INTRO_K = [[0, 0], [1500, 0.09], [2600, 0.198], [2900, 0.205], [3300, 0.214], [3800, 0.26]];
const INTRO_END = 0.26;
window.INTRO_PX = INTRO_PX;
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { p: 0, pix: null };
    this.raf = 0;
    this.targetP = 0;
    this.glideRaf = 0;
    this.onScroll = () => {
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => {
        this.raf = 0;
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        let p = INTRO_END;
        for (let k = 1; k < INTRO_K.length; k++) { if (y <= INTRO_K[k][0]) { const a = INTRO_K[k - 1], b = INTRO_K[k]; p = a[1] + (b[1] - a[1]) * (y - a[0]) / (b[0] - a[0]); break; } }
        this.targetP = p;
        this.glide();
      });
    };
    // eases the displayed progress toward the scroll position so wheel steps become one smooth motion
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
    this.onMove = () => {};
    this.art = this.buildArt();
    const pal = ['#8C7CF0', '#CFE3FF', '#79C0FF', '#FF9BCE', '#F2C14E', '#58A6FF', '#FFFFFF', '#5BC8A8', '#A5D6FF', '#C3A6FF'];
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const pw = [];
    for (let i = 0; i < 180; i++) {
      const x = rnd() * 110 - 5, y = rnd() * 110 - 5;
      pw.push({ x: x, y: y, b: rnd() * 0.55, L: 0.3 + rnd() * 0.22, spin: (2.2 + rnd() * 2.4) * (rnd() < 0.85 ? 1 : -1), size: 2 + Math.floor(rnd() * 6), color: pal[Math.floor(rnd() * pal.length)], glow: rnd() < 0.35 });
    }
    this.powderData = pw;
    // genie vortex: bits of the scene that spiral into the cartridge (drawn on one canvas, see drawVortex)
    const vx = [], VN = 1100;
    const band = (y) => y < 0.3 ? ['#20255A', '#2B2B66', '#383070', '#483578', '#CFE3FF', '#F2C14E', '#FF9BCE']
      : y < 0.55 ? ['#34397A', '#2A2E68', '#9CC8FF', '#6C8CF0', '#6E4084', '#5A3A7E']
      : y < 0.75 ? ['#E4E8FF', '#C3C8F0', '#A3AAE0', '#2F3A7A', '#475592', '#8C7CF0']
      : ['#2E9E4F', '#6EE787', '#21733A', '#242C64', '#E4E8FF'];
    for (let i = 0; i < VN; i++) {
      const x = rnd() * 1.1 - 0.05, y = rnd() * 1.1 - 0.05, pal = band(y);
      const dx = x - 0.5, dy = y - 0.48, far = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 0.72);
      vx.push({ x: x, y: y, c: pal[Math.floor(rnd() * pal.length)], s: 3 + Math.floor(rnd() * 4), b: far * 0.42 + rnd() * 0.12, L: 0.38 + rnd() * 0.16, spin: 3.2 + rnd() * 2.6, ph: (i % 2) });
    }
    this.vortexData = vx;
  }
  buildArt() {
    let sd = 4242;
    const rnd = () => { sd = (sd * 16807) % 2147483647; return (sd - 1) / 2147483646; };
    const uri = (svg) => "url('data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg) + "')";
    const n1 = (v) => v.toFixed(1);
    // sky: wavy colour bands
    const bands = ['#02040C', '#050A1C', '#0A112C', '#10183C', '#171F4C', '#20255A', '#2B2B66', '#383070', '#483578', '#5A3A7E', '#6E4084', '#5A3A7E', '#483578', '#383070'];
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
      sky += '<path d="' + d + '" fill="none" stroke="#FF9BCE" stroke-width="' + (3 - k * 0.6) + '" stroke-opacity="0.3" stroke-linecap="round"/>';
    });
    // stars (mostly cool white, a few gold / cyan / pink) and a pixel moon
    const starCols = ['#CFE3FF', '#CFE3FF', '#CFE3FF', '#F2C14E', '#79C0FF', '#FF9BCE'];
    for (let k = 0; k < 150; k++) {
      const x = rnd() * 1440, y = rnd() * 560, big = rnd() < 0.14, c = starCols[Math.floor(rnd() * starCols.length)];
      sky += big ? '<path d="M' + n1(x - 4) + ' ' + n1(y) + 'h12v4h-12zM' + n1(x) + ' ' + n1(y - 4) + 'h4v12h-4z" fill="' + c + '"/>' : '<rect x="' + n1(x) + '" y="' + n1(y) + '" width="4" height="4" fill="' + c + '"/>';
    }
    const MX = 1090, MY = 210;   // moon sits in the open sky right of the title, clear of the big corner cloud
    sky += '<circle cx="' + MX + '" cy="' + MY + '" r="70" fill="#3B3F8C"/><circle cx="' + MX + '" cy="' + MY + '" r="54" fill="#5A5FA8"/>' +
      '<circle cx="' + MX + '" cy="' + MY + '" r="38" fill="#FFF4D6"/>' +
      '<rect x="' + (MX - 20) + '" y="' + (MY - 16) + '" width="12" height="12" fill="#E8D9B0"/><rect x="' + (MX + 6) + '" y="' + (MY + 2) + '" width="14" height="14" fill="#E8D9B0"/><rect x="' + (MX - 8) + '" y="' + (MY + 18) + '" width="7" height="7" fill="#E8D9B0"/><rect x="' + (MX + 14) + '" y="' + (MY - 24) + '" width="7" height="7" fill="#E8D9B0"/>';
    sky += '</svg>';
    // clouds: navy puffs with a cool moonlit rim (night palette, matches the hero in js/hero.js)
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
      return fb + wrapA + '<defs><linearGradient id="' + g + '" gradientUnits="userSpaceOnUse" x1="0" y1="' + n1(y0) + '" x2="0" y2="' + n1(y1) + '"><stop offset="0" stop-color="#34397A"/><stop offset="0.55" stop-color="#2A2E68"/><stop offset="1" stop-color="#212455"/></linearGradient><clipPath id="c' + cid + '">' + body + '</clipPath></defs>' +
        '<g fill="#9CC8FF" opacity="0.45">' + rimO + '</g><g fill="#6C8CF0">' + rimI + '</g>' +
        '<g clip-path="url(#c' + cid + ')"><rect x="' + n1(x0) + '" y="' + n1(y0) + '" width="' + n1(x1 - x0) + '" height="' + n1(y1 - y0) + '" fill="#1A1C45"/><g fill="url(#' + g + ')">' + lift + '</g>' +
        '<g fill="none" stroke="#8C7CF0" stroke-width="4" stroke-linecap="round" opacity="0.7">' + curls + '</g></g>' + '</g>';
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
      const C = far ? { lt: '#3A4385', md: '#2D3470', dk: '#22285A', sn: '#C3C8F0', ss: '#8E94D0', ol: '#151A40' } : { lt: '#2F3A7A', md: '#242C64', dk: '#1A204E', sn: '#E4E8FF', ss: '#A3AAE0', ol: '#0C1030' };
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
  // phones: read the real stage height and where the profile photo sits, since the phone layout comes from CSS
  // phones: read the real stage height (the phone layout comes from CSS)
  measure() {
    const st = document.querySelector('.stage');
    if (st) this.stageH = st.clientHeight;
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.measure();
    this.pixelate();
    this.onResize = () => { this.measure(); this.setState({}); clearTimeout(this.pixTimer); this.pixTimer = setTimeout(() => this.pixelate(), 300); };
    window.addEventListener('resize', this.onResize);
    this.onScroll();
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
    const rock = ['#0C1028', '#151B3E', '#212A58', '#323D74', '#475592'].map(hex);
    const snow = ['#4A5596', '#6470B2', '#8490CC', '#AEB6E6', '#DDE2FF'].map(hex);
    const forest = ['#0A1A1C', '#102A28', '#173D34', '#1F5240', '#2A6A4C'].map(hex);
    const grass = ['#0E2418', '#15381F', '#21733A', '#2E9E4F', '#6EE787'].map(hex);
    const fogC = hex('#3A3478');
    const pal = rock.concat(snow, forest, grass, ['#3A3478', '#4A3F86', '#5A4A92', '#2C2B66', '#6A5AA0', '#232458'].map(hex));
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
    const W = window.innerWidth || 1440;
    const H = W <= 760 ? (this.stageH || Math.max(480, window.innerHeight || 800)) : Math.min(920, Math.max(640, window.innerHeight || 900));
    const PX = W < 700 ? 3 : 4;
    const lw = Math.max(80, Math.round((W * 1.1) / PX)), lh = Math.max(60, Math.round((H * 1.1) / PX));
    const key = lw + 'x' + lh;
    if (this.pixKey === key) return;
    // phones: browser toolbars showing/hiding nudge the height; the stretched art still fits, so skip the expensive repaint
    if (W <= 760 && this.pixW === lw && this.pixH && Math.abs(lh - this.pixH) / this.pixH < 0.2) return;
    this.pixKey = key; this.pixW = lw; this.pixH = lh;
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
    if (this.raf) cancelAnimationFrame(this.raf);
  }
  // Genie-into-the-lamp: scene pixels spiral into the cartridge. One canvas, no per-pixel DOM, so it stays smooth.
  drawVortex(suck) {
    const cv = this.vcv || (this.vcv = document.getElementById('vortexCanvas'));
    if (!cv) return;
    const on = suck > 0.0005 && suck < 0.9995;
    if (!on) { if (this.vOn) { cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); this.vOn = false; } return; }
    this.vOn = true;
    const dpr = Math.min(2, window.devicePixelRatio || 1), w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    const cx = w * 0.5, cy = h * 0.48;
    const d = this.vortexData;
    for (let i = 0; i < d.length; i++) {
      const q = d[i];
      const dx0 = (q.x - 0.5) * w, dy0 = (q.y - 0.48) * h, r0 = Math.sqrt(dx0 * dx0 + dy0 * dy0), a0 = Math.atan2(dy0, dx0);
      // a short trail: the pixel plus two fainter copies a moment behind it
      for (let k = 2; k >= 0; k--) {
        const t = Math.min(1, Math.max(0, (suck - q.b - k * 0.018) / q.L));
        if (t <= 0 || t >= 1) continue;
        const e = t * t * (3 - 2 * t), ti = Math.pow(e, 1.6);
        const r = r0 * (1 - ti), a = a0 + q.spin * ti * (1 + ti);
        const fade = Math.min(1, t * 8) * (1 - Math.max(0, (t - 0.86) / 0.14));
        const sz = Math.max(1, Math.round(q.s * (1 - 0.65 * ti) * (k ? 0.7 : 1)));
        g.globalAlpha = fade * (k === 0 ? 1 : k === 1 ? 0.45 : 0.2);
        g.fillStyle = ti > 0.82 && q.ph ? '#FFF4D6' : q.c;          // pixels flare warm as they reach the cartridge
        g.fillRect(Math.round(cx + Math.cos(a) * r - sz / 2), Math.round(cy + Math.sin(a) * r - sz / 2), sz, sz);
      }
    }
    g.globalAlpha = 1;
  }
  renderVals() {
    const p = this.state.p;
    const mx = 0, my = 0;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const seg = (a, b) => clamp((p - a) / (b - a), 0, 1);
    const px = (v) => v.toFixed(1) + 'px';
    const VW = (typeof window !== 'undefined' && window.innerWidth) || 1440;
    const isM = VW <= 760; // phone layout
    const MH = isM ? (this.stageH || Math.max(480, (typeof window !== 'undefined' && window.innerHeight) || 800)) : 0;
    const sc = {
      title: 'position: absolute; inset: 0; overflow: hidden; z-index: 11; pointer-events: none; visibility: ' + (p < 0.11 ? 'visible' : 'hidden') + ';',
      boot: 'position: absolute; inset: 0; overflow: hidden; z-index: 10; pointer-events: none; visibility: ' + (p < INTRO_END - 0.0001 ? 'visible' : 'hidden') + '; background: radial-gradient(ellipse at 50% 32%, #3A3D42 0%, #26282C 50%, #17181B 100%);'
    };

    // ---- Title parallax ----
    const CLIMB_A = 0.004, CLIMB_B = 0.034, GRAB_B = 0.044, SUCK_A = 0.046, SUCK_B = 0.079, FLY_A = 0.079;
    const climbT = seg(CLIMB_A, CLIMB_B);
    const suckE = ease(seg(SUCK_A, SUCK_B));
    const cam = ease(seg(0, GRAB_B));
    const art = this.art;
    // each layer twists and shrinks into the cartridge; nearer layers go first and faster (depth parallax)
    const pull = (depth, mDepth, scale, pf, rot) => {
      const lag = 0.18 * (1 - pf);
      const s = ease(clamp((suckE - lag) / (1 - lag), 0, 1));
      const pe = 0.55 + 0.45 * pf;
      const shrink = 1 - Math.min(0.97, pe * Math.pow(s, 1.1));
      const R = (150 - 100 * Math.min(1, s * 4)).toFixed(1);
      const soft = s > 0.001 ? ' -webkit-mask-image: radial-gradient(' + R + '% ' + R + '% at 50% 48%, #000 45%, transparent 100%); mask-image: radial-gradient(' + R + '% ' + R + '% at 50% 48%, #000 45%, transparent 100%);' : '';
      return soft + ' will-change: transform, opacity; transform-origin: 50% 48%; transform: translate3d(0, ' + px(cam * depth * (1 - s)) + ', 0) rotate(' + (rot * 0.7 * s * s).toFixed(2) + 'deg) scale(' + ((scale + cam * 0.04) * shrink).toFixed(4) + '); opacity: ' + (1 - clamp((s - 0.78) / 0.2, 0, 1)).toFixed(3) + ';';
    };
    const pix = this.state.pix;
    const lay = (k) => 'position: absolute; inset: -5%; background-image: ' + (pix ? pix[k] : (k === 'mtn' || k === 'peak' || k === 'land' || k === 'mid' ? 'none' : art[k])) + '; background-size: 100% 100%; background-repeat: no-repeat; image-rendering: pixelated; image-rendering: crisp-edges;';
    const grainSvg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 2.2 -1.1"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>');

    // ---- Console boot sequence ----
    const INS_A = 0.09, INS_B = 0.13, CAB_A = 0.13, CAB_B = 0.16, CRT_A = 0.16, CRT_B = 0.185, LOAD_B = 0.205, FADE_B = 0.209, SW_A = 0.214, SW_B = 0.222, ZOOM_A = 0.222, ZOOM_B = 0.26; // LOAD_B-FADE_B: boot text fades out; FADE_B-SW_A: black screen hold
    const zoomT = ease(seg(ZOOM_A, ZOOM_B));
    // phones: the console is sized to the screen width (desktop sizes it by height) and zooms until the TV screen fills the width
    const bigRigW = 0.72 * MH * 760 / 600;
    const rigW = isM ? Math.min(bigRigW, VW * 1.08) : 0, rigH = rigW * 600 / 760;
    const zoom = isM ? 1 + zoomT * (VW / (0.614 * rigW) - 1) : 1 + zoomT * 1.974;
    const rigBase = isM
      ? 'position: absolute; left: 50%; top: 50%; width: ' + px(rigW) + '; height: ' + px(rigH) + '; transform-origin: 50% 33%; transform: translate(-50%, -50%) translate(0, ' + (16.95 * zoomT).toFixed(3) + '%) scale(' + zoom.toFixed(4) + ');'
      : 'position: absolute; left: 50%; top: 50%; height: 72%; aspect-ratio: 760 / 600; transform-origin: 50% 33%; transform: translate(-50%, -50%) translate(0, ' + (16.95 * zoomT).toFixed(3) + '%) scale(' + zoom.toFixed(4) + ');';
    const cartVisible = p < ZOOM_A + (ZOOM_B - ZOOM_A) * 0.7;
    const cartRig = rigBase + ' z-index: 30; pointer-events: none; visibility: ' + (cartVisible ? 'visible' : 'hidden') + ';';

    const CW = 15.8, CH = 22.5, SLOT = 72.9;
    const fly = ease(seg(FLY_A, INS_A));
    const ins = ease(seg(INS_A, INS_B));
    const idleTop = 34.5, holdTop = 36, hoverTop = 32, insertedTop = SLOT - CH * 0.31;
    const recede = ease(seg(CLIMB_A, GRAB_B));
    const reveal = clamp((suckE - 0.15) / 0.75, 0, 1);
    const labelArt = 'position: absolute; inset: 3px; overflow: hidden; border-radius: 2px; background: linear-gradient(#050A1C 0%, #171F4C 22%, #2B2B66 40%, #483578 52%, #6E4084 62%, #383070 72%); clip-path: circle(' + (reveal * 75).toFixed(1) + '% at 50% 55%);' + (reveal > 0 && reveal < 1 ? ' filter: brightness(' + (1 + (1 - reveal) * 0.6).toFixed(2) + ');' : '');
    let cTop = idleTop + (holdTop - idleTop) * recede;
    cTop = cTop + (hoverTop - cTop) * fly;
    cTop = cTop + (insertedTop - cTop) * ins;
    let cScale = 1.45 - 0.62 * recede + 0.2 * Math.sin(suckE * Math.PI * 0.5);
    cScale = cScale + (1 - cScale) * fly;
    // phones: the console is smaller, so the floating cartridge is enlarged on the title screen and shrinks to slot size as it flies in
    if (isM) cScale *= 1 + (Math.max(1, bigRigW / rigW) - 1) * (1 - fly);
    const below = Math.max(0, (cTop + CH) - SLOT) / CH * 100;
    const wob = Math.sin(ins * Math.PI) * 4;
    // positioned once at idleTop and moved with translate3d (a % of its own height), so scrolling never triggers layout
    const cart = 'position: absolute; left: ' + (50 - CW / 2).toFixed(2) + '%; top: ' + idleTop + '%; width: ' + CW + '%; height: ' + CH + '%; will-change: transform; transform: translate3d(0, ' + ((cTop - idleTop) / CH * 100).toFixed(3) + '%, 0) scale(' + cScale.toFixed(4) + ') rotate(' + wob.toFixed(2) + 'deg); ' + (below > 0 ? 'clip-path: inset(0 0 ' + below.toFixed(2) + '% 0);' : '');
    const spinning = p < 0.016;
    const suck = suckE;
    const swirl = Math.sin(suck * Math.PI);
    const cartBob = 'position: relative; width: 100%; height: 100%; will-change: transform; ' + (p < CLIMB_B ? 'animation: hover3d 4s ease-in-out infinite;' : '');
    const cartGlow = 'position: absolute; left: -35%; right: -35%; top: -22%; bottom: -22%; border-radius: 50%; pointer-events: none; background: radial-gradient(closest-side, rgba(255, 214, 170, 0.8), rgba(255, 214, 170, 0.32) 50%, rgba(255, 214, 170, 0) 100%); will-change: transform, opacity; opacity: ' + (0.7 + swirl * 0.3).toFixed(3) + '; transform: scale(' + (0.8 + swirl * 0.55).toFixed(4) + ');';
    const PW = VW;
    const PH = isM ? MH : Math.min(920, Math.max(640, (typeof window !== 'undefined' && window.innerHeight) || 900));
    this.drawVortex(suck);
    const tilt = 1 - ins;
    let cartSpin;
    if (spinning) {
      if (this.spinA0 != null) { this.spinDelay = (((this.spinA0 % 360) + 360) % 360) / 360 * 9; this.spinA0 = null; }
      cartSpin = 'position: relative; width: 100%; height: 100%; transform-style: preserve-3d; will-change: transform; animation: spinY 9s linear infinite; animation-delay: -' + (this.spinDelay || 0).toFixed(3) + 's;';
    } else {
      if (this.spinA0 == null) {
        // read where the idle spin currently is, so the scroll pose continues from that angle (no snap)
        let a = -28;
        try { const an = (document.getAnimations ? document.getAnimations() : []).find((x) => x.animationName === 'spinY'); if (an) { const pr = an.effect.getComputedTiming().progress; if (pr != null) a = pr * 360; } } catch (e) {}
        this.spinA0 = a - 360 * Math.round((a + 28) / 360);
      }
      const k = ease(seg(0.016, CLIMB_B));
      const ry = this.spinA0 + (-28 - this.spinA0) * k;
      const rot = ry + 360 * suck;
      cartSpin = 'position: relative; width: 100%; height: 100%; transform-style: preserve-3d; will-change: transform; transform: rotateX(' + (14 * tilt + swirl * 6).toFixed(2) + 'deg) rotateY(' + (suck >= 1 ? (360 - 28 * tilt) : rot).toFixed(2) + 'deg);';
    }

    const insFlash = Math.max(0, 1 - Math.abs(p - INS_B) / 0.012);
    const cab = ease(seg(CAB_A, CAB_B));
    const sparkT = Math.max(0, 1 - Math.abs(p - CAB_B) / 0.01);
    const powered = p >= CRT_A;
    const crtT = seg(CRT_A, CRT_B);
    const loadT = seg(CRT_B, LOAD_B);
    // once the AG logo has finished booting it "leaves" the screen for the nav dock (js/site.js: logo hand-off)
    const logoFlown = loadT >= 0.8;
    if (logoFlown !== window.__agLogoFlown) { window.__agLogoFlown = logoFlown; window.dispatchEvent(new CustomEvent('ag:logo', { detail: logoFlown })); }
    const lineScale = powered ? 0.012 + 0.988 * ease(clamp((crtT - 0.3) / 0.6, 0, 1)) : 0;
    const lgOn = (t0) => { const t = clamp((loadT - t0) / 0.14, 0, 1); return 'transition: none; opacity: ' + (0.08 + 0.92 * t).toFixed(3) + '; filter: brightness(' + (0.4 + 0.6 * t + Math.sin(t * Math.PI) * 0.8).toFixed(2) + ') drop-shadow(0 0 ' + (2 + Math.sin(t * Math.PI) * 14 + t * 4).toFixed(1) + 'px rgba(255, 255, 255, ' + (0.15 + Math.sin(t * Math.PI) * 0.6).toFixed(2) + '));'; };
    const wordT = clamp((loadT - 0.45) / 0.15, 0, 1), sweepT = clamp((loadT - 0.6) / 0.2, 0, 1);
    const swT = seg(SW_A, SW_B);
    const sideOpen = clamp((zoomT - 0.85) / 0.15, 0, 1);
    const vh = isM ? MH : Math.min(920, Math.max(640, (typeof window !== 'undefined' && window.innerHeight) || 900));
    const side = Math.max(0, (VW - vh * 1.6656) / 2) * (1 - sideOpen);
    const flashIn = p < SW_A ? 0 : Math.max(0, 1 - (p - SW_A) / 0.006);

    // ---- Hero: shown inside the TV screen during the zoom, full screen once it lands ----
    let heroExtra = '';
    if (p < ZOOM_B && isM) {
      // phones: the hero is scaled to the TV screen's width and clipped to its height; the clip opens once the zoom lands
      const sw = 0.614 * rigW * zoom, sh = 0.467 * rigH * zoom, km = sw / VW;
      const insetV = Math.max(0, (MH - sh / km) / 2) * (1 - sideOpen);
      heroExtra = 'opacity: ' + swT.toFixed(3) + '; transform-origin: 50% 50%; transform: translate(0, ' + px(-0.1695 * rigH * (1 - zoomT)) + ') scale(' + km.toFixed(4) + '); clip-path: inset(' + px(insetV) + ' 0 round ' + px((20 * zoom / km) * (1 - sideOpen)) + ');';
    } else if (p < ZOOM_B) {
      const k = 0.3362 * zoom;
      heroExtra = 'opacity: ' + swT.toFixed(3) + '; transform-origin: 50% 50%; transform: translate(0, ' + (-12.2 * (1 - zoomT)).toFixed(3) + '%) scale(' + k.toFixed(4) + '); clip-path: inset(0 ' + px(side) + ' round ' + px((20 / k) * (1 - zoomT)) + ');';
    }
    const heroStyle = 'z-index: 12; visibility: ' + (p >= SW_A ? 'visible' : 'hidden') + '; pointer-events: ' + (p >= ZOOM_B - 0.0005 ? 'auto' : 'none') + '; ' + heroExtra;

    let bootCaption = 'SCROLL ▼ TO INSERT CARTRIDGE';
    if (p >= INS_A && p < INS_B) bootCaption = 'INSERTING CARTRIDGE...';
    else if (p >= CAB_A && p < CAB_B) bootCaption = 'CONNECTING CONTROLLER...';
    else if (p >= CRT_A && p < CRT_B) bootCaption = 'POWER ON';
    else if (p >= CRT_B && p < LOAD_B) bootCaption = 'LOADING ' + Math.round(loadT * 100) + '%';
    else if (p >= LOAD_B) bootCaption = 'PRESS START ▼';

    return {
      sc: sc,
      onMove: this.onMove,
      starStyle: 'position: absolute; inset: -10%; background-image: radial-gradient(#58A6FF 1px, transparent 1.5px), radial-gradient(#E6EDF3 1px, transparent 1.5px); background-size: 140px 140px, 90px 90px; background-position: 0 0, 40px 60px; opacity: 0.35; transform: translate(0, ' + px(-p * 300) + ');',
      skyStyle: lay('sky') + pull(14, 4, 1.02, 0.12, 0),
      cloudsBackWrap: 'position: absolute; inset: 0; ' + pull(26, 12, 1, 0.85, 75),
      cloudsBackImg: lay('back') + ' animation: driftA 18s steps(9) infinite;',
      mtnStyle: lay('mtn') + pull(0, 10, 1, 0.62, -40),
      midWrap: 'position: absolute; inset: 0; ' + pull(20, 18, 1, 0.8, 60),
      midImg: lay('mid') + ' animation: driftA 22s steps(11) infinite;',
      peakWrap: lay('peak') + pull(0, 10, 1, 0.62, -40),
      landWrap: 'display: none;',
      cloudsFrontWrap: 'position: absolute; inset: 0; ' + pull(-10, 40, 1.03, 0.95, 110),
      cloudsFrontImg: lay('front') + ' animation: driftB 14s steps(7) infinite;',
      grainStyle: 'position: absolute; inset: -40px; pointer-events: none; z-index: 2; background-image: url(\'data:image/svg+xml;charset=utf-8,' + grainSvg + '\'); background-size: 240px 240px; opacity: 0.4; mix-blend-mode: soft-light; animation: noiseShift 0.5s steps(4) infinite;',
      titleText: 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 14vh 24px 0; gap: 18px; text-align: center; opacity: ' + (1 - clamp(climbT / 0.35, 0, 1)).toFixed(3) + '; transform: translateY(' + px(-cam * 120) + ');',
      scrollCue: 'position: absolute; left: 50%; bottom: 72px; transform: translateX(-50%); z-index: 5; display: flex; flex-direction: row; align-items: center; gap: 14px; padding: 12px 22px; background: rgba(13, 17, 23, 0.78); border: 2px solid #FFFFFF; border-radius: 999px; box-shadow: 4px 4px 0 #26317E, 0 0 24px rgba(255, 255, 255, 0.25); pointer-events: none; opacity: ' + (1 - clamp(climbT / 0.15, 0, 1)).toFixed(3) + ';',
      worldStyle: 'position: absolute; inset: 0; overflow: hidden; transform-origin: 50% 48%; opacity: ' + (1 - clamp((suck - 0.86) / 0.12, 0, 1)).toFixed(3) + ';',
      coreStyle: 'position: absolute; left: 50%; top: 48%; width: 640px; height: 640px; margin: -320px 0 0 -320px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(255, 244, 214, 0.9), rgba(140, 124, 240, 0.35) 22%, transparent 55%); transform: scale(' + (0.15 + swirl * 1.05).toFixed(3) + ') rotate(' + (suck * -300).toFixed(1) + 'deg); opacity: ' + (swirl * 0.75).toFixed(3) + ';',
      rig: rigBase, cartRig: cartRig, cart: cart, cartBob: cartBob, cartGlow: cartGlow, cartSpin: cartSpin, labelArt: labelArt,
      slot: 'position: absolute; left: 40.6%; top: 72.2%; width: 18.8%; height: 1.4%; background: #050506; border-radius: 2px; box-shadow: inset 0 2px 3px #000, 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 ' + (6 + insFlash * 30).toFixed(0) + 'px rgba(88, 166, 255, ' + (insFlash * 0.9).toFixed(2) + ');',
      led: 'position: absolute; left: 27.4%; top: 85.4%; width: 1.7%; aspect-ratio: 1; border-radius: 50%; ' + (powered ? 'background: radial-gradient(circle at 40% 35%, #8BF59A, #3FB950 60%); box-shadow: 0 0 10px #3FB950, 0 0 22px rgba(63, 185, 80, 0.6);' : (p >= INS_B ? 'background: #8E1519; box-shadow: 0 0 6px rgba(248, 81, 73, 0.5);' : 'background: #2A2C30; box-shadow: inset 0 1px 2px #000;')),
      screen: 'position: absolute; left: 19.2%; top: 9.7%; width: 61.4%; height: 46.7%; border-radius: 20px; overflow: hidden; background: #050608; ' + (powered ? 'box-shadow: 0 0 50px rgba(120, 170, 255, ' + (0.08 + 0.18 * crtT).toFixed(2) + ');' : ''),
      crtLine: 'position: absolute; left: 0; right: 0; top: 50%; height: 100%; background: #DDEBFF; transform: translateY(-50%) scaleY(' + lineScale.toFixed(4) + ') scaleX(' + (powered ? Math.min(1, 0.05 + crtT * 4).toFixed(3) : 0) + '); opacity: ' + (powered ? (1 - clamp((crtT - 0.8) / 0.2, 0, 1)).toFixed(3) : 0) + ';',
      bootContent: 'position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; background: radial-gradient(ellipse at 50% 45%, #10141C 0%, #06080C 60%, #020304 100%); opacity: ' + (clamp((crtT - 0.75) / 0.25, 0, 1) * (1 - seg(LOAD_B, FADE_B))).toFixed(3) + ';',
      lg: { a: lgOn(0.0), b: lgOn(0.12), c: lgOn(0.24), d: lgOn(0.36), word: 'opacity: ' + wordT.toFixed(3) + '; transform: translateY(' + ((1 - wordT) * 6).toFixed(1) + 'px);', sweep: 'position: absolute; top: 0; bottom: 0; width: 40%; left: ' + (-50 + sweepT * 160).toFixed(1) + '%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent); mix-blend-mode: overlay; opacity: ' + (sweepT > 0 && sweepT < 1 ? 1 : 0) + ';' },
      pressStart: 'font-size: 9px; color: #FFFFFF; opacity: ' + (loadT >= 1 ? 1 : 0) + '; ' + (loadT >= 1 ? 'animation: blink 0.9s steps(1) infinite;' : ''),
      zoomFade: 'display: none;',
      screenFlash: 'position: absolute; inset: 0; pointer-events: none; background: #DDEBFF; opacity: ' + (flashIn * 0.85).toFixed(3) + ';',
      bootCaption: bootCaption,
      cableDash: (1 - cab).toFixed(4),
      plugO: (cab >= 0.98 ? 1 : 0).toFixed(0),
      sparkR: (6 + (1 - sparkT) * 18).toFixed(1),
      sparkO: sparkT.toFixed(3),
      heroStyle: heroStyle
    };
  }
}

window.mountScene(document.getElementById('scene-tpl'), document.getElementById('app'), Component);
