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

module.exports = router;
