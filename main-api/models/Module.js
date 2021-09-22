const mongoose = require("mongoose");

const lecturesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	videoUrl: {
		type: String,
	},
});

const questionSchema = new mongoose.Schema({
	question: {
		type: String,
	},
	options: [
		{
			type: String,
		},
	],
	correctOption: {
		type: Number,
	},
});

module.exports = mongoose.model(
	"Module",
	new mongoose.Schema({
		index: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		duration: {
			type: Number,
			required: true,
		},
		lectures: {
			type: [lecturesSchema],
		},
		quiz: {
			questions: {
				type: [questionSchema],
			},
		},
	})
);
