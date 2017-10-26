import React from 'react';
import { observer } from 'mobx-react';

import MessageStore from '../../stores/messages';
import MessageListComponent from './MessageList';

import authStore from '../../stores/auth';

class MessageListConnected extends React.Component {
  componentWillMount() {
    MessageStore.fetchAllMessages();
  }

  render() {
    return (
      <MessageListComponent
        username={authStore.username}
        messages={MessageStore.messages}
      />
    );
  }
}

export default observer( MessageListConnected );
