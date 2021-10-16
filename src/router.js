const BrowserRouter = function ({ routes, viewContainer }) {
  const routesList = routes || [];
  const container = viewContainer;

  /** */
  const renderRoute = (route) => {
    if (!route) throw new Error("route is not present");

    if (!Array.from(container.childNodes).length) {
      container.appendChild(route.component);
    } else {
      container.replaceChild(route.component, container.firstChild);
    }
  };

  /** */
  const renderRouteByPathname = () => {
    const route = routesList.find((r) => r.path === location.pathname);
    renderRoute(route);
  };

  /** */
  const addRoute = (route) => {
    routesList.push(route);

    renderRouteByPathname();

    return route;
  };

  /** */
  const getRoutes = () => {
    return routesList;
  };

  /** */
  const linkClickHandler = (e) => {
    e.preventDefault();

    const url = new URL(e.currentTarget.href);
    const route = routesList.find((r) => r.path === url.pathname);

    history.pushState({}, document.title, url.pathname);

    renderRoute(route);
  };

  /** */
  window.addEventListener("popstate", renderRouteByPathname);

  /** */
  Array.from(document.querySelectorAll("a")).forEach((link) =>
    link.addEventListener("click", linkClickHandler)
  );

  return {
    addRoute,
    getRoutes,
    renderRoute,
  };
};

/** Class implementation variant */
class BrowserRouterClass {
  constructor(options) {
    const browserOptions = options || {};

    const { routes, viewContainer } = browserOptions;

    this.routesList = routes || [];
    this.container = viewContainer;

    this.setup();
  }
  /** */
  renderRoute(route) {
    if (!route) throw new Error("route is not present");

    if (!Array.from(this.container.childNodes).length) {
      this.container.appendChild(route.component);
    } else {
      this.container.replaceChild(route.component, this.container.firstChild);
    }
  }
  /** */
  renderRouteByPathname() {
    const route = this.routesList.find((r) => r.path === location.pathname);
    this.renderRoute(route);
  }
  /** */
  addRoute(route) {
    this.routesList.push(route);

    this.renderRouteByPathname();

    return route;
  }
  /** */
  getRoutes = () => {
    return this.routesList;
  };
  /** */
  linkClickHandler = (e) => {
    e.preventDefault();

    const url = new URL(e.currentTarget.href);
    const route = this.routesList.find((r) => r.path === url.pathname);

    history.pushState({}, document.title, url.pathname);

    this.renderRoute(route);
  };
  setup() {
    /** */
    window.addEventListener("popstate", () => this.renderRouteByPathname());
    /** */
    Array.from(document.querySelectorAll("a")).forEach((link) =>
      link.addEventListener("click", this.linkClickHandler)
    );
  }
}
