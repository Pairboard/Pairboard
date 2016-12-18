var mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var PostSchema = new Schema( {
  postTime: { type: Number, required: true },
  username: { type: String, required: true },
  endTime: { type: Number, required: true },
  setup: { type: Schema.Types.Mixed, default: [] },
  interests: { type: String, default: '' },
} );

module.exports = mongoose.model( 'Post', PostSchema );
