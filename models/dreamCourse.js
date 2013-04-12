var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ship's log schema
var dreamCourseSchema = new Schema({
	slug : { type: String, lowercase: true, required: true, unique: true },
	name : { type: String, required: true},
	description : String,
	themes : [String],
	skills : [String],
	ayes : Number,
	genius : [String],
	date : Date,
	proj_or_theory : String
});


// export 'dreamCourse' model
module.exports = mongoose.model('dreamCourse',dreamCourseSchema);