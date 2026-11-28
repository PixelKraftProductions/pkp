/* Shared navigation, persistent appearance switch, footer year and reduced-motion-aware reveals. */
(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const themeLabel = document.querySelector('.theme-label');
  const themeIcon = document.querySelector('.theme-icon');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const sunIcon = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
  const moonIcon = '<path d="M20.4 15.1A8.5 8.5 0 0 1 8.9 3.6 8.6 8.6 0 1 0 20.4 15.1Z"/><path d="m16.8 4.2.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4.4-1.2Z"/>';

  const applyTheme = (theme, persist = false) => {
    const isLight = theme === 'light';
    root.dataset.theme = isLight ? 'light' : 'dark';
    if (themeLabel) themeLabel.textContent = isLight ? 'Dark mode' : 'Light mode';
    if (themeButton) {
      const action = isLight ? 'Switch to dark theme' : 'Switch to light theme';
      themeButton.setAttribute('aria-label', action);
      themeButton.title = action;
    }
    if (themeIcon) themeIcon.innerHTML = isLight ? moonIcon : sunIcon;
    if (themeMeta) themeMeta.content = isLight ? '#faf6fa' : '#17101c';
    if (persist) {
      try { localStorage.setItem('typio-site-theme', isLight ? 'light' : 'dark'); } catch (_) { /* Storage may be unavailable in private browsing. */ }
    }
  };

  try {
    const savedTheme = localStorage.getItem('typio-site-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') applyTheme(savedTheme);
    else applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (_) {
    applyTheme('dark');
  }

  themeButton?.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      navigation.classList.toggle('is-open', !open);
    });
    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (event) => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
  revealItems.forEach((item) => observer.observe(item));
})();
