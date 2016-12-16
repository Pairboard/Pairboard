'use strict';

require('./config/config.js');

const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;

let clientID, clientSecret, callbackURL;

const env = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV) {
  clientID = process.env.GH_CLIENT_ID;
  clientSecret = process.env.GH_CLIENT_SECRET;
  callbackURL = GH_CALLBACK_URL;
}

else if (env === 'development') {
  clientID = process.env.GH_LOCAL_ID;
  clientSecret = process.env.GH_LOCAL_SECRET;
  callbackURL = process.env.GH_LOCAL_URL;
}

passport.use(new GithubStrategy({
  clientID, clientSecret, callbackURL
},
  function(accessToken, refreshToken, profile, done) {
    // profile will contain user data
    // do business logic and call done(err, data);
    // Currently just log out in console
    console.log('******************************');
    console.log('Username:', profile.username);
    console.log('GitHub ID:', profile.id);
    console.log('******************************');
    return done(null, profile);
  }
));

module.exports = function() {
  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    console.log('deserializeUser');
    done(null, obj)
  });
};
