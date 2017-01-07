import { extendObservable } from 'mobx';
import axios from 'axios';

import authStore from './auth';

const MESSAGES_URL = '/api/v2/messages';

class MessageStore {
  constructor() {
    extendObservable( this, {
      messages: [],
    } );

    authStore.checkAuth();

    // FIXME this is a potential memory leak, remove the listeners if it ever becomes appropriate
    // this.socket.on( 'post', () => this.fetchAllNotices() );
    // this.socket.on( 'delete', () => this.fetchAllNotices() );
  }

  fetchAllMessages() {
    axios( MESSAGES_URL, {
      headers:
        { 'username': authStore.username },
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
