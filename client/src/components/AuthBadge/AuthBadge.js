import React, { PropTypes } from 'react';

import SERVER_HOST from '../../config/config';
import CamperImage from '../CamperImage';

import './AuthBadge.css';

export default function AuthBadge( { pending, username } ) {
  // FIXME perhaps the pending state could be more informative than `...`
  if ( pending ) {
    return (
      <div className="AuthBadge">
        <span className="AuthBadge_username">...</span>
      </div>
    );
  };

  // FIXME currently you log out by clicking your name, we should add a logout button
  if ( username ) {
    return (
      <div className="AuthBadge">
        <a href={`${SERVER_HOST}/auth/logout`}><span className="AuthBadge_username">@{username}</span></a>
        <CamperImage username={username} className="AuthBadge_image" />
      </div>
    );
  }

  return (
    <div className="AuthBadge">
      <a href={`${SERVER_HOST}/auth/login`}><span className="AuthBadge_username">Log in with Github</span></a>
    </div>
  );
}

AuthBadge.propTypes = {
  pending: PropTypes.bool.isRequired,
  username: PropTypes.string,
};
