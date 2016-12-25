import React, { PropTypes } from 'react';

import AddPairingNoticeFormComponent from './AddPairingNoticeForm';
import noticeStore from '../../stores/notices';

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
      const inputs = [...document.getElementsByName( 'setup[]' )]; // getElementsByName returns an iterable, spread it into an array for access to filter and map
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

    noticeStore.createNotice( data );

    this.props.handleDidSubmit && this.props.handleDidSubmit();
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

AddPairingNoticeForm.propTypes = {
  handleDidSubmit: PropTypes.func,
};
