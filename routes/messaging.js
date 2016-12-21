const router = require( 'express' ).Router();
const messaging = require( '../controllers/messaging' );
const bodyParser = require( 'body-parser' );
const jsonParser = bodyParser.json();

router.post( '/new-message', jsonParser, messaging.createMessage );

router.get( '/messages', messaging.getMessages );

router.post( '/messages', jsonParser, messaging.submitMessage );

router.get( '/messages/:id', messaging.getConversation );

router.put( '/messages/:id', messaging.updateMessage );

router.delete( '/messages/:id', messaging.deleteOneMessage );

module.exports = router;
