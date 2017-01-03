const request = require( 'supertest' );
const expect = require( 'expect' );

const app = require( './../server' );
const { posts, populatePosts } = require( './seed/seed' );

describe( 'GET /posts', () => {
  beforeEach( populatePosts );

  it( 'should get all posts with endTime > timeNow', ( done ) => {
    request( app )
      .get( '/api/v1/posts' )
      .expect( 200 )
      .expect( res => {
        expect( res.body.length ).toBe( 2 );
        expect( res.body[0].username ).toBe( posts[0].username );
        expect( res.body[0].setup ).toBeA( 'array' );
        expect( res.body[1].endTime ).toBe( posts[1].endTime );
        expect( res.body[2] ).toNotExist();
      } )
      .end( done );
  } );
} );
