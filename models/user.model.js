const mongoose = require( 'mongoose' );

let UserSchema = new mongoose.Schema( {
  username: String,
  displayName: String,
  avatar: String,
  gitId: Number,
  location: String,
  gender: String,
  languagesSpoken: Array,
  programmingLanguages: Array,
  unreadMessages: Number,
  contacts: Array,
  conversations: Array,
} );

module.exports = mongoose.model( 'User', UserSchema );
