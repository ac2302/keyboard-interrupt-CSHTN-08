const router = require("express").Router();

const Module = require("../models/Module");

router.get("/", async (req, res) => {
	return res.json(await Module.find().sort({ index: 1 }));
});

module.exports = router;
