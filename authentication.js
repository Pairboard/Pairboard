const passport = require( 'passport' );
const GithubStrategy = require( 'passport-github2' ).Strategy;
const jwt = require( 'jsonwebtoken' );

const User = require( './models/user.model' );
const config = require( './oauth' );

module.exports = passport.use( new GithubStrategy( {
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL,
},
function ( accessToken, refreshToken, profile, done ) {
  User.findOne( { gitId: profile.id } ).then( user => {
    if ( !user ) {
      const newUser = new User( {
        gitId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        avatar: profile._json.avatar_URL,
        location: profile._json.location,
      } );
      newUser.save().then( ( user ) => { return done( null, user ); } );
    } else {
      return done( null, user );
    }
  } ).catch( e => console.log( e ) );
} ) );
