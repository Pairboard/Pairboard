const router = require( 'express' ).Router();
const user = require( '../controllers/user.controller' );
const bodyParser = require( 'body-parser' );
const jsonParser = bodyParser.json();

/*
  / shows user with by id
  */
router.get( '/user/:id', user.getUser );

/*
  / receives profile details for update
  / only user can edit
  */
router.put( '/user/:id', jsonParser, user.updateUser );

/*
  / deletes user based on user id
  / (only user can delete)
  */
router.delete( '/user/:id', user.deleteUser );

module.exports = router;
