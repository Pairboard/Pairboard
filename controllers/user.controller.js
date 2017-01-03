const User = require( '../models/user.model' );

module.exports = {

  getUser: ( req, res ) => {
  /*
  / shows user by id (param)
  */
    const id = req.params.id;
    User.findById( id, ( err, data ) => {
      if ( err ) return err;
      res.status( 200 ).json( data );
    } );
  },

  updateUser: ( req, res ) => {
  /*
  / receives profile details as body json for update
  / only user can edit
  */
    const id = req.params.id;
    const { username, displayName, location, aboutMe, languagesSpoken, programmingLanguages } = req.body;
    const updateUser = User( {
      username, displayName, location, aboutMe, languagesSpoken, programmingLanguages,
    } );
    User.findByIdAndUpdate( id, updateUser, ( err, data ) => {
      if ( err ) return err;
      res.status( 200 ).json( data );
    } );
  },

  deleteUser: ( req, res ) => {
  /*
  / deletes user based on user id
  / (only user can delete)
  */
    const id = req.params.id;
    User.findByIdAndRemove( id, ( err, data ) => {
      if ( err ) return err;
      res.status( 204 ).send( { message: 'User deleted' } );
    } );
  },

};
