import React, { Component } from 'react';

// Components
import MainLayout from './components/MainLayout';
import Modal from './components/Modal';
import PairingNoticeList from './components/PairingNoticeList';
import Info from './components/Info';
import AddPairingNoticeForm from './components/AddPairingNoticeForm';

import './App.css';
import { withHash } from './History';

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

  render() {
    let showModal = this.props.hash === '#add';
    let showInfo = this.props.hash === '#info';
    return (
      <MainLayout
        handleOpenAdd={this.open}
        handleOpenInfo={this.openInfo}
      >
        <PairingNoticeList />
        <Modal
          show={showModal}
          handleHide={this.close}
          title="Add your details to the board"
        >
          <AddPairingNoticeForm
            handleDidSubmit={() => this.close()}
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
