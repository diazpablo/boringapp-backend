const { Type } = require("../models/type");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const types = await Type.find()
		.sort("name");

	res.send(types);
});

module.exports = router;
