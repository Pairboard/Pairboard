require( 'dotenv' ).config();
const passport = require( 'passport' );
const GithubStrategy = require( 'passport-github2' ).Strategy;
// const jwt = require( 'jsonwebtoken' );

const User = require( './models/user.model' );

module.exports = passport.use( new GithubStrategy( {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
},
function ( accessToken, refreshToken, profile, done ) {
  User.findOne( { gitId: profile.id } ).then( user => {
    if ( !user ) {
      const newUser = new User( {
        gitId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        avatar: profile._json.avatar_url,
        location: profile._json.location,
      } );
      newUser.save().then( ( user ) => { return done( null, user ); } );
    } else {
      return done( null, user );
    }
  } ).catch( e => console.log( e ) );
} ) );
