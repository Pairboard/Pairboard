import React, { PropTypes } from 'react';

import Contact from '../Contact';

import './ContactList.css';

export default function ContactList( {
  contacts,
  handleDeletecontact,
} ) {
  return (
    <div className="ContactList_container">
      {contacts.map( ( contact ) => (
        <Contact
          key={contact.id}
          handleDelete={() => handleDeletecontact( contact.id )}
          {...contact}
        />
      ) )}
    </div>
  );
}

ContactList.propTypes = {
  // FIXME PropTypes.arrayOf rejects mobx observable arrays. MobX provides its own PropTypes to mitigate this but then this component would have to explicitly depend on MobX
  contacts: PropTypes.arrayOf( PropTypes.shape( {
    camper: PropTypes.shape( {
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    } ).isRequired,
    endTime: PropTypes.number.isRequired,
    pairingTechs: PropTypes.arrayOf( PropTypes.string ).isRequired,
    interests: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  } ) ).isRequired,
  handleDeletecontact: PropTypes.func.isRequired,
};
