import React from 'react';
import { observer } from 'mobx-react';
import noticeStore from '../../stores/notices';

import PairingNoticeListComponent from './PairingNoticeList';

export default observer( class PairingNoticeListContainer extends React.Component {
  componentWillMount() {
    noticeStore.fetchAllNotices();
  }

  render() {
    return (
      <PairingNoticeListComponent
        notices={noticeStore.notices}
        handleDeleteNotice={( id ) => noticeStore.deleteNotice( id )}
      />
    );
  }
} );
