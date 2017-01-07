/*
/ We may not actually need a separate contacts store
/ this could potentially be replaced with a user store
/ maybe also a users store, based on contacts of current user?
*/

import { extendObservable } from 'mobx';
import axios from 'axios';

import getSocket from '../socket';

const CONTACTS_URL = '/api/v2/user'; // This should be /user/:id
                                     // How to get id param?

class ContactStore {
  constructor() {
    extendObservable( this, {
      contacts: [],
    } );
    this.socket = getSocket();

    // FIXME this is a potential memory leak, remove the listeners if it ever becomes appropriate
    this.socket.on( 'post', () => this.fetchAllContacts() );
    this.socket.on( 'delete', () => this.fetchAllContacts() );
  }

// FIXME
  fetchAllContacts() {
    axios( CONTACTS_URL )
      .then( res => {
        this.contacts = res.data.map( post => ( {
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

  deleteContact( id ) {
    axios.delete( `${CONTACTS_URL}/${id}` )
      .then( res => {
        if ( res.status === 204 ) {
          this.Contacts = this.Contacts.filter( post => post.id !== id );
          this.socket.emit( 'delete', id );
        } else {
          throw new Error( `DELETE to ${CONTACTS_URL} yielded status code ${res.status}: ${res.statusText}.` );
        }
      } )
      .catch( err => console.error( err ) );
  }

  createContact( data ) {
    axios.post( CONTACTS_URL, data )
      .then( ( res ) => {
        if ( res.status === 201 ) {
          this.fetchAllContacts();
          this.socket.emit( 'post' );
        } else {
          throw new Error( `POST to ${CONTACTS_URL} yielded status code ${res.status}: ${res.statusText}.` );
        }
      } )
      .catch( err => console.error( err ) );
  }

}

export default new ContactStore();
