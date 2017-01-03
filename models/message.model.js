const mongoose = require( 'mongoose' );

let MessageSchema = new mongoose.Schema( {
  toUser: { type: String, required: true },
  fromUser: { type: String, required: true },
  conversationId: { type: String, required: true },
  timeStamp: { type: String, required: true },
  messageBody: { type: String, required: true },
  read: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  flag: { type: Boolean, default: false },
} );

module.exports = mongoose.model( 'Message', MessageSchema );
