const router = require("express").Router();

const authOnlyMiddleware = require("../middlewares/authOnly");

const User = require("../models/User");
const Module = require("../models/Module");

router.post("/", authOnlyMiddleware, async (req, res) => {
	try {
		user = await User.findOne({ _id: req.auth.user });
		if (!user.isAdmin) return res.status(403).send();
	} catch {
		return res.status(401).send();
	}

	try {
		const newModule = new Module(req.body);
		return res.json(await newModule.save());
	} catch (err) {
		return res.json(err);
	}
});

module.exports = router;
