/* ===== Level page: one template for every game in data.js ===== */
(function () {
  const { $, esc, Sound } = window.AG;
  const S = window.SITE, GAMES = window.GAMES;
  const N = GAMES.length;

  const q = new URLSearchParams(location.search);
  let i = GAMES.findIndex((g) => g.slug === q.get('game'));
  if (i < 0) i = 0;
  const g = GAMES[i];
  const url = (k) => 'level.html?game=' + encodeURIComponent(GAMES[(k + N) % N].slug);
  const mapUrl = 'index.html?level=' + (i + 1);

  document.title = g.title + ' — Level ' + (i + 1) + ' · AGSAPAULA';
  window.AG.bindSound($('#soundBtn'));

  /* Top bar + nav */
  $('#tbLevel').textContent = 'LEVEL ' + (i + 1);
  $('#tbTitle').textContent = g.title.toUpperCase();
  $('#backMap').href = mapUrl; $('#cMap').href = mapUrl;
  $('#tbPrev').href = $('#cPrev').href = url(i - 1);
  $('#tbNext').href = $('#cNext').href = url(i + 1);
  $('#cPrevT').textContent = GAMES[(i - 1 + N) % N].title;
  $('#cNextT').textContent = GAMES[(i + 1) % N].title;

  /* Hero */
  $('#hWorld').textContent = 'WORLD 1 · LEVEL ' + (i + 1) + ' · ' + g.kind;
  $('#hTitle').textContent = g.title.toUpperCase();
  $('#hLead').textContent = g.blurb;
  const engine = g.kind.split(' · ').slice(1).join(' · ') || g.tags[0];
  const facts = [['ROLE', g.role], ['GENRE', g.kind.split(' · ')[0]], ['BUILT WITH', engine], ['SCREENSHOTS', String(g.images.length)]];
  $('#hFacts').innerHTML = facts.map((f) => '<div><span>' + esc(f[0]) + '</span><b>' + esc(f[1]) + '</b></div>').join('');
  const cover = $('#hCover');
  cover.style.backgroundImage = 'url("' + g.cover + '")';
  cover.setAttribute('aria-label', g.title + ' cover art');
  /* Same sky + pixel island as this game's stop on the world map */
  const SKY = window.ISLAND_SKY || [], ART = window.ISLAND_ART || [];
  const sk = SKY[i % (SKY.length || 1)];
  const hero = document.querySelector('.lv-hero');
  if (sk && hero) {
    hero.classList.add('sky-hero');
    hero.style.setProperty('--sky', 'linear-gradient(' + [0, 22, 44, 62, 80, 100].map((pc, k) => sk[k] + ' ' + pc + '%').join(', ') + ')');
    hero.style.setProperty('--stars', String(sk[6]));
  }
  if (ART.length) cover.insertAdjacentHTML('afterend', '<div class="hero-island" aria-hidden="true"><div class="hero-island-glow"></div>' + ART[i % ART.length] + '</div>');
  if (g.playUrl) { const pl = $('#hPlay'); pl.href = g.playUrl; pl.hidden = false; }
  if (!g.code.length) $('#hCode').hidden = true;

  /* Video: poster first, real Drive player loads on click (keeps the page fast) */
  const vb = $('#videoBox');
  if (g.video) {
    vb.innerHTML = '<button type="button" class="video-poster" style="background-image:url(&quot;' + esc(g.cover) + '&quot;)" aria-label="Play ' + esc(g.title) + ' gameplay video"><svg width="72" height="72" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#1F6FEB" stroke="#fff" stroke-width="1.2"/><polygon points="10,8 16,12 10,16" fill="#fff"/></svg><span class="px" style="font-size:10px">PLAY CUTSCENE</span></button>';
    vb.querySelector('button').addEventListener('click', () => {
      Sound.blip('coin');
      vb.innerHTML = '<iframe src="' + window.AG.driveEmbed(g.video) + '" title="' + esc(g.title) + ' gameplay video" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    });
  } else {
    vb.innerHTML = '<div class="video-poster" style="cursor:default;background-image:url(&quot;' + esc(g.cover) + '&quot;)"><span class="px" style="font-size:10px">VIDEO COMING SOON</span></div>';
  }

  /* Quest log */
  $('#qDesc').textContent = g.description;
  if (g.contribution) $('#qContrib').textContent = g.contribution; else $('#qContribWrap').hidden = true;
  $('#qTags').innerHTML = g.tags.map((t) => '<span class="chip">' + esc(t) + '</span>').join('');

  /* Abilities = features, each paired with a screenshot */
  const rar = [['COMMON', '#8B949E'], ['RARE', '#58A6FF'], ['EPIC', '#A371F7'], ['LEGEND', '#E3C27A']];
  $('#abilities').innerHTML = g.features.map((f, k) => {
    const r = rar[Math.min(rar.length - 1, Math.floor(k / 2))];
    const img = g.images[(k + 1) % g.images.length];
    return '<div class="ability panel"><div class="row"><span class="n">SKILL ' + (k + 1) + '</span><span class="rarity" style="color:' + r[1] + '">' + r[0] + '</span></div>' +
      '<div class="thumb" style="background-image:url(&quot;' + esc(img) + '&quot;)"></div><strong>' + esc(f) + '</strong></div>';
  }).join('');

  /* Optional: stats + hardest problem (fill in data.js to show) */
  if (g.stats && g.stats.length) {
    $('#statsSec').hidden = false;
    $('#stats').innerHTML = g.stats.map((s) => '<div class="stat"><span class="v">' + esc(s.value) + '</span><span class="k">' + esc(String(s.label).toUpperCase()) + '</span></div>').join('');
  }
  if (g.challenge && g.challenge.problem) {
    $('#bossSec').hidden = false;
    $('#bProblem').textContent = g.challenge.problem;
    $('#bStrategy').textContent = g.challenge.strategy || '';
    $('#bLesson').textContent = g.challenge.lesson || '';
  }

  /* Loot gallery + lightbox */
  let sel = 0;
  $('#lootCount').textContent = g.images.length + ' items · click to inspect';
  const grid = $('#lootGrid');
  grid.innerHTML = g.images.map((src, k) => '<button type="button" class="loot-slot" data-k="' + k + '" style="background-image:url(&quot;' + esc(src) + '&quot;)" aria-label="Screenshot ' + (k + 1) + '"></button>').join('');
  const slots = grid.querySelectorAll('.loot-slot');
  const pick = (k) => {
    sel = (k + g.images.length) % g.images.length;
    $('#lootMain').style.backgroundImage = 'url("' + g.images[sel] + '")';
    slots.forEach((s, j) => s.classList.toggle('on', j === sel));
  };
  grid.addEventListener('click', (e) => { const b = e.target.closest('.loot-slot'); if (b) { pick(+b.dataset.k); Sound.blip(); } });
  pick(0);
  const lb = $('#lightbox');
  const lbShow = () => { $('#lbImg').src = g.images[sel]; $('#lbImg').alt = g.title + ' screenshot ' + (sel + 1); $('#lbCount').textContent = (sel + 1) + ' / ' + g.images.length; };
  $('#lootMain').addEventListener('click', () => { lbShow(); lb.classList.add('open'); });
  $('#lbPrev').addEventListener('click', () => { pick(sel - 1); lbShow(); });
  $('#lbNext').addEventListener('click', () => { pick(sel + 1); lbShow(); });
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('[data-close]')) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowLeft') { pick(sel - 1); lbShow(); }
    if (e.key === 'ArrowRight') { pick(sel + 1); lbShow(); }
  });

  /* Source code with light syntax highlighting */
  const gh = $('#ghLink');
  if (S.github) gh.href = S.github; else gh.hidden = true;
  const KW = /\b(public|private|protected|internal|static|void|class|struct|interface|enum|new|return|if|else|for|foreach|while|do|switch|case|break|continue|using|namespace|var|const|readonly|override|virtual|abstract|this|base|null|true|false|in|out|ref|get|set|async|await|yield|try|catch|finally|throw|def|import|from|as|and|or|not|None|True|False|self)\b/g;
  const TY = /\b(int|float|double|bool|string|char|long|object|Vector2|Vector3|Quaternion|Transform|GameObject|MonoBehaviour|Rigidbody|Rigidbody2D|Collider|Collider2D|AudioSource|AudioClip|Animator|Image|Text|Button|Time|Mathf|Debug|Input|List|Dictionary|IEnumerator|SerializeField|Header|Color|Random|Texture2D|SpriteBatch|Keys|Rectangle|Form|EventArgs)\b/g;
  function highlight(src) {
    const out = [];
    const re = /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?f?\b)/g;
    let last = 0, m;
    const plain = (t) => esc(t).replace(KW, '<span class="kw">$1</span>').replace(TY, '<span class="ty">$1</span>');
    while ((m = re.exec(src))) {
      out.push(plain(src.slice(last, m.index)));
      if (m[1]) out.push('<span class="cm">' + esc(m[1]) + '</span>');
      else if (m[2]) out.push('<span class="st">' + esc(m[2]) + '</span>');
      else out.push('<span class="nu">' + esc(m[3]) + '</span>');
      last = re.lastIndex;
    }
    out.push(plain(src.slice(last)));
    return out.join('');
  }
  if (!g.code.length) {
    $('#codeBox').hidden = true; $('#noCode').hidden = false;
  } else {
    let f = 0;
    const tabs = $('#codeTabs');
    tabs.innerHTML = g.code.map((c, k) => '<button type="button" role="tab" data-k="' + k + '">' + esc(c.file) + '</button>').join('');
    const showFile = (k) => {
      f = k;
      tabs.querySelectorAll('button').forEach((b, j) => { b.classList.toggle('on', j === k); b.setAttribute('aria-selected', String(j === k)); });
      $('#codeTitle').textContent = g.code[k].title + ' · ' + g.code[k].language;
      $('#codeEl').innerHTML = highlight(g.code[k].content);
      $('#codePre').scrollTop = 0;
    };
    tabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) showFile(+b.dataset.k); });
    $('#copyBtn').addEventListener('click', () => {
      const done = () => { $('#copyBtn').textContent = 'COPIED!'; setTimeout(() => { $('#copyBtn').textContent = 'COPY'; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(g.code[f].content).then(done, () => {});
    });
    showFile(0);
  }

  /* Reveal sections on scroll */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach((el) => { if (io) io.observe(el); else el.classList.add('in'); });

  /* Keyboard: [ and ] switch levels */
  document.addEventListener('keydown', (e) => {
    if (lb.classList.contains('open') || e.target.closest('input, textarea')) return;
    if (e.key === '[') location.href = url(i - 1);
    if (e.key === ']') location.href = url(i + 1);
  });
})();
