import React, { PropTypes } from 'react';
import axios from 'axios';

import AddPairingNoticeFormComponent from '../components/AddPairingNoticeForm';

const ADD_PAIRING_NOTICE_URL = '/api/v1/posts';
const PAIRING_TECHS = ['ScreenHero', 'TeamViewer', 'GoogleHangouts', 'Skype'];

export default class AddPairingNoticeForm extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      username: '',
      availableTime: '',
      'setup[]': [],
      other: '',
      interests: '',
    };

    this.handleFieldChange = this.handleFieldChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleFieldChange( event ) {
    let value;
    if ( event.target.name === 'setup[]' ) {
      // TODO HACK this should be doable without touching dom nodes
      const inputs = [...document.getElementsByName( 'setup[]' )];
      value = inputs
        .filter( input => input.checked )
        .map( input => input.value );
    } else {
      value = event.target.value;
    }
    this.setState( {
      [event.target.name]: value,
    } );
  }

  handleSubmit( event ) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      availableTime: this.state.availableTime,
      setup: this.state.other ? [...this.state['setup[]'], this.state.other] : this.state['setup[]'],
      interests: this.state.interests,
    };

    axios.post( ADD_PAIRING_NOTICE_URL, data )
      .then( ( res ) => {
        if ( res.status === 201 ) {
          this.props.handleDidSubmit && this.props.handleDidSubmit();
        } else {
          throw new Error( `POST to ${ADD_PAIRING_NOTICE_URL} yielded status code ${res.status}: ${res.statusText}` );
        }
      } )
      .catch( err => console.error( err ) );
  }

  render() {
    return (
      <AddPairingNoticeFormComponent
        handleFieldChange={this.handleFieldChange}
        handleSubmit={this.handleSubmit}
        pairingTechs={PAIRING_TECHS}
        {...this.state} // pass in the values of the form fields
      />
    );
  }
}

AddPairingNoticeForm.displayName = 'Container(AddPairingNoticeForm)';

AddPairingNoticeForm.propTypes = {
  handleDidSubmit: PropTypes.func,
};
