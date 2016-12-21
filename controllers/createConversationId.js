const sha1 = require( 'sha1' );

const createConversationId = ( sender, recipient ) => {
  let array = Array.from( arguments );
  return sha1( array.sort().join() );
};

module.exports = createConversationId;
