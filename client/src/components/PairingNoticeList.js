import React, { PropTypes } from 'react';

import PairingNotice from './PairingNotice';

export default function PairingNoticeList( {
  notices,
  handleDeleteNotice,
} ) {
  return (
    <div className="container">
      <div className="inner-container">
        {notices.map( ( notice ) => (
          <PairingNotice
            key={notice.id}
            handleDelete={() => handleDeleteNotice( notice.id )}
            {...notice}
          />
        ) )}
      </div>
    </div>
  );
}

PairingNoticeList.propTypes = {
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
