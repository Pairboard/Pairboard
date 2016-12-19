import React, { PropTypes } from 'react';

import { Modal as BootstrapModal } from 'react-bootstrap';

export default function Modal( { children, show, handleHide, title, forceOpen = false, ...props } ) {
  let hide = forceOpen ? noop : handleHide;

  return (
    <BootstrapModal show={show} onHide={hide}>
      <BootstrapModal.Header closeButton={!forceOpen}>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func,
  title: PropTypes.node.isRequired,
  forceOpen: PropTypes.bool,
};

function noop() {
  // :)
}
