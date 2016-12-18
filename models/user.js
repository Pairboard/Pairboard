const mongoose = require( 'mongoose' );

let UserSchema = new mongoose.Schema( {
  username: String,
  gitId: Number,
} );

module.exports = mongoose.model( 'User', UserSchema );
