import { Router } from './router.js';
import { HomeView } from './views/home.js';
import { ReservasView } from './views/reservas.js';
import { AboutView } from './views/about.js';

document.getElementById('year').textContent = new Date().getFullYear();

const routes = {
  '/': HomeView,
  '/reservas': ReservasView,
  '/about': AboutView,
  '/404': () => '<h2>Página não encontrada</h2>',
};

const router = new Router(routes, (path) => {
  document.querySelectorAll('a[data-link]').forEach((a) => {
    const href = a.getAttribute('href').replace('#', '');
    const expected = href || '/';
    a.classList.toggle('nav-active', expected === path);
  });
});

router.start();
