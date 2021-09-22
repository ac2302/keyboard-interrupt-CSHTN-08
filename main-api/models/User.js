const mongoose = require("mongoose");

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
			default: [
				{
					id: {
						type: mongoose.Schema.Types.ObjectId,
						completed: {
							type: Date,
							default: Date.now,
						},
					},
				},
			],
		},
		created: {
			type: Date,
			default: Date.now,
		},
	})
);
