import React, { PropTypes } from 'react';

export default function CamperImage( { username, ...rest } ) {
  return (
    <img
      className="profile-images"
      height="120"
      width="120"
      src={`https://forum.freecodecamp.com/user_avatar/forum.freecodecamp.com/${username}/120/202_1.png`} alt={`${username}`}
      {...rest}
    />
  );
}

CamperImage.propTypes = {
  username: PropTypes.string.isRequired,
};
