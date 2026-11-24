(() => {
  const ROOT = document.documentElement.dataset.root || './';
  const dataPath = (p) => ROOT + p;
  document.querySelectorAll('a[href^="../docs/"]').forEach((link) => {
    link.href = dataPath('docs/' + link.getAttribute('href').slice('../docs/'.length));
  });
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu-toggle');
  if (menu && nav) menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });

  // The stylesheet follows the visitor's system light/dark preference.
  const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal, .feature-card, .preview-card').forEach((el) => reveal.observe(el));

  const grid = document.getElementById('screen-grid');
  if (grid) {
    const search = document.getElementById('screen-search');
    const filters = [...document.querySelectorAll('.filter-chip')];
    const empty = document.getElementById('empty-state');
    const dialog = document.getElementById('screen-dialog');
    const dialogContent = document.getElementById('dialog-content');
    const close = dialog.querySelector('.dialog-close');
    let screens = [], filter = 'all', query = '';
    const deviceName = (id) => id.startsWith('WF') ? 'Android app' : id.startsWith('MW') ? 'Browser' : 'Mac helper';
    const getScreenLink = (screen) => `${dataPath('docs/')}${screen.spec.replace(/^\.\//, '')}`;
    function render() {
      const matched = screens.filter((s) => (filter === 'all' || s.id.startsWith(filter)) && `${s.id} ${s.title} ${s.purpose}`.toLowerCase().includes(query));
      grid.innerHTML = matched.map((s, i) => `<article class="screen-card" id="${s.id}" style="--card-order:${i % 12}"><button class="screen-card-open" data-id="${s.id}" aria-label="Preview ${s.id}: ${escapeHtml(s.title)}"><span class="screen-thumb"><img loading="lazy" src="${dataPath(s.svg)}" alt="Light and dark theme concept for ${escapeHtml(s.title)}"><span class="thumb-zoom">↗</span></span><span class="screen-card-meta"><span class="screen-id">${s.id}</span><span class="screen-platform">${deviceName(s.id)}</span></span><span class="screen-card-title">${escapeHtml(s.title)}</span><span class="screen-card-desc">${escapeHtml(s.purpose)}</span></button><a class="screen-spec-link" href="${getScreenLink(s)}">Screen spec <span>↗</span></a></article>`).join('');
      empty.hidden = matched.length !== 0; grid.hidden = matched.length === 0;
      grid.querySelectorAll('.screen-card-open').forEach((button) => button.addEventListener('click', () => openScreen(button.dataset.id)));
      if (location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))) setTimeout(() => document.getElementById(decodeURIComponent(location.hash.slice(1))).scrollIntoView({behavior:'smooth',block:'center'}), 120);
    }
    function openScreen(id) {
      const s = screens.find((item) => item.id === id); if (!s) return;
      dialogContent.innerHTML = `<div class="dialog-label">${s.id} · ${deviceName(s.id)}</div><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.purpose)}</p><div class="dialog-art"><img src="${dataPath(s.svg)}" alt="${escapeHtml(s.title)} prototype in light and dark themes"></div><div class="dialog-actions"><a class="button button-primary" href="${getScreenLink(s)}">Read the screen document <span>↗</span></a><a class="text-link" href="${dataPath(s.svg)}" target="_blank" rel="noopener">Open SVG prototype <span>↗</span></a></div>`;
      dialog.showModal();
    }
    function escapeHtml(text) { return String(text).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
    search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });
    filters.forEach((button) => button.addEventListener('click', () => { filter = button.dataset.filter; filters.forEach((f) => f.classList.toggle('selected', f === button)); render(); }));
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.focus(); } });
    fetch('assets/screens.json').then((response) => { if (!response.ok) throw new Error('Screen catalog unavailable'); return response.json(); }).then((items) => { screens = items; render(); }).catch(() => { grid.innerHTML = '<p class="loading-note">The screen list could not be loaded. Open this page from its website folder and try again.</p>'; });
  }

  const config = window.WIFILES_SITE || {};
  const email = config.supportEmail;
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const link = document.getElementById('contact-email');
    const copy = document.getElementById('contact-copy');
    if (link && copy) { link.href = `mailto:${email}`; link.textContent = email; link.hidden = false; copy.textContent = 'For questions about WiFiles, write to:'; }
  }
})();
