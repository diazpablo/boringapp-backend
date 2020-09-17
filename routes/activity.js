const { Activity, validate } = require("../models/activity");
const { Type } = require("../models/type");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const { imageFilter, storage } = require("../utils/helpers");
const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary');
const config = require('config');

cloudinary.config({
	cloud_name: config.get('cloudinary_name'),
	api_key: config.get('cloudinary_api_key'),
	api_secret: config.get('cloudinary_api_secret'),
});

/**
 * Get a Random Activity
 * If query param type is given it will returns all
 * the activities from that type
 */
router.get("/", async (req, res) => {
	if (req.query.type) {
		const type = await Type.findOne({ name: req.query.type }, (err, type) => type);
		if (!type) return res.status(400).send("Invalid type.");

		// Find all activities from type
		const activities = await Activity.find({ type }, (err, activities) => activities)
		res.send(activities);
	}

	// Get random activity
	const conditions = {};
	const fields = {};
	const options = {}
	return Activity.findOneRandom(conditions, fields, options, (err, activity) => {
		if (err) return res.status(500).send(err.message);
		return res.send([ activity ]);
	})
})
;

router.get("/list", async (req, res) => {
	const activities = await Activity.find();
	return res.send(activities);
});

router.get("/list/:randomLimit", async (req, res) => {
	if (!req.params.randomLimit) return res.status(400);

	const conditions = {};
	const fields = {};
	const options = { limit: req.params.randomLimit };

	return Activity.findRandom(conditions, fields, options, (err, randomActivities) => {
		if (err) return res.status(500).send(err.message);
		return res.send(randomActivities);
	});
});


router.post("/", [ auth ], multer({ storage, fileFilter: imageFilter }).single('image'), async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const type = await Type.findById(req.body.typeId);
	if (!type) return res.status(400).send("Invalid type.");

	if (req.fileValidationError) {
		return res.send(req.fileValidationError);
	} else if (!req.file) {
		return res.send('Please select an image to upload');
	}
	const image = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'boring-app' });

	fs.unlinkSync(req.file.path);

	const activity = new Activity({
		activity: req.body.activity,
		accessibility: req.body.accessibility,
		participants: req.body.participants,
		price: req.body.price,
		imageUrl: image.secure_url,
		type: {
			_id: type._id,
			name: type.name
		}
	});
	await activity.save();

	res.send(activity);
});

module.exports = router;
