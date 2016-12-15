require( './config/config.js' );

var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' );
io = io.listen( server );
var mongoose = require( 'mongoose' );
var mongodb = require( 'mongodb' );
var mongo = mongodb.MongoClient;
const passport = require('passport');
const session = require('express-session');
const passportSetup = require('./passport');
const cookieParser = require('cookie-parser');

passportSetup();

var Post = require( './models/post.model' );

var url = process.env.MONGODB_URI;

mongoose.connect( url );

var db = mongoose.connection;
db.on( 'error', console.error.bind( console, 'connection error:' ));
if ( !process.env.NODE_ENV === 'test' ) {
  db.once( 'open', function() {
    console.log( 'DB Connected' );
  })
};

// Authentication checking middleware
const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return res.sendStatus(401);
  next();
}

// Disable x-powered-by header which shows what software server is running (express);
app.disable('x-powered-by');

app.use( require( './middleware/access-control-header' ));

app.use(cookieParser());
app.use(session({
  secret: 'i4i98jgfldoo0dfdiwiid0g0g', // :)
  resave: true,
  saveUninitialized: true
}));

// These next both are invoked on each request
// This calls serializeUser
app.use(passport.initialize());
// Calls deserializeUser on each request and populates req.user
app.use(passport.session());

// this will start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:3000')
  }
);

// Middleware for routes
app.use( '/api/v1', require( './routes/api-v1' ));
app.use( '/api/v2', require( './routes/api-v2'));



app.set( 'port', ( process.env.PORT || 3001 ));
server.listen( app.get( 'port' ), function() {
  if ( !process.env.NODE_ENV === 'test') {
    console.log( 'Node app is running on port ', app.get( 'port' ) );
  }
});

io.sockets.on( 'connection', socket => {
    console.log( 'client connected', socket.id );
    socket.on( 'post', data => {
      socket.broadcast.emit( 'post', { post: data });
    });
    socket.on( 'delete', data => {
      console.log( 'deleting: ', data);
      socket.broadcast.emit( 'delete', { delete: data });
    });
});

module.exports = app;
