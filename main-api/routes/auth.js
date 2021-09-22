const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/register", async (req, res) => {
	if (req.body.user) {
		if (req.body.user.username && req.body.user.password && req.body.user.email) {
			const { username, password } = req.body.user;
			// checking if user exists
			if (await User.findOne({ username })) {
				res.statusCode = 400;
				res.json({ message: "username is taken" });
			} else {
				const salt = await bcrypt.genSalt(10);
				const hashedPass = await bcrypt.hash(password, salt);
				const newUser = new User({
					username,
					password: hashedPass,
					email: req.body.user.email,
					name: {
						first: req.body.user.firstName,
						last: req.body.user.lastName,
					},
					isAdmin: false,
				});

				newUser.save((err) => {
					if (err) {
						res.status = 500;
						res.json({ message: "database error" });
					} else res.json({ created: true, created: newUser });
				});
			}
		} else {
			res.statusCode = 400;
			res.json({ message: "missing username, email and/or password" });
			// return;
		}
	} else {
		res.statusCode = 400;
		res.json({ message: "missing user in body" });
	}
});

module.exports = router;
