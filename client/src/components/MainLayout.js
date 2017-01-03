import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Button from './Button';
import FccIcon from './FccIcon';

import './MainLayout.css';

export default function MainLayout( { children } ) {
  return (
    <div className="App">
      <div className="App-header">
        <p>
          <span className="header-text pull-left">
            FreeCodeCamp <FccIcon /> Remote Pairing Noticeboard
          </span>
        </p>
      </div>
      <div className="App-body">
        {children}
      </div>
      <div className="App-footer">
        <Link to="/">
          <Button
            bsSize="small"
            icon="home"
          >
            Home
          </Button>
        </Link>
        <Link to="/post">
          <Button
            className="add-button"
            bsSize="small"
            icon="plus"
          >
            Add
          </Button>
        </Link>
        <Link to="/info">
          <Button
            className="info-button"
            bsSize="small"
            icon="info-sign"
          >
            Info
          </Button>
        </Link>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
