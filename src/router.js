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
