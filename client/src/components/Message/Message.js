import React, { PropTypes } from 'react';
import format from 'date-fns/format';

import CamperImage from '../CamperImage';
import Button from '../Button';

import './Message.css';

export default function Message( {
  toUser,
  fromUser,
  conversationId,
  timeStamp,
  messageBody,
} ) {
  return (
    <div className="Message_container">
      <p>{toUser}</p>
      <p>{fromUser}</p>
      <p>{conversationId}</p>
      <p>{timeStamp}</p>
      <p>{messageBody}</p>
    </div>
  );
}

// PairingNotice.propTypes = {
//   camper: PropTypes.shape( {
//     username: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//   } ).isRequired,
//   endTime: PropTypes.number.isRequired,
//   // FIXME PropTypes.arrayOf rejects mobx observable arrays. MobX provides its own PropTypes to mitigate this but then this component would have to explicitly depend on MobX
//   pairingTechs: PropTypes.arrayOf( PropTypes.string ).isRequired,
//   interests: PropTypes.string.isRequired,
//   handleDelete: PropTypes.func.isRequired,
// };
