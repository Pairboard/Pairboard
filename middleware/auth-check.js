const jwt = require( 'jsonwebtoken' );

module.exports = () => {
  return ( req, res, next ) => {
    if ( !req.cookies.token ) return res.sendStatus( 401 );
    jwt.verify( req.cookies.token, 'super_secret', ( err, decoded ) => {
      if ( err ) return res.sendStatus( 401 );
      return next();
    } );
  };
};
