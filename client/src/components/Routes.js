import React from 'react';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';

import MainLayout from './MainLayout';
import HomePage from './HomePage';
import PostPage from './PostPage';
import InfoPage from './InfoPage';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomePage} />
        <Route path="/post" component={PostPage} />
        <Route path="/info" component={InfoPage} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
