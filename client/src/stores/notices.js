import { extendObservable } from 'mobx';
import axios from 'axios';

import getSocket from '../socket';

const NOTICES_URL = '/api/v1/posts';

class NoticeStore {
  constructor() {
    extendObservable( this, {
      notices: [],
    } );
    this.socket = getSocket();

    // FIXME this is a potential memory leak, remove the listeners if it ever becomes appropriate
    this.socket.on( 'post', () => this.fetchAllNotices() );
    this.socket.on( 'delete', () => this.fetchAllNotices() );
  }

  fetchAllNotices() {
    axios( NOTICES_URL )
      .then( res => {
        this.notices = res.data.map( post => ( {
          camper: {
            username: post.username,
            id: post.username, // TODO this should actually be something unique
          },
          endTime: post.endTime,
          pairingTechs: post.setup,
          interests: post.interests,
          id: post._id,
        } ) );
      } )
      .catch( err => console.error( err ) );
  }

  deleteNotice( id ) {
    axios.delete( `${NOTICES_URL}/${id}` )
      .then( res => {
        if ( res.status === 204 ) {
          this.notices = this.notices.filter( post => post.id !== id );
          this.socket.emit( 'delete', id );
        } else {
          throw new Error( `DELETE to ${NOTICES_URL} yielded status code ${res.status}: ${res.statusText}.` );
        }
      } )
      .catch( err => console.error( err ) );
  }

  createNotice( data ) {
    axios.post( NOTICES_URL, data )
      .then( ( res ) => {
        if ( res.status === 201 ) {
          this.fetchAllNotices();
          this.socket.emit( 'post' );
        } else {
          throw new Error( `POST to ${NOTICES_URL} yielded status code ${res.status}: ${res.statusText}.` );
        }
      } )
      .catch( err => console.error( err ) );
  }

}

export default new NoticeStore();
