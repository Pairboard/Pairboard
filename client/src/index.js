import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import TestRoute from './components/TestRoute';
import './index.css';

ReactDOM.render( (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } />
    <Route path="test" component={ TestRoute } />
  </Router>
), document.getElementById( 'root' )
);
