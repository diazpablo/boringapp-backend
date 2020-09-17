const Joi = require('joi');
const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 20
	}
});

// Replicating ID to be consistent with the other db
typeSchema.virtual('id').get(function () {
	return this._id.toHexString();
});
typeSchema.set('toJSON', {
	virtuals: true
});

const Type = mongoose.model('Type', typeSchema);

function validateType(type) {
	const schema = {
		name: Joi.string().min(1).max(20).required()
	};

	return Joi.validate(type, schema);
}

exports.typeSchema = typeSchema;
exports.Type = Type;
exports.validate = validateType;