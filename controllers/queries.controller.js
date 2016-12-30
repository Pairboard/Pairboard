var mongodb = require( 'mongodb' );
var ObjectId = require( 'mongodb' ).ObjectID;
var convertToMS = require( './convertToMS' );
var Post = require( '../models/post.model' );

module.exports = {

  // POST /add

  postAdd: ( req, res ) => {
    var username = req.body.username;
    var availableTime = req.body.availableTime;
    var setup = req.body.setup;
    var interests = req.body.interests;
    var endTime = convertToMS( availableTime );
    if ( !username || !availableTime ) return res.status( 400 ).send( { status: 400, error: 'Missing parameters.' } );
    // create a new post
    var newPost = Post( {
      postTime: new Date().getTime(),
      username: username,
      endTime: new Date().getTime() + endTime,
      setup: setup,
      interests: interests,
    } );
    newPost.save( err => {
      if ( err ) return handleError( err );
      res.redirect( 'http://pairboard.surge.sh' );
    } );
  },

  // GET /posts

  getPosts: ( req, res ) => {
    var now = new Date().getTime();
    Post.find(
      { endTime: { $gt: now } },
      ( err, posts ) => {
        if ( err ) return handleError( err );
        res.json( posts );
      } );
  },

  // POST /:id

  deletePost: ( req, res ) => {
    var id = req.params.id;
    if ( !ObjectId.isValid( id ) ) return res.status( 400 ).send( { error: 'Invalid id.' } );
    Post
      .findOneAndRemove( { '_id': id } )
      .exec( () => res.redirect( 'http://pairboard.surge.sh' ) );
  },

  // POST /posts
  addPost: ( req, res ) => {
    const { username, availableTime, setup, interests } = req.body;
    if ( !username || !availableTime ) return res.status( 400 ).send( { status: 400, error: 'Missing parameters.' } );
    if ( setup && typeof setup !== 'object' ) return res.status( 400 ).send( { status: 400, error: 'Setup should be an array.' } );
    if ( interests && typeof interests !== 'string' ) return res.status( 400 ).send( { status: 400, error: 'Interests should be a string.' } );
    const endTime = convertToMS( availableTime );
    const newPost = Post( {
      postTime: new Date().getTime(),
      endTime: new Date().getTime() + endTime,
      username, setup, interests,
    } );
    newPost.save( err => {
      if ( err ) res.status( 400 ).send( { status: 400, error: err } );
      res.status( 201 ).send( { status: 201, data: newPost } );
    } );
  },

  // DELETE /posts/:id
  deleteOnePost: ( req, res ) => {
    var id = req.params.id;
    if ( !ObjectId.isValid( id ) ) return res.status( 400 ).send( { error: 'Invalid id.' } );
    Post
      .findOneAndRemove( { '_id': id } )
      .then( ( data ) => {
        // the following is modified since transition to mongoose...maybe redundant?
        if ( !data ) return res.status( 404 ).send( { error: 'Record not found.' } ); // Is this necessary now? Doesnt seem to work...
        res.status( 204 ).send();
      } )
      .catch( err => {
        return res.status( 400 ).send( { error: 'Bad request.' } );
      } );
  },
};
