const request = require( 'supertest' );
const expect = require( 'expect' );
const { ObjectID } = require( 'mongodb' );

const app = require( './../server' );
const Post = require( './../models/post.model' );
const { posts, populatePosts } = require( './seed/seed' );

describe( 'POST /posts', () => {
  beforeEach( populatePosts );

  it( 'should create a new post', ( done ) => {
    const newPost = {
      username: 'Gauja',
      availableTime: '1:00',
    };

    request( app )
      .post( '/api/v1/posts' )
      .send( newPost )
      .expect( 201 )
      .expect( res => {
        // Check returned data
        expect( res.body ).toBeA( 'object' );
        expect( res.body.status ).toBe( 201 );
        expect( res.body.data ).toExist();
        expect( res.body.data.username ).toBe( newPost.username );
        expect( res.body.data.endTime - res.body.data.postTime ).toBe( 3600000 );

        // Check if default data created
        expect( res.body.data.setup ).toExist();
        expect( res.body.data.setup ).toBeA( 'array' );
        expect( res.body.data.setup.length ).toBe( 0 );
        expect( res.body.data.interests ).toBe( '' );
        expect( res.body.data.interests ).toBeA( 'string' );
        expect( res.body.data.interests.length ).toBe( 0 );
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 4 );
        } ).catch( e => done( e ) );

        Post.find( { username: newPost.username } ).then( res => {
          expect( res[0].username ).toBe( newPost.username );
          done();
        } ).catch( e => done( e ) );
      } );
  } );

  it( 'should respond with 400 if availableTime missing', ( done ) => {
    const newPost = {
      username: 'Venta',
    };

    request( app )
      .post( '/api/v1/posts' )
      .send( newPost )
      .expect( 400 )
      .expect( res => {
        // Check response
        expect( res.body.status ).toExist();
        expect( res.body.status ).toBe( 400 );
        expect( res.body.error ).toExist();
        expect( res.body.error ).toBeA( 'string' );
        expect( res.body.data ).toNotExist();
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 3 );
        } ).catch( e => done( e ) );
        Post.find( { username: newPost.username } ).then( res => {
          expect( res.length ).toBe( 0 );
          done();
        } ).catch( e => done( e ) );
      } );
  } );

  it( 'should respond with 400 if username missing', ( done ) => {
    const newPost = {
      availableTime: '1:00',
    };

    request( app )
      .post( '/api/v1/posts' )
      .send( newPost )
      .expect( 400 )
      .expect( res => {
        // Check response
        expect( res.body.status ).toExist();
        expect( res.body.status ).toBe( 400 );
        expect( res.body.error ).toExist();
        expect( res.body.error ).toBeA( 'string' );
        expect( res.body.data ).toNotExist();
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 3 );
        } ).catch( e => done( e ) );
        Post.find( { availableTime: newPost.availableTime } ).then( res => {
          expect( res.length ).toBe( 0 );
          done();
        } ).catch( e => done( e ) );
      } );
  } );

  it( 'should respond with 400 if setup is not an array', ( done ) => {
    const newPost = {
      username: 'Gauja',
      availableTime: '1:00',
      setup: 123,
    };

    request( app )
      .post( '/api/v1/posts' )
      .send( newPost )
      .expect( 400 )
      .expect( res => {
        // Check response
        expect( res.body.status ).toExist();
        expect( res.body.status ).toBe( 400 );
        expect( res.body.error ).toExist();
        expect( res.body.error ).toBeA( 'string' );
        expect( res.body.data ).toNotExist();
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 3 );
        } ).catch( e => done( e ) );
        Post.find( { username: newPost.username } ).then( res => {
          expect( res.length ).toBe( 0 );
          done();
        } ).catch( e => done( e ) );
      } );
  } );

  it( 'should respond with 400 if interests is not a string', ( done ) => {
    const newPost = {
      username: 'Gauja',
      availableTime: '1:00',
      interests: 123,
    };

    request( app )
      .post( '/api/v1/posts' )
      .send( newPost )
      .expect( 400 )
      .expect( res => {
        // Check response
        expect( res.body.status ).toExist();
        expect( res.body.status ).toBe( 400 );
        expect( res.body.error ).toExist();
        expect( res.body.error ).toBeA( 'string' );
        expect( res.body.data ).toNotExist();
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 3 );
        } ).catch( e => done( e ) );
        Post.find( { username: newPost.username } ).then( res => {
          expect( res.length ).toBe( 0 );
          done();
        } ).catch( e => done( e ) );
      } );
  } );
} );

describe( 'DELETE /posts/:id', () => {
  beforeEach( populatePosts );

  it( 'should delete one post', ( done ) => {
    const deletePost = {
      id: posts[0]._id,
    };

    request( app )
      .delete( `/api/v1/posts/${deletePost.id}` )
      .send( deletePost )
      .expect( 204 )
      .expect( res => {
        // Check returned data
        expect( res.body ).toBeA( 'object' );
        expect( res.body ).toEqual( {} );
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 2 );
          done();
        } ).catch( e => done( e ) );
      } );
  } );

  it( 'should respond with 400 if id is invalid', ( done ) => {
    const deletePost = {
      id: 123,
    };

    request( app )
      .delete( `/api/v1/posts/${deletePost.id}` )
      .send( deletePost )
      .expect( 400 )
      .expect( res => {
        // Check returned data
        expect( res.body ).toBeA( 'object' );
        expect( res.body.error ).toExist();
        expect( res.body.error ).toBeA( 'string' );
        expect( res.body.data ).toNotExist();
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 3 );
          done();
        } ).catch( e => done( e ) );
      } );
  } );

  it( 'should respond with 404 if id is not found', ( done ) => {
    const deletePost = {
      id: ObjectID(),
    };

    request( app )
      .delete( `/api/v1/posts/${deletePost.id}` )
      .send( deletePost )
      .expect( 404 )
      .expect( res => {
        // Check returned data
        expect( res.body ).toBeA( 'object' );
        expect( res.body.error ).toExist();
        expect( res.body.error ).toBeA( 'string' );
        expect( res.body.data ).toNotExist();
      } )
      .end( ( err, res ) => {
        if ( err ) return done( err );
        // Check db
        Post.find().then( res => {
          expect( res.length ).toBe( 3 );
          done();
        } ).catch( e => done( e ) );
      } );
  } );
} );
