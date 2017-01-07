import React, { PropTypes } from 'react';
import format from 'date-fns/format';

import CamperImage from '../CamperImage';
import Button from '../Button';

import './Contact.css';

export default function Contact( {
  camper,
  endTime,
  pairingTechs,
  interests,
  handleDelete,
} ) {
  return (
    <div className="Contact_container">
      <a href={`https://forum.freecodecamp.com/users/${camper.username}`} className="Contact_image-link">
        <CamperImage username={camper.username} className="Contact_image" />
      </a>
      <div className="Contact_info">
        <p className="Contact_info_username">
          <a href={`https://forum.freecodecamp.com/users/${camper.username}`}>
            {camper.username}
          </a>
        </p>
        <p className="Contact_info_interests">
          {interests}
        </p>
        <p className="Contact_info_setup">
          <b>Preferred Pairing Technology(s):</b>
          {pairingTechs.join( ' ' )}
        </p>
        <p className="Contact_info_availability">
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

Contact.propTypes = {
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
