import React, { PropTypes } from 'react';
import axios from 'axios';

import PairingNoticeListComponent from '../components/PairingNoticeList';

const NOTICES_URL = '/api/v1/posts';

export default class PairingNoticeList extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      notices: [],
    };

    this.fetchNotices = this.fetchNotices.bind( this );
    this.handleDeleteNotice = this.handleDeleteNotice.bind( this );
  }

  componentWillMount() {
    this.fetchNotices();
  }

  componentDidMount() {
    this.props.socket.on( 'delete', this.fetchNotices );
    this.props.socket.on( 'post', this.fetchNotices );
  }

  componentWillUnmount() {
    this.props.socket.removeListener( 'delete', this.fetchNotices );
    this.props.socket.removeListener( 'post', this.fetchNotices );
  }

  fetchNotices() {
    axios( NOTICES_URL )
      .then( res => {
        this.setState( {
          notices: res.data.map( post => ( {
            camper: {
              username: post.username,
              id: post.username, // TODO this should actually be something identifiable
            },
            endTime: post.endTime,
            pairingTechs: post.setup,
            interests: post.interests,
            id: post._id,
          } ) ),
        } );
      } )
      .catch( err => console.error( err ) );
  }

  handleDeleteNotice( id ) {
    axios.delete( `${NOTICES_URL}/${id}` )
      .then( res => {
        if ( res.status === 204 ) {
          this.fetchNotices();
          this.props.socket.emit( 'delete', id );
        }
      } )
      .catch( err => console.error( err ) );
  }

  render() {
    return (
      <PairingNoticeListComponent
        notices={this.state.notices}
        handleDeleteNotice={this.handleDeleteNotice}
      />
    );
  }
}

PairingNoticeList.displayName = 'Container(PairingNoticeList)';

PairingNoticeList.propTypes = {
  socket: PropTypes.any.isRequired,
};
