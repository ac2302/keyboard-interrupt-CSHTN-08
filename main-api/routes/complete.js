const router = require("express").Router();

const authOnlyMiddleware = require("../middlewares/authOnly");

const User = require("../models/User");
const Module = require("../models/Module");

router.post("/lesson", authOnlyMiddleware, async (req, res) => {
	if (!req.body.lecture) return res.status(400).send("missing lecture");
	if (isNaN(req.body.lecture.module) || isNaN(req.body.lecture.index))
		return res.status(400).send("invalid lecture");

	const { module, index } = req.body.lecture;

	try {
		user = await User.findOne({ _id: req.auth.user });
	} catch {
		return res.status(401).send();
	}

	if (user.currentModule < module)
		return res.status(400).send("lecture not unlocked");
	if (module == user.currentModule && index > user.lastLesson + 1)
		return res.status(400).send("lecture not unlocked");

	if (module == user.currentModule && index == user.lastLesson + 1) {
		user.lastLesson++;
		return res.json(await user.save());
	}

	res.send("no changes made");
});

module.exports = router;
