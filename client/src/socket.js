import io from 'socket.io-client';

import SOCKET_URI from './config/config';

let socket;
export default function getSocket() {
  if ( !socket ) {
    socket = io( SOCKET_URI );
  }
  return socket;
}
