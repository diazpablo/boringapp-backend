const Joi = require('joi');
const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const { typeSchema } = require('./type');

const activitySchema = new mongoose.Schema({
	activity: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		maxlength: 255
	},
	accessibility: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	type: {
		type: typeSchema,
		required: true
	},
	participants: {
		type: Number,
		required: true,
		min: 1,
		max: 100
	},
	price: {
		type: Number,
		required: true,
		min: 0,
		max: 100
	},
	imageUrl: String
});
activitySchema.plugin(random);

// Replicating ID to be consistent with the other db
activitySchema.virtual('id').get(function () {
	return this._id.toHexString();
});
activitySchema.set('toJSON', {
	virtuals: true
});


const Activity = mongoose.model('Activities', activitySchema);

function validateActivity(activity) {
	const schema = {
		activity: Joi.string().min(3).max(20).required(),
		accessibility: Joi.number().min(0).max(1).required(),
		typeId: Joi.objectId().required(),
		participants: Joi.number().min(1).max(100).required(),
		price: Joi.number().min(0).max(100).required(),
	};

	return Joi.validate(activity, schema);
}

exports.Activity = Activity;
exports.validate = validateActivity;