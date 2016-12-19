const mongoose = require( 'mongoose' );

let MessageSchema = new mongoose.Schema( {
  toUser: String,
  fromUser: String,
  conversationId: String,
  timeStamp: String,
  messageBody: String,
  read: Boolean,
  status: String,
  flag: String,
} );

module.exports = mongoose.model( 'Message', MessageSchema );
