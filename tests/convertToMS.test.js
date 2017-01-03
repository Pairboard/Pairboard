const convertToMS = require( '../controllers/convertToMS' );
require( 'chai' ).should();

// NOTE: correct format /\d{1,2}:\d{2}/

describe( 'convertToMS', function () {
  // Checking invalid types: Number
  it( "Should return 'Invalid Date' when passed 0120", function () {
    convertToMS( 120 ).should.equal( 'Invalid Date' );
  } );
  // Checking invalid types: Boolean
  it( "Should return 'Invalid Date' when passed true", function () {
    convertToMS( true ).should.equal( 'Invalid Date' );
  } );
  // Checking invalid types: Array
  it( "Should return 'Invalid Date' when passed ['21:20']", function () {
    convertToMS( ['21:20'] ).should.equal( 'Invalid Date' );
  } );

  // Checking no parameter
  it( "Should return 'Invalid Date' when passed undefined", function () {
    convertToMS( undefined ).should.equal( 'Invalid Date' );
  } );

  // Checking for invalid formats
  it( "Should return 'Invalid Date' when passed '0120'", function () {
    convertToMS( '0120' ).should.equal( 'Invalid Date' );
  } );
  it( "Should return 'Invalid Date' when passed '1:200'", function () {
    convertToMS( '1:200' ).should.equal( 'Invalid Date' );
  } );
  it( "Should return 'Invalid Date' when passed '01:200'", function () {
    convertToMS( '01:200' ).should.equal( 'Invalid Date' );
  } );
  it( "Should return 'Invalid Date' when passed '011:200'", function () {
    convertToMS( '011:200' ).should.equal( 'Invalid Date' );
  } );
  it( "Should return 'Invalid Date' when passed ':20'", function () {
    convertToMS( ':20' ).should.equal( 'Invalid Date' );
  } );
  it( "Should return 'Invalid Date' when passed '11:'", function () {
    convertToMS( '11:' ).should.equal( 'Invalid Date' );
  } );

  // Checking valid formats
  it( "Should return 0 when passed '0:00'", function () {
    convertToMS( '0:00' ).should.equal( 0 );
  } );
  it( "Should return 0 when passed '00:00'", function () {
    convertToMS( '00:00' ).should.equal( 0 );
  } );
  it( "Should return 3660000 when passed '1:01'", function () {
    convertToMS( '1:01' ).should.equal( 3660000 );
  } );
  it( "Should return 79140000 when passed '21:59'", function () {
    convertToMS( '21:59' ).should.equal( 79140000 );
  } );
  it( "Should return 8100000 when passed '01:75'", function () {
    convertToMS( '01:75' ).should.equal( 8100000 );
  } );
  it( "Should return 8100000 when passed '1:75'", function () {
    convertToMS( '1:75' ).should.equal( 8100000 );
  } );
  it( "Should return 362340000 when passed '99:99'", function () {
    convertToMS( '99:99' ).should.equal( 362340000 );
  } );
} );
