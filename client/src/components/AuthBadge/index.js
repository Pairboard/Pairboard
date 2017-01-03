import React from 'react';
import { observer } from 'mobx-react';

import AuthBadgeComponent from './AuthBadge';
import authStore from '../../stores/auth';

class AuthBadgeConnected extends React.Component {
  componentDidMount() {
    authStore.checkAuth();
  }
  render() {
    return (
      <AuthBadgeComponent
        pending={authStore.pending}
        username={authStore.username}
      />
    );
  }
}

export default observer( AuthBadgeConnected );
