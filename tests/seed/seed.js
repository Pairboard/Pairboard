const { ObjectID } = require( 'mongodb' );

const Post = require( './../../models/post.model' );

const postOneId = new ObjectID();
const postTwoId = new ObjectID();
const postThreeId = new ObjectID();

const timeNow = new Date().getTime();

const posts = [{
  '_id': postOneId,
  'postTime': timeNow,
  'endTime': timeNow + 36000,
  'username': 'Superuser',
  'setup': [],
  'interests': 'Fly in the sky',
},
{
  '_id': postTwoId,
  'postTime': timeNow,
  'endTime': timeNow + 72000,
  'username': 'Camperbot',
  'setup': [
    'Google Hangouts',
    'Snail Mail',
  ],
  'interests': 'Coding, Knitting',
}, {
  '_id': postThreeId,
  'postTime': timeNow - 3600,
  'endTime': timeNow - 1,
  'username': 'Camperbot',
  'setup': [
    'Google Hangouts',
    'Skype',
  ],
  'interests': 'Fun Fun Function',
}];

const populatePosts = ( done ) => {
  Post.remove( {} ).then( () => {
    const postOne = new Post( posts[0] ).save();
    const postTwo = new Post( posts[1] ).save();
    const postThree = new Post( posts[2] ).save();

    return Promise.all( [postOne, postTwo, postThree] );
  } ).then( () => done() );
};

module.exports = { posts, populatePosts };
