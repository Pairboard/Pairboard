const router = require( 'express' ).Router();
const messaging = require( '../controllers/messaging' );
const bodyParser = require( 'body-parser' );
const jsonParser = bodyParser.json();

/*
  / receives the sender and recipient username
  / opens a frontend route with Sender & Recip prepopulated,
  / also prepops the hidden conversationID
  / (a sha 1 of the participants in ABC order)
  */
router.post( '/new-message', jsonParser, messaging.createMessage );

/*
  / shows current user's 'mailbox' - a list of contacts
  / listed in order of most recent messages
  */
router.get( '/messages', messaging.getMessages );

/*
  / posts a message to the conversation thread
  */
router.post( '/messages', jsonParser, messaging.submitMessage );

/*
  / shows all messages with the same conversationID
  / listed most recent first
  */
router.get( '/messages/:id', messaging.getConversation );

/*
  / receives a query string in url
  / query might be to flag the post
  / or mark it as accepted / declined
  */
router.put( '/messages/:id', messaging.updateMessage );

/*
  / deletes message based on message id
  / (only sender can delete)
  */
router.delete( '/messages/:id', messaging.deleteOneMessage );

module.exports = router;
