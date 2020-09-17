const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Activity } = require("../models/activity");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User already registered.");

	user = new User(_.pick(req.body, [ "name", "email", "password" ]));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res
		.header("x-auth-token", token)
		.header("access-control-expose-headers", "x-auth-token")
		.send(_.pick(user, [ "_id", "name", "email" ]));
});

router.get('/likes', [ auth ], async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) return res.status(404).send("No user found");

	let { likedActivities } = user;

	res.send(likedActivities);
});

router.put('/update-likes', [ auth ], async (req, res) => {
	if (!req.body) return res.status(400);

	const { _id } = req.user;

	try {
		const user = await User.findById(_id);
	} catch (e) {
		return res.status(404).send("No user found.");
	}

	const { likedActivities } = user;
	const { activityId } = req.body;

	if (!likedActivities.includes(activityId)) {
		try {
			await Activity.findById(activityId);
		} catch (err) {
			return res.status(404).send("No activity found.");
		}
		likedActivities.push(activityId)
	} else {
		const index = likedActivities.indexOf(activityId);
		likedActivities.splice(index, 1);
	}

	user.likedActivities = likedActivities;
	try {
		user.save();
		res.send(user);
	} catch (e) {
		return res.status(404).send("No user found.");
	}

});

module.exports = router;
