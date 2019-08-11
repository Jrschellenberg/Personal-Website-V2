import route from 'page';

import Middleware from '../middlewares';
import Home from './home';

export default class Router extends Middleware {
  constructor() {
    super(route);
    this._bindRoutes();
    route.start({ click: false });
  }

  _bindRoutes() {
    route('/', Home);
  }

  refresh() {
    route(window.location.pathname);
  }
}
