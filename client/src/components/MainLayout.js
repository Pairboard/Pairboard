import React, { PropTypes } from 'react';
import IconButton from './IconButton';
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
      {children}
      <div className="App-footer">
        <IconButton
          className="add-button"
          size="small"
          icon="plus"
          onClick={handleOpenAdd}
        >
          Add
        </IconButton>
        <IconButton
          className="info-button"
          size="small"
          icon="info-sign"
          onClick={handleOpenInfo}
        >
          Info
        </IconButton>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
  handleOpenAdd: PropTypes.func.isRequired,
  handleOpenInfo: PropTypes.func.isRequired,
};
