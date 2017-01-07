import React from 'react';
import { observer } from 'mobx-react';

import contactStore from '../../stores/contacts';
import ContactListComponent from './ContactList';

class ContactListConnected extends React.Component {
  componentWillMount() {
    contactStore.fetchAllContacts();
  }

  render() {
    return (
      <ContactListComponent
        contacts={contactStore.contacts}
        handleDeleteContact={( id ) => contactStore.deleteContact( id )}
      />
    );
  }
}

export default observer( ContactListConnected );
