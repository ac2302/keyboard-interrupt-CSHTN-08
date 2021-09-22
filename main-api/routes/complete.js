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
		user = await User.findById(req.auth.user);
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

router.post("/quiz/:module", authOnlyMiddleware, async (req, res) => {
	if (isNaN(req.params.module))
		return res.status(400).send("missing or invalid module");

	const currentModule = req.params.module;

	try {
		user = await User.findOne({ _id: req.auth.user });
	} catch {
		return res.status(401).send();
	}

	try {
		if (user.currentModule == currentModule) {
			try {
				const mod = await Module.findOne({ index: currentModule });
			} catch {
				res.status(404).send("module not found");
			}

			if (mod.quiz.questions.length != req.body.answers.length)
				return res.status(400).send("invalid length of answers[]");

			const result = [];
			let correct = 0;
			for (let i = 0; i < mod.quiz.questions.length; i++) {
				if (mod.quiz.questions[i].correctOption == req.body.answers[i]) {
					correct++;
					result.push({ correct: true });
				} else
					result.push({
						correct: false,
						corrected: mod.quiz.questions[i].correctOption,
					});
			}

			pass = false;
			if (correct >= mod.quiz.questions.length * (2 / 3)) pass = true;

			if (pass) {
				user.currentModule++;
				user.lastLesson = -1;
				await user.save();
			}

			return res.json({ pass, result });
		}
	} catch (err) {
		return res.status(500).json(err);
	}

	res.status(400).send("irrelevant module");
});

module.exports = router;
