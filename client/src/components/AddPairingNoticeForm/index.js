import React, { PropTypes } from 'react';

import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import without from 'lodash/without';
import intersection from 'lodash/intersection';

import AddPairingNoticeFormComponent from './AddPairingNoticeForm';
import noticeStore from '../../stores/notices';
import authStore from '../../stores/auth';

const PAIRING_TECHS = ['ScreenHero', 'TeamViewer', 'GoogleHangouts', 'Skype'];

export default class AddPairingNoticeForm extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      username: authStore.username || '',
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
      if ( event.target.checked ) {
        value = uniq( [...this.state['setup[]'], event.target.value] );
      } else {
        value = without( this.state['setup[]'], [event.target.value] );
      }
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
      setup: this.state.other
        ? [...intersection( PAIRING_TECHS, this.state['setup[]'] ), this.state.other]
        : intersection( PAIRING_TECHS, this.state['setup[]'] ),
        // intersection ensures the same order as PAIRING_TECHS
      interests: this.state.interests,
    };

    // FIXME prevent submit when not signed in, and make a way to show the user

    noticeStore.createNotice( data );

    this.props.handleDidSubmit && this.props.handleDidSubmit();
  }

  render() {
    const rest = omit( this.props, ['handleDidSubmit'] );

    return (
      <AddPairingNoticeFormComponent
        handleFieldChange={this.handleFieldChange}
        handleSubmit={this.handleSubmit}
        pairingTechs={PAIRING_TECHS}
        {...omit( this.state, ['setup[]'] )} // pass in the values of the form fields except `setup[]`
        {...rest}
      />
    );
  }
}

AddPairingNoticeForm.propTypes = {
  handleDidSubmit: PropTypes.func,
};
