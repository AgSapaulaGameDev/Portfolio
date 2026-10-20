/* ===== Shared helpers: chiptune sound, contact form, links ===== */
(function () {
  const S = window.SITE || {};
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------- Chiptune (Web Audio, no files needed) ---------- */
  const Sound = {
    on: false, ctx: null, master: null, timer: null, step: 0,
    init() {
      if (this.ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.06;
      this.master.connect(this.ctx.destination);
    },
    note(freq, dur, type, vol, when) {
      if (!this.ctx || !this.on) return;
      const t = when || this.ctx.currentTime;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type || 'square'; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol || 0.5, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.02);
    },
    blip(kind) {
      if (!this.on || !this.ctx) return;
      const t = this.ctx.currentTime;
      if (kind === 'coin') { this.note(988, 0.08, 'square', 0.6, t); this.note(1319, 0.25, 'square', 0.6, t + 0.08); }
      else if (kind === 'level') { [523, 659, 784, 1047].forEach((f, i) => this.note(f, 0.12, 'square', 0.5, t + i * 0.07)); }
      else if (kind === 'boss') { this.note(110, 0.4, 'sawtooth', 0.7, t); this.note(98, 0.5, 'sawtooth', 0.7, t + 0.2); }
      else { this.note(660, 0.06, 'square', 0.4, t); }
    },
    loop() {
      // C – Am – F – G arpeggio with a bass line
      const prog = [[262, 330, 392], [220, 262, 330], [175, 220, 262], [196, 247, 294]];
      const tick = () => {
        if (!this.on) return;
        const chord = prog[Math.floor(this.step / 8) % 4];
        const t = this.ctx.currentTime;
        this.note(chord[this.step % 3] * 2, 0.12, 'square', 0.25, t);
        if (this.step % 4 === 0) this.note(chord[0] / 2, 0.3, 'triangle', 0.9, t);
        this.step++;
      };
      clearInterval(this.timer);
      this.timer = setInterval(tick, 150);
    },
    set(on) {
      this.on = on;
      store.set('ag-sound', on ? '1' : '0');
      if (on) { this.init(); if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); this.loop(); this.blip('coin'); }
      else clearInterval(this.timer);
      document.querySelectorAll('[data-sound-btn]').forEach(updateSoundBtn);
    }
  };
  function updateSoundBtn(btn) {
    btn.classList.toggle('on', Sound.on);
    btn.setAttribute('aria-pressed', String(Sound.on));
    btn.setAttribute('aria-label', Sound.on ? 'Turn chiptune sound off' : 'Turn chiptune sound on');
    const t = btn.querySelector('[data-sound-text], #soundText');
    if (t) t.textContent = Sound.on ? 'SOUND ON' : 'SOUND OFF';
  }
  function bindSound(btn) {
    if (!btn) return;
    btn.setAttribute('data-sound-btn', '');
    updateSoundBtn(btn);
    btn.addEventListener('click', () => Sound.set(!Sound.on));
    // Browsers need a user gesture before audio; resume the saved preference on first interaction
    if (store.get('ag-sound') === '1') {
      const resume = () => { if (!Sound.on) Sound.set(true); window.removeEventListener('pointerdown', resume); window.removeEventListener('keydown', resume); };
      window.addEventListener('pointerdown', resume);
      window.addEventListener('keydown', resume);
    }
  }

  /* ---------- Links ---------- */
  function socialLinks(el) {
    if (!el) return;
    const items = [['GitHub', S.github], ['LinkedIn', S.linkedin], ['itch.io', S.itch], ['Facebook', S.facebook], [S.email, S.email ? 'mailto:' + S.email : '']];
    el.innerHTML = items.filter((i) => i[1]).map((i) => '<a href="' + esc(i[1]) + '"' + (/^https?:/.test(i[1]) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(i[0]) + '</a>').join('');
  }

  /* ---------- Contact modal (EmailJS, same keys as the old site) ---------- */
  function contact(openBtn) {
    const modal = $('#contactModal');
    if (!modal) return;
    const form = $('#contactForm'), status = $('#formStatus');
    const mail = $('#mailLink');
    if (mail) { mail.href = 'mailto:' + S.email; mail.textContent = S.email; }
    let lastFocus = null;
    const open = () => { lastFocus = document.activeElement; modal.classList.add('open'); Sound.blip('coin'); setTimeout(() => $('#cName').focus(), 30); };
    const close = () => { modal.classList.remove('open'); if (lastFocus) lastFocus.focus(); };
    if (openBtn) openBtn.addEventListener('click', open);
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
    const ejs = S.emailjs || {};
    if (window.emailjs && ejs.publicKey) { try { window.emailjs.init({ publicKey: ejs.publicKey }); } catch (e) { /* ignore */ } }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const params = { from_name: $('#cName').value.trim(), from_email: $('#cEmail').value.trim(), message: $('#cMsg').value.trim(), to_email: S.email };
      if (!window.emailjs || !ejs.service) {
        window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Portfolio contact from ' + params.from_name) + '&body=' + encodeURIComponent(params.message + '\n\n— ' + params.from_name + ' (' + params.from_email + ')');
        return;
      }
      btn.disabled = true; btn.textContent = 'SENDING...'; status.style.color = '#8B949E'; status.textContent = '';
      window.emailjs.send(ejs.service, ejs.template, params).then(() => {
        status.style.color = '#3FB950'; status.textContent = 'Message sent! I\'ll get back to you soon.';
        form.reset(); Sound.blip('level');
      }, () => {
        status.style.color = '#F85149'; status.textContent = 'Couldn\'t send. Please email me directly at ' + S.email + '.';
      }).finally(() => { btn.disabled = false; btn.textContent = 'SEND ▶'; });
    });
  }

  /* ---------- Video helper ---------- */
  function driveEmbed(id) { return id ? 'https://drive.google.com/file/d/' + encodeURIComponent(id) + '/preview' : ''; }

  window.AG = { $, esc, store, Sound, bindSound, socialLinks, contact, driveEmbed };
})();
