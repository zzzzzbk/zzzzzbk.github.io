/* Progressively enhance navigation, project filters, and viewport-aware previews. */
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  links.classList.toggle('is-open', open);
});
links?.addEventListener('click', e => {
  if (e.target.closest('a')) { menu.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); menu.focus();
  }
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  document.querySelectorAll('.project-grid .work-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  });
  document.querySelector('#project-count').textContent = `${count} project${count === 1 ? '' : 's'}`;
}));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const videos = [...document.querySelectorAll('video')];
const previews = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(({ target: video, isIntersecting }) => {
  if (isIntersecting) { if (!reducedMotion.matches && !navigator.connection?.saveData && video.dataset.userPaused !== 'true') video.play().catch(() => {}); }
  else if (!video.paused) { video.dataset.autoPaused = 'true'; video.pause(); }
}), { threshold: 0.35 }) : null;
videos.forEach(video => {
  video.addEventListener('pause', () => { if (video.dataset.autoPaused !== 'true') video.dataset.userPaused = 'true'; delete video.dataset.autoPaused; });
  video.addEventListener('play', () => { delete video.dataset.userPaused; });
  previews?.observe(video);
});
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) videos.forEach(video => video.pause()); });
document.addEventListener('visibilitychange', () => { if (document.hidden) videos.forEach(video => video.pause()); });
