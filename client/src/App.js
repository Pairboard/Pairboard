import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// Components
import MainLayout from './components/MainLayout';
import Modal from './components/Modal';
import CamperList from './components/CamperList';
import InfoModal from './components/InfoModal';
import AddPairingNoticeForm from './containers/AddPairingNoticeForm';

import './App.css';
import { withHash } from './History';
import server from './config/config';

class App extends Component {

  constructor() {
    super();
    this.state = {
      campers: [],
      username: '',
      availableTime: '',
      setup: [],
      interests: '',
    };

    this.close = () => {
      this.props.replaceHash( '' );
      this.setState( {
        username: '',
        availableTime: '',
        setup: [],
        interests: '',
      } );
    };

    this.open = () => {
      this.props.replaceHash( '#add' );
    };

    this.openInfo = () => {
      this.props.replaceHash( '#info' );
    };

    this.fetchData = this.fetchData.bind( this );
    this.handleDelete = this.handleDelete.bind( this );
    this.handlePairingNoticeFormAdded = this.handlePairingNoticeFormAdded.bind( this );
  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidMount() {
    this.socket = io( server );
    this.socket.on( 'delete', id => {
      this.fetchData();
    } );
    this.socket.on( 'post', () => {
      this.fetchData();
    } );
  }

  fetchData() {
    fetch( '/api/v1/posts' )
      .then( result => result.json() )
      .then( result => this.setState( {
        campers: result,
      } ) )
      .catch( e => console.error( e ) );
  }

  handleDelete( id ) {
//     console.log(id);
    const url = `/api/v1/posts/${id}`;

    axios.delete( url ).then( res => {
      if ( res.status === 204 ) {
        // this.setState({
        //   campers: this.state.campers.filter(camper => camper._id !== id)
        // });
        this.fetchData();
        this.socket.emit( 'delete', id );
      }
    } ).catch( e => console.log( e ) );
  }

  handlePairingNoticeFormAdded( res ) {
    this.fetchData();
    this.socket.emit( 'post', res.body );
    this.close();
  }

  render() {
    let showModal = this.props.hash === '#add';
    let showInfo = this.props.hash === '#info';
    return (
      <MainLayout
        handleOpenAdd={this.open}
        handleOpenInfo={this.openInfo}
      >
        <CamperList campers={this.state.campers} handleDelete={this.handleDelete} />
        <Modal
          show={showModal}
          handleHide={this.close}
          title="Add your details to the board"
        >
          <AddPairingNoticeForm
            handleDidSubmit={this.handlePairingNoticeFormAdded}
          />
        </Modal>
        <InfoModal show={showInfo} handleHide={this.close} />
      </MainLayout>
    );
  }
}
App.propTypes = {
  hash: React.PropTypes.string.isRequired,
  replaceHash: React.PropTypes.func.isRequired,
};

export default withHash( App );
