import { extendObservable } from 'mobx';
import axios from 'axios';

import getSocket from '../socket';

const MESSAGES_URL = '/api/v2/messages';

class MessageStore {
  constructor() {
    extendObservable( this, {
      messages: [],
    } );
    this.socket = getSocket();

    // FIXME this is a potential memory leak, remove the listeners if it ever becomes appropriate
    // this.socket.on( 'post', () => this.fetchAllNotices() );
    // this.socket.on( 'delete', () => this.fetchAllNotices() );
  }

  fetchAllMessages() {
    axios( MESSAGES_URL, {
      headers:
        { 'username': 'JacksonBates' },
    } )
      .then( res => {
        this.messages = res.data.map( message => ( {
          toUser: message.toUser,
          fromUser: message.fromUser,
          conversationId: message.conversationId,
          timeStamp: message.timeStamp,
          messageBody: message.messageBody,
        } ) );
      } )
      .catch( err => console.error( err ) );
  }

}

export default new MessageStore();
