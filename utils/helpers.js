const path = require('path');
const multer = require("multer");
const fs = require("fs");

const imageFilter = function (req, file, cb) {
	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
		req.fileValidationError = 'Only image files are allowed!';
		return cb(new Error('Only image files are allowed!'), false);
	}
	cb(null, true);
};
exports.imageFilter = imageFilter;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		var dir = './tmp';
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});

exports.storage = storage;