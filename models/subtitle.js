var mongoose = require('mongoose');


// Article schema
var subtitleSchema = mongoose.Schema({
	num:{
		type: String,
		required: true
	},
	episode:{
		type: String,
		required: true
	},
	start:{
		type: String,
		required: true
	},
	end:{
		type: String,
		required: true
	},
	text:{
		type: String,
		required: true
	}
});

var Subtitle = module.exports = mongoose.model('Subtitle', subtitleSchema);