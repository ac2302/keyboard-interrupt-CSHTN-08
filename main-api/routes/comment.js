const router = require("express").Router();

const authOnlyMiddleware = require("../middlewares/authOnly");

const User = require("../models/User");
const CommentSection = require("../models/CommentSection");

router.post("/:module/:lesson", authOnlyMiddleware, async (req, res) => {
	if (isNaN(req.params.module) || isNaN(req.params.lesson))
		return res.status(400).send("invalid lesson or module");
	if (!req.body.comment) return res.status(400).send("missing comment");

	const slug = `${req.params.module}-${req.params.lesson}`;

	user = await User.findById(req.auth.user);

	comment = {
		user: {
			isAdmin: user.isAdmin,
			userId: user._id,
			firstName: user.name.first,
			lastName: user.name.last,
			username: user.username,
		},
		text: req.body.comment,
	};

	const sections = await CommentSection.find({ slug: slug });

	if (sections.length != 0) {
		sections[0].comments.push(comment);
		sections[0].save();
		return res.send("done");
	} else {
		const section = new CommentSection({
			slug: slug,
			comments: [comment],
		});
		section.save();
		return res.send("done");
	}
});

router.get("/:module/:lesson", async (req, res) => {
	if (isNaN(req.params.module) || isNaN(req.params.lesson))
		return res.status(400).send("invalid lesson or module");

	const slug = `${req.params.module}-${req.params.lesson}`;

	const sections = await CommentSection.find({ slug: slug });

	if (sections.length != 0) {
		return res.json(sections[0].comments);
	} else {
		return res.json([]);
	}
});

router.post("/:module/:lesson/:id", authOnlyMiddleware, async (req, res) => {
	if (isNaN(req.params.module) || isNaN(req.params.lesson || !req.params.id))
		return res.status(400).send("invalid lesson, module or comment id");
	if (!req.body.comment) return res.status(400).send("missing comment");

	const slug = `${req.params.module}-${req.params.lesson}`;

	user = await User.findById(req.auth.user);

	const reply = {
		user: {
			isAdmin: user.isAdmin,
			userId: user._id,
			firstName: user.name.first,
			lastName: user.name.last,
			username: user.username,
		},
		text: req.body.comment,
	};

	const section = await CommentSection.findOne({ slug: slug });

	section.comments = section.comments.map((comment) => {
		if (comment._id == req.params.id) {
			comment.replies.push(reply);
			return comment;
		} else return comment;
	});

	await section.save();

	return res.send("done");
});

module.exports = router;
