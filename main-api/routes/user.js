const router = require("express").Router();

const authOnly = require("../middlewares/authOnly");
const authOnlyMiddleware = require("../middlewares/authOnly");
const User = require("../models/User");

router.get("/progress/by-id/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		return res.json({
			currentModule: user.currentModule,
			lastLesson: user.lastLesson,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/progress/by-username/:username", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		console.log(user);
		return res.json({
			currentModule: user.currentModule,
			lastLesson: user.lastLesson,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/progress/self", authOnlyMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.auth.user);
		return res.json({
			currentModule: user.currentModule,
			lastLesson: user.lastLesson,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
