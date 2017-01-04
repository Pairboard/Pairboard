import React from 'react';
import { observer } from 'mobx-react';

import MessageStore from '../../stores/messages';
import MessageListComponent from './MessageList';

class MessageListConnected extends React.Component {
  componentWillMount() {
    MessageStore.fetchAllMessages();
  }

  render() {
    return (
      <MessageListComponent
        messages={MessageStore.messages}
      />
    );
  }
}

export default observer( MessageListConnected );
