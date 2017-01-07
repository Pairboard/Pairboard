import React from 'react';
import ContactList from './ContactList';

// TODO 
//
// The message page should render a list of Contacts
// Each contact should be a link to a conversation thread

// This seems a bit redundant but one day we will have to change/add things to/introduce new css to this page
export default function MessagesPage() {
  return (
    <div>
      <h1>Message Contacts</h1>
      <ContactList />
    </div>
  );
}
