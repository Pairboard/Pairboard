import React, { PropTypes } from 'react';

import PairingNotice from '../PairingNotice';

import './PairingNoticeList.css';

export default function PairingNoticeList( {
  notices,
  handleDeleteNotice,
} ) {
  return (
    <div className="PairingNoticeList_container">
      {notices.map( ( notice ) => (
        <PairingNotice
          key={notice.id}
          handleDelete={() => handleDeleteNotice( notice.id )}
          {...notice}
        />
      ) )}
    </div>
  );
}

PairingNoticeList.propTypes = {
  // FIXME PropTypes.arrayOf rejects mobx observable arrays. MobX provides its own PropTypes to mitigate this but then this component would have to explicitly depend on MobX
  notices: PropTypes.arrayOf( PropTypes.shape( {
    camper: PropTypes.shape( {
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    } ).isRequired,
    endTime: PropTypes.number.isRequired,
    pairingTechs: PropTypes.arrayOf( PropTypes.string ).isRequired,
    interests: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  } ) ).isRequired,
  handleDeleteNotice: PropTypes.func.isRequired,
};
