const mongoose = require( 'mongoose' );

let UserSchema = new mongoose.Schema( {
  username: String,
  displayName: String,
  avatar: String,
  gitId: Number,
  location: String,
  aboutMe: String,
  languagesSpoken: Array,
  programmingLanguages: Array,
  unreadMessages: Number,
  contacts: Array, // should be obj with image = { username: jacksonbatestest, avatar: blah... }
  conversations: Array,
} );

module.exports = mongoose.model( 'User', UserSchema );
