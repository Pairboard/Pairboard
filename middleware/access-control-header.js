// Add headers
// Source: http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue

module.exports = function (req, res, next) {

  // Currently allows access from any origin
  res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:3000' );

  // Request methods you wish to allow
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, DELETE' );

  // Request headers you wish to allow
  res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader( 'Access-Control-Allow-Credentials', true );

  // Pass to next layer of middleware
  next();
};
