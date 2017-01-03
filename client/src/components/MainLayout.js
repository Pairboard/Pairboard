import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import AuthBadge from './AuthBadge';
import Button from './Button';
import FccIcon from './FccIcon';

import './MainLayout.css';

export default function MainLayout( { children } ) {
  return (
    <div className="MainLayout">
      <div className="MainLayout_header">
        <h1 className="MainLayout_header_title">
          FreeCodeCamp <FccIcon /> Remote Pairing Noticeboard
        </h1>
        <AuthBadge />
      </div>
      <div className="MainLayout_body">
        {children}
      </div>
      <div className="MainLayout_footer">
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
            bsSize="small"
            icon="plus"
          >
            Add
          </Button>
        </Link>
        <Link to="/info">
          <Button
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
