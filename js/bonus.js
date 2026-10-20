/* ===== Bonus stage: 3D models + animations from data.js ===== */
(function () {
  const { $, esc, Sound, store } = window.AG;
  const ART = window.ART;
  window.AG.bindSound($('#soundBtn'));

  const cats = [];
  ART.forEach((a) => { if (cats.indexOf(a.category) < 0) cats.push(a.category); });
  const rarity = (a) => (a.video ? ['EPIC', '#A371F7'] : a.images.length >= 5 ? ['RARE', '#58A6FF'] : ['COMMON', '#8B949E']);

  let stars = '';
  for (let i = 0; i < 22; i++) stars += '<div class="star" style="left:' + ((i * 37 + 11) % 100) + '%;top:' + ((i * 53 + 7) % 90) + '%;animation-delay:' + ((i % 5) * 0.4) + 's"></div>';
  $('#stars').innerHTML = stars;

  /* Track which pieces the visitor has inspected (just for fun) */
  let seen = {};
  try { seen = JSON.parse(store.get('ag-seen') || '{}') || {}; } catch (e) { seen = {}; }
  const updateSeen = () => {
    const n = ART.filter((a) => seen[a.slug]).length;
    $('#got').textContent = String(n); $('#total').textContent = String(ART.length);
    $('#gotBar').style.width = (n / ART.length * 100) + '%';
  };

  const q = new URLSearchParams(location.search);
  let cat = cats.indexOf(q.get('tab')) >= 0 ? q.get('tab') : cats[0];
  let selSlug = null, media = 0;

  function items() { return ART.filter((a) => a.category === cat); }

  function renderTabs() {
    $('#tabs').innerHTML = cats.map((c) => '<button type="button" role="tab" class="tab' + (c === cat ? ' on' : '') + '" aria-selected="' + (c === cat) + '" data-c="' + esc(c) + '">' + esc(c.toUpperCase()) + ' ' + ART.filter((a) => a.category === c).length + '</button>').join('');
  }
  function renderCollection() {
    $('#collection').innerHTML = items().map((a) => {
      const r = rarity(a);
      return '<button type="button" class="collectible' + (a.slug === selSlug ? ' on' : '') + '" data-s="' + esc(a.slug) + '"><div class="thumb" style="background-image:url(&quot;' + esc(a.cover) + '&quot;)"></div><div class="row"><b>' + esc(a.title) + '</b><span class="rarity" style="color:' + r[1] + '">' + r[0] + '</span></div></button>';
    }).join('');
  }
  function mediaList(a) { return (a.video ? [{ v: a.video }] : []).concat(a.images.map((src) => ({ i: src }))); }
  function renderViewer() {
    const a = ART.find((x) => x.slug === selSlug);
    const list = mediaList(a);
    const m = list[Math.min(media, list.length - 1)];
    $('#viewer').innerHTML = m.v
      ? '<span class="vtag">▶ ANIMATION</span><iframe src="' + window.AG.driveEmbed(m.v) + '" title="' + esc(a.title) + ' animation" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>'
      : '<span class="vtag">' + (media + 1 - (a.video ? 1 : 0)) + ' / ' + a.images.length + '</span><img src="' + esc(m.i) + '" alt="' + esc(a.title) + ' render">';
    $('#thumbs').innerHTML = list.map((x, k) => x.v
      ? '<button type="button" class="vid' + (k === media ? ' on' : '') + '" data-k="' + k + '" aria-label="Play animation">▶ VIDEO</button>'
      : '<button type="button" class="' + (k === media ? 'on' : '') + '" data-k="' + k + '" style="background-image:url(&quot;' + esc(x.i) + '&quot;)" aria-label="Render ' + k + '"></button>').join('');
  }
  function renderDetails() {
    const a = ART.find((x) => x.slug === selSlug);
    const r = rarity(a);
    $('#dRarity').textContent = r[0]; $('#dRarity').style.color = r[1];
    $('#dTitle').textContent = a.title;
    $('#dTags').innerHTML = a.tags.map((t) => '<span class="chip" style="border-color:#E3C27A;background:rgba(227,194,122,.1)">' + esc(t) + '</span>').join('');
    $('#dDesc').textContent = a.description;
    $('#dFeat').innerHTML = a.features.map((f) => '<li>' + esc(f) + '</li>').join('');
  }
  function select(slug, scroll) {
    selSlug = slug;
    const a0 = ART.find((x) => x.slug === slug);
    media = a0.video && a0.images.length ? 1 : 0; // start on a render; video loads only when its thumb is clicked
    seen[slug] = 1; store.set('ag-seen', JSON.stringify(seen)); updateSeen();
    renderCollection(); renderViewer(); renderDetails();
    if (scroll) $('#viewer').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  $('#tabs').addEventListener('click', (e) => {
    const b = e.target.closest('.tab'); if (!b) return;
    cat = b.dataset.c; Sound.blip(); renderTabs(); select(items()[0].slug);
    history.replaceState(null, '', '?tab=' + encodeURIComponent(cat));
  });
  $('#collection').addEventListener('click', (e) => { const b = e.target.closest('.collectible'); if (b) { Sound.blip('coin'); select(b.dataset.s, true); } });
  $('#thumbs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { media = +b.dataset.k; renderViewer(); } });

  renderTabs();
  select(items()[0].slug);
})();
