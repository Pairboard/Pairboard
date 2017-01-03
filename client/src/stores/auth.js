import { extendObservable } from 'mobx';
import axios from 'axios';

import SERVER_HOST from '../config/config';

const CURRENT_USER_URL = '/user';

class AuthStore {
  constructor() {
    extendObservable( this, {
      pending: true,
      username: null,
    } );
  }

  checkAuth() {
    this.pending = true;
    axios.get( `${SERVER_HOST}${CURRENT_USER_URL}`, {
      withCredentials: true,
    } )
      .then( res => {
        if ( res.status === 201 ) {
          this.username = res.data.username;
        } else {
          throw new Error( `GET to ${CURRENT_USER_URL} yielded status code ${res.status}: ${res.statusText}` );
        }
        this.pending = false;
      } )
      .catch( ( err ) => {
        if ( typeof err.response.status === 'number' && err.response.status === 401 ) {
          this.username = null;
          this.pending = false;
        } else {
          console.error( err );
        }
      } );
  }
}

export default new AuthStore();
