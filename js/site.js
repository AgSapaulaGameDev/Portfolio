/* ===== Home page: navigation, project + art grids from data.js, section fade-ins ===== */
(function () {
  const { $, esc } = window.AG;
  const S = window.SITE || {}, GAMES = window.GAMES || [], ART = window.ART || [];
  // the hero is fully revealed at INTRO_ANIM_PX and stays pinned until INTRO_PX
  const introPx = () => window.INTRO_ANIM_PX || 3500;

  /* Projects (one card per game in data.js) */
  $('#projectGrid').innerHTML = GAMES.map((g, i) => {
    const page = 'level.html?game=' + encodeURIComponent(g.slug);
    const feat = !!g.featured;
    return '<article class="card project reveal' + (feat ? ' featured' : '') + '" id="project-' + esc(g.slug) + '">' +
      '<a class="thumb" href="' + page + '" style="background-image:url(&quot;' + esc(g.cover) + '&quot;)" aria-label="' + esc(g.title) + ' case study"><span class="num px">' + String(i + 1).padStart(2, '0') + '</span>' +
      (feat ? '<span class="best px">★ BEST PROJECT</span>' : '') + '</a>' +
      '<div class="body"><span class="kind">' + esc(g.kind) + '</span><h3><a href="' + page + '">' + esc(g.title) + '</a></h3><p>' + esc(g.blurb) + '</p>' +
      (feat && g.built && g.built.length ? '<ul class="built">' + g.built.map((b) => '<li>' + esc(b) + '</li>').join('') + '</ul>' : '') +
      '<span class="role">' + esc(g.role) + '</span>' +
      '<div class="actions"><a class="btn btn-primary btn-sm" href="' + page + '">View project</a>' +
      (g.video ? '<a class="btn btn-ghost btn-sm" href="' + page + '#cutscene">▶ Watch</a>' : '') + '</div></div></article>';
  }).join('');

  /* 3D art + animations (each opens on the bonus page) */
  $('#artGrid').innerHTML = ART.map((a) => {
    const href = 'bonus.html?tab=' + encodeURIComponent(a.category) + '&item=' + encodeURIComponent(a.slug);
    return '<a class="card art-card reveal" href="' + href + '"><div class="thumb" style="background-image:url(&quot;' + esc(a.cover) + '&quot;)">' +
      (a.video ? '<span class="play">▶ Animation</span>' : '') + '</div><div class="body"><b>' + esc(a.title) + '</b><span>' + esc(a.category) + '</span></div></a>';
  }).join('');

  /* Contact links (LinkedIn only shows once it's filled in data.js) */
  const li = $('#linkedinLink');
  if (li) { if (S.linkedin) li.href = S.linkedin; else li.remove(); }

  /* Navigation: solid bar after the intro, current-section highlight, phone menu */
  const nav = $('#nav'), skip = $('#skipIntro'), links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const wideDock = window.matchMedia('(min-width: 1300px)'); // keep in sync with the dock media query in css/site.css
  const phone = window.matchMedia('(max-width: 760px)');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const past = y >= introPx() - 4;
    // 0 -> 1 across the pinned-hero stretch; moves the floating consoles and fills the scroll cue (css/site.css)
    const hold = Math.min(1, Math.max(0, (y - introPx()) / ((window.INTRO_PX || introPx()) - introPx() || 1)));
    document.documentElement.style.setProperty('--hold', hold.toFixed(4));
    nav.classList.toggle('solid', past);
    // phones: the floating pill slides away while scrolling down and comes back on any scroll up
    if (phone.matches && nav.classList.contains('docked') && !nav.classList.contains('open')) {
      const dy = y - lastY;
      if (dy > 6 && y > (window.INTRO_PX || introPx()) + 80) nav.classList.add('tucked');
      else if (dy < -6) nav.classList.remove('tucked');
    } else nav.classList.remove('tucked');
    lastY = y;
    // landing below the intro (reload, back from a project): show the dock at once instead of waiting for the intro to catch up
    if (past && wideDock.matches && !flight && nav.classList.contains('dock-hidden')) {
      nav.classList.remove('dock-hidden');
      const svg = document.getElementById('bootLogo'); if (svg) svg.style.opacity = '0';
    }
    // wide screens: always the left dock (no top bar). Narrow screens: top bar over the intro/hero, which
    // morphs into a floating pill once the hero scrolls away (css/site.css "Nav morph")
    const docked = wideDock.matches || y >= (window.INTRO_PX || introPx()) - 2;
    if (docked !== nav.classList.contains('docked')) {
      nav.classList.toggle('docked', docked);
      nav.classList.remove('open', 'bar-in');
      if (!docked) { void nav.offsetWidth; nav.classList.add('bar-in'); clearTimeout(nav._barT); nav._barT = setTimeout(() => nav.classList.remove('bar-in'), 500); }
    }
    skip.classList.toggle('gone', past);
    let cur = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) cur = s; });
    links.forEach((a) => a.classList.toggle('on', !!cur && a.getAttribute('href') === '#' + cur.id));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  /* Logo hand-off (wide screens): the dock stays hidden while the TV boots; when the AG logo on the screen has
     finished lighting up (js/intro.js fires 'ag:logo'), it flies out of the screen into the dock, which then unrolls.
     Scrolling back up before that point hides the dock and puts the logo back on the screen. */
  const brandMark = nav.querySelector('.brand-mark');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let flight = null, flyer = null, unrollT = 0;
  const stopFlight = () => { if (flight) flight.cancel(); if (flyer) flyer.remove(); flight = flyer = null; };
  const logoHandoff = (flown) => {
    const svg = document.getElementById('bootLogo');
    stopFlight();
    if (!wideDock.matches) { nav.classList.remove('dock-hidden'); if (svg) svg.style.opacity = ''; return; }
    if (!flown) { nav.classList.add('dock-hidden'); nav.classList.remove('dock-unroll'); if (svg) svg.style.opacity = ''; return; }
    const r = svg && svg.getBoundingClientRect();
    const cs = svg && getComputedStyle(svg);
    const visible = r && r.width > 0 && r.bottom > 0 && r.top < window.innerHeight && cs.visibility === 'visible' && !document.documentElement.classList.contains('jumping') && !reduceMotion.matches;
    if (svg) svg.style.opacity = '0';
    if (!visible) { nav.classList.remove('dock-hidden'); return; }
    // the logo artwork sits at x24 y14 w178 h108 inside the screen svg's 220x130 box (same crop as logo.svg)
    const sx = r.width / 220, sy = r.height / 130;
    const from = { left: r.left + 24 * sx, top: r.top + 14 * sy, width: 178 * sx, height: 108 * sy };
    const to = brandMark.getBoundingClientRect();
    flyer = new Image();
    flyer.src = 'logo.svg'; flyer.alt = ''; flyer.className = 'logo-flyer';
    Object.assign(flyer.style, { left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px' });
    document.body.appendChild(flyer);
    const dx = to.left - from.left, dy = to.top - from.top, s = to.width / from.width;
    flight = flyer.animate([
      { transform: 'translate(0, 0) scale(1)', filter: 'drop-shadow(0 0 0 rgba(88, 166, 255, 0))' },
      { transform: 'translate(' + (dx * 0.4) + 'px, ' + (dy * 0.4 - 50) + 'px) scale(' + ((1 + s) / 2) + ')', filter: 'drop-shadow(0 0 18px rgba(88, 166, 255, .75))', offset: 0.45 },
      { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')', filter: 'drop-shadow(0 0 6px rgba(88, 166, 255, .5))' }
    ], { duration: 950, easing: 'cubic-bezier(.55, 0, .25, 1)', fill: 'forwards' });
    flight.onfinish = () => {
      stopFlight();
      nav.classList.remove('dock-hidden');
      nav.classList.add('dock-unroll');
      clearTimeout(unrollT); unrollT = setTimeout(() => nav.classList.remove('dock-unroll'), 900);
    };
  };
  window.addEventListener('ag:logo', (e) => logoHandoff(e.detail));
  const syncDock = () => {
    stopFlight();
    const svg = document.getElementById('bootLogo'), wide = wideDock.matches, flown = window.__agLogoFlown === true;
    nav.classList.toggle('dock-hidden', wide && !flown);
    if (svg) svg.style.opacity = wide && flown ? '0' : '';
  };
  syncDock();

  if (wideDock.addEventListener) wideDock.addEventListener('change', () => { syncDock(); onScroll(); }); else wideDock.addListener(() => { syncDock(); onScroll(); });
  onScroll();

  // the hero sits at the end of the intro, so "Home" and "Skip intro" scroll there rather than to the top
  const toHero = (e) => { if (e) e.preventDefault(); nav.classList.remove('open'); window.scrollTo({ top: introPx(), behavior: 'smooth' }); };
  skip.addEventListener('click', toHero);
  document.querySelectorAll('[data-to-hero]').forEach((a) => a.addEventListener('click', toHero));

  const menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  links.forEach((a) => a.addEventListener('click', () => { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));

  window.AG.bindSound($('#soundBtn'));

  /* Gentle fade-in as cards and sections enter the screen */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add('in'));

  /* Coming back from a project page skips the intro and lands where the visitor should be:
     - index.html?level=N (the ◀ ALL PROJECTS button) -> that project's card
     - the browser's own Back button -> the exact spot they left (saved below on pagehide)
     The page stays hidden (html.jumping, set in index.html's <head>) and the scroll is re-pinned every frame
     until fonts and images have loaded, so the intro/hero never flashes while the layout settles. */
  const root = document.documentElement;
  try { window.addEventListener('pagehide', () => sessionStorage.setItem('ag-home-y', String(Math.round(window.scrollY)))); } catch (e) { /* storage blocked */ }
  const lv = parseInt(new URLSearchParams(location.search).get('level'), 10);
  const navType = ((performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {}).type;
  let savedY = null;
  try { savedY = sessionStorage.getItem('ag-home-y'); } catch (e) { /* storage blocked */ }
  const target = lv > 0 ? (GAMES[lv - 1] ? document.getElementById('project-' + GAMES[lv - 1].slug) : $('#art')) : (location.hash && document.querySelector(location.hash));
  const restoreY = !(lv > 0) && navType === 'back_forward' && savedY !== null ? +savedY : null;
  if (target || restoreY !== null) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    // 'instant' because the page's CSS smooth scrolling would otherwise animate through the whole intro
    const pin = () => {
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: restoreY, behavior: 'instant' });
    };
    if (target) target.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    if (target && target.classList.contains('reveal')) target.classList.add('in');
    // show the page as soon as it is scrolled into place (2 frames), then keep it pinned there
    // while images/fonts finish loading so nothing shifts under the visitor
    let done = false, raf = 0;
    const loop = () => { pin(); if (!done) raf = requestAnimationFrame(loop); };
    loop();
    requestAnimationFrame(() => requestAnimationFrame(() => { pin(); root.classList.remove('jumping'); }));
    const finish = () => { if (done) return; done = true; cancelAnimationFrame(raf); root.classList.remove('jumping'); };
    const loaded = new Promise((res) => (document.readyState === 'complete' ? res() : window.addEventListener('load', res, { once: true })));
    Promise.all([loaded, document.fonts ? document.fonts.ready : null]).then(() => { pin(); finish(); });
    setTimeout(finish, 3000);
    // a user scroll/tap takes over immediately
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((ev) => window.addEventListener(ev, finish, { once: true, passive: true }));
  }
})();
