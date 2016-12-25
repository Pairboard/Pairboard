import React, { PropTypes } from 'react';
import format from 'date-fns/format';

import CamperImage from '../CamperImage';
import Button from '../Button';

export default function PairingNotice( {
  camper,
  endTime,
  pairingTechs,
  interests,
  handleDelete,
} ) {
  return (
    <div className="user-card">
      <a href={`https://forum.freecodecamp.com/users/${camper.username}`}>
        <CamperImage username={camper.username} />
      </a>
      <div className="user-card-info">
        <p className="user-card-name">
          <a href={`https://forum.freecodecamp.com/users/${camper.username}`}>
            {camper.username}
          </a>
        </p>
        <p className="user-card-interests">
          {interests}
        </p>
        <p className="user-card-setup">
          <b>Preferred Pairing Technology(s):</b>
          {pairingTechs.join( ' ' )}
        </p>
        <p className="user-card-availability">
          <b>Available until:</b> {format( new Date( endTime ), 'h:mma ddd Do MMM ([GMT]Z)' )}
        </p>
        <Button
          type="submit"
          onClick={handleDelete}
          className="circle-button"
          bsStyle="danger"
          bsSize="small"
          icon="trash"
          iconPosition="after"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

PairingNotice.propTypes = {
  camper: PropTypes.shape( {
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  } ).isRequired,
  endTime: PropTypes.number.isRequired,
  // FIXME PropTypes.arrayOf rejects mobx observable arrays. MobX provides its own PropTypes to mitigate this but then this component would have to explicitly depend on MobX
  pairingTechs: PropTypes.arrayOf( PropTypes.string ).isRequired,
  interests: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
