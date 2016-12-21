import React, { Component } from 'react';
import io from 'socket.io-client';

// Components
import MainLayout from './components/MainLayout';
import Modal from './components/Modal';
import PairingNoticeList from './containers/PairingNoticeList';
import Info from './components/Info';
import AddPairingNoticeForm from './containers/AddPairingNoticeForm';

import './App.css';
import { withHash } from './History';
import server from './config/config';

class App extends Component {

  constructor() {
    super();

    this.close = () => {
      this.props.replaceHash( '' );
    };

    this.open = () => {
      this.props.replaceHash( '#add' );
    };

    this.openInfo = () => {
      this.props.replaceHash( '#info' );
    };
  }

  componentWillMount() {
    this.socket = io( server );
  }

  render() {
    let showModal = this.props.hash === '#add';
    let showInfo = this.props.hash === '#info';
    return (
      <MainLayout
        handleOpenAdd={this.open}
        handleOpenInfo={this.openInfo}
      >
        <PairingNoticeList socket={this.socket} />
        <Modal
          show={showModal}
          handleHide={this.close}
          title="Add your details to the board"
        >
          <AddPairingNoticeForm
            handleDidSubmit={() => this.close()}
            socket={this.socket}
          />
        </Modal>
        <Modal
          show={showInfo}
          handleHide={this.close}
          title="About"
        >
          <Info />
        </Modal>
      </MainLayout>
    );
  }
}
App.propTypes = {
  hash: React.PropTypes.string.isRequired,
  replaceHash: React.PropTypes.func.isRequired,
};

export default withHash( App );
