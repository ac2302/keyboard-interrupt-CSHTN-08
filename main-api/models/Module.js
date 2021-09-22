const mongoose = require("mongoose");

module.exports = mongoose.model(
	"Module",
	new mongoose.Schema({
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
		lectures: [
			{
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
			},
		],
	})
);
