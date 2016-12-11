import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory,
  Router,
  Route,
  IndexRoute } from 'react-router'

import CommandItem from './comp/CommandItem';
import RouteItem from './comp/RouteItem';
import Page from './comp/Page';
import App from './comp/App';
import Builder from './comp/Builder';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Page}/>
      <Route path="route/:route" component={RouteItem}/>
      <Route path="command/:command" component={CommandItem}/>
      <Route path="builder" component={Builder}/>
    </Route>
  </Router>,
  document.getElementById( 'content' )
);