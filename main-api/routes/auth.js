const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/register", async (req, res) => {
	if (req.body.user) {
		if (
			req.body.user.username &&
			req.body.user.password &&
			req.body.user.email
		) {
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

router.post("/login", async (req, res) => {
	if (req.body.user) {
		if (req.body.user.username && req.body.user.password) {
			const { username, password } = req.body.user;
			// getting user form db
			try {
				const currentUser = await User.findOne({ username });
				if (!currentUser) {
					res.statusCode = 400;
					res.json({ message: "incorrect username or password" });
				} else {
					if (await bcrypt.compare(password, currentUser.password)) {
						// signing and sending token
						const token = jwt.sign(
							{ _id: currentUser._id },
							process.env.TOKEN_SECRET
						);
						res.header("auth-token", token);
						res.json({ loggedIn: true });
					} else {
						res.statusCode = 400;
						res.json({ message: "incorrect username or password" });
					}
				}
			} catch {
				res.statusCode = 500;
				res.json({ message: "database error" });
			}
		} else {
			res.statusCode = 400;
			res.json({ message: "missing username and/or password" });
		}
	} else {
		res.statusCode = 400;
		res.json({ message: "missing user in body" });
	}
});

module.exports = router;
