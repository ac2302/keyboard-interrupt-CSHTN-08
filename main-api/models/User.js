const mongoose = require("mongoose");

const lecturesSchema = new mongoose.Schema({
	module: {
		type: Number,
	},
	index: {
		type: Number,
	},
	time: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model(
	"User",
	new mongoose.Schema({
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			first: {
				type: String,
			},
			last: {
				type: String,
			},
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		currentModule: {
			type: Number,
			default: 0,
		},
		lastLesson: {
			type: Number,
			default: -1,
		},
		// completedLessons: {
		// 	type: [lecturesSchema],
		// 	default: [],
		// },
		created: {
			type: Date,
			default: Date.now,
		},
	})
);
