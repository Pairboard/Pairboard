import React, { PropTypes } from 'react';
import Button from './Button';
import FccIcon from './FccIcon';

export default function MainLayout( { children, handleOpenAdd, handleOpenInfo, ...props } ) {
  return (
    <div className="App" {...props}>
      <div className="App-header">
        <p>
          <span className="header-text pull-left">
            FreeCodeCamp <FccIcon /> Remote Pairing Noticeboard
          </span>
        </p>
      </div>
      <div className="App-body">
        {children}
      </div>
      <div className="App-footer">
        <Button
          className="add-button"
          bsSize="small"
          icon="plus"
          onClick={handleOpenAdd}
        >
          Add
        </Button>
        <Button
          className="info-button"
          bsSize="small"
          icon="info-sign"
          onClick={handleOpenInfo}
        >
          Info
        </Button>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
  handleOpenAdd: PropTypes.func.isRequired,
  handleOpenInfo: PropTypes.func.isRequired,
};
