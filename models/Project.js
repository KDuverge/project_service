const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const projectSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image_url: {
		type: String,
		required: true
	},
	github_link: {
		type: String,
		required: true
	},
	website_link: {
		type: String,
		required: false
	},
	tags: {
		type: Array,
		required: false,
		default: []
	}
});

module.exports = mongoose.model('Project', projectSchema);
