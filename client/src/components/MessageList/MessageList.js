import React, { PropTypes } from 'react';

import Message from '../Message';

import './MessageList.css';

export default function MessageList( {
  messages,
} ) {
  return (
    <div className="MessageList_container">
      {messages.map( ( notice ) => (
        <Message
          key={messages.id}
          {...notice}
        />
      ) )}
    </div>
  );
}

// MessageList.propTypes = {
//   // FIXME PropTypes.arrayOf rejects mobx observable arrays. MobX provides its own PropTypes to mitigate this but then this component would have to explicitly depend on MobX
//   messages: PropTypes.arrayOf( PropTypes.shape( {
//     camper: PropTypes.shape( {
//       username: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     } ).isRequired,
//     endTime: PropTypes.number.isRequired,
//     pairingTechs: PropTypes.arrayOf( PropTypes.string ).isRequired,
//     interests: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//   } ) ).isRequired,
//   handleDeleteNotice: PropTypes.func.isRequired,
// };
