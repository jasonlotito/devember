import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory,
  Router,
  Route,
  IndexRoute }  from 'react-router'

import * as CommandItem from './comp/CommandItem';
import * as RouteItem from './comp/RouteItem';
import * as  Page from './comp/Page';
import * as  App from './comp/App';
import * as  Builder from './comp/Builder';

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