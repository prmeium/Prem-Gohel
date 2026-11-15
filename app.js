(() => {
  'use strict';
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cases = [...document.querySelectorAll('.case')];
  const result = document.querySelector('#filter-result');
  function filterWork(value) {
    let count = 0;
    cases.forEach(card => {
      card.hidden = value !== 'all' && !card.dataset.categories.split(' ').includes(value);
      if (!card.hidden) count++;
    });
    buttons.forEach(button => {
      const active = button.dataset.filter === value;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    result.textContent = count + (count === 1 ? ' case study' : ' case studies');
  }
  document.querySelector('#filters').hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => filterWork(button.dataset.filter)));
  function revealCase(id) {
    const card = cases.find(item => item.id === id);
    if (!card) return;
    if (card.hidden) filterWork('all');
    card.querySelector('details').open = true;
  }
  function revealHashTarget() {
    try { revealCase(decodeURIComponent(location.hash.slice(1))); } catch {}
  }
  window.addEventListener('hashchange', revealHashTarget);
  if (location.hash) revealHashTarget();
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => revealCase(link.getAttribute('href').slice(1))));
  const menu = document.querySelector('#site-menu');
  const toggle = document.querySelector('#menu-toggle');
  toggle.addEventListener('click', () => {
    menu.showModal();
    toggle.setAttribute('aria-expanded','true');
  });
  document.querySelector('#menu-close').addEventListener('click', () => menu.close());
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
  menu.addEventListener('click', event => {
    if (event.target === menu) {
      const r = menu.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) menu.close();
    }
  });
  menu.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded','false');
    toggle.focus({preventScroll:true});
  });
  const copy = document.querySelector('#copy-email');
  const copyStatus = document.querySelector('#copy-status');
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('premgohel26@gmail.com');
      copyStatus.textContent = 'Email copied';
    } catch {
      copyStatus.textContent = 'premgohel26@gmail.com';
    }
  });
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.08});
    document.querySelectorAll('.capability-card,.about-grid,.metric,.case-overview,.approach-grid>div,.contact-heading').forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
})();
