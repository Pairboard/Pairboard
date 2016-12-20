import React from 'react';

import CamperList from './CamperList';
import InfoModal from './InfoModal';
import Modal from './Modal';
import AddPairingNoticeForm from './AddPairingNoticeForm';

const AppBody = props => {
  return (
    <div className="App-body">
      <CamperList campers={props.campers} handleDelete={props.handleDelete}/>
      <Modal
        show={props.showModal}
        handleHide={props.close}
        title="Add your details to the board"
      >
        <AddPairingNoticeForm
          handleSubmit={props.handleSubmit}
          username={props.username}
          availableTime={props.availableTime}
          pairingTechs={props.modalSelections}
          interests={props.interests}
          handleFieldChange={props.handleChange}
        />
      </Modal>
      <InfoModal show={props.showInfo} handleHide={props.close}/>
    </div>
  );
};

export default AppBody;
