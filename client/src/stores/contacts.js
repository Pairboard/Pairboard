/*
/ We may not actually need a separate contacts store
/ this could potentially be replaced with a user store
/ maybe also a users store, based on contacts of current user?
*/

import { extendObservable } from 'mobx';
import axios from 'axios';

import authStore from './auth';

const CONTACTS_URL = '/api/v2/user/';

class ContactStore {
  constructor() {
    extendObservable( this, {
      contacts: [],
    } );

    authStore.checkAuth();
  }

// FIXME
  fetchAllContacts() {
    let url = CONTACTS_URL + authStore._id;
    axios( url )
      .then( res => {
        this.contacts = res.data.contacts.map( ( element, i ) => ( {
          key: i,
          contact: {
            username: element,
          },
        } ) );
      } )
      .catch( err => console.error( err ) );
  }

}

export default new ContactStore();
