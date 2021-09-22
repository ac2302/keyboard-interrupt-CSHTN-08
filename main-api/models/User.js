const mongoose = require("mongoose");

lecturesSchema = new mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
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
		completedLessons: {
			type: [lecturesSchema],
			default: [],
		},
		created: {
			type: Date,
			default: Date.now,
		},
	})
);
