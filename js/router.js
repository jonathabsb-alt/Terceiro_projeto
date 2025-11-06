export class Router {
  constructor(routes, onRouteChange) {
    this.routes = routes;
    this.onRouteChange = onRouteChange;
  }

  start() {
    window.addEventListener('hashchange', () => this.handle());
    this.handle();
  }

  get path() {
    return location.hash.replace('#', '') || '/';
  }

  async handle() {
    const view = this.routes[this.path] || this.routes['/404'];
    const html = typeof view === 'function' ? await view() : view;
    document.getElementById('app').innerHTML = html;
    this.onRouteChange?.(this.path);
  }
}
