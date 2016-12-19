import React, { PropTypes } from 'react';

import Modal from './Modal';
import ModalForm from './ModalForm';

export default function AddModal( { show, handleHide, handleSubmit, handleChange, ...fields } ) {
  return (
    <Modal
      show={show}
      handleHide={handleHide}
      title="Add your details to the board"
    >
      <ModalForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        {...fields}
      />
    </Modal>
  );
}

AddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  availableTime: PropTypes.string.isRequired,
  interests: PropTypes.string.isRequired,
  modalSelections: PropTypes.arrayOf( PropTypes.string ).isRequired,
};
