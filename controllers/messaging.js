const ObjectId = require( 'mongodb' ).ObjectID;
const Message = require( '../models/message.model' );
const createConversationId = require( './createConversationId' );

module.exports = {


  createMessage: ( req, res ) => {
  /*
  / receives the sender and recipient username
  / opens a frontend route with Sender & Recip prepopulated,
  / also prepops the hidden conversationID
  / (a sha 1 of the participants in ABC order)
  */
    const sender = req.body.username;
    const recipient = req.body.poster;
    const conversationID = createConversationId( sender, recipient );
    res.status( 200 ).send( {
      sender,
      recipient,
      conversationID,
    } );
  },

  getMessages: ( req, res ) => {
  /*
  / shows current user's 'mailbox' - a list of contacts
  / listed in order of most recent messages
  */
  },

  getConversation: ( req, res ) => {
  /*
  / shows all messages with the same conversationID
  / listed most recent first
  */
  },

  submitMessage: ( req, res ) => {
  /*
  / posts a message to the conversation thread
  */
  },

  updateMessage: ( req, res ) => {
  /*
  / receives a query string in url
  / query might be to flag the post
  / or mark it as accepted / declined
  */
  },

  deleteOneMessage: ( req, res ) => {
  /*
  / deletes message based on message id
  / (only sender can delete)
  */
  },

};
