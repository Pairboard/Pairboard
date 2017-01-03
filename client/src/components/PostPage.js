import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';

import AddPairingNoticeForm from './AddPairingNoticeForm';

import './PostPage.css';

function PostPage( { router } ) {
  return ( // FIXME make me prettier
    <div className="post-page">
      <AddPairingNoticeForm
        className="post-form"
        handleDidSubmit={() => router.push( { pathname: '/' } )}
      />
    </div>
  );
}

PostPage.propTypes = {
  router: PropTypes.any.isRequired,
};

export default withRouter( PostPage );
