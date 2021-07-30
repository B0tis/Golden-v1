const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	userID: { type: String, require: true, unique: true },
	userName: { type: String, require: true },
	coins: { type: Number, default: 1000 },
	bank: { type: Number }
});

const userSchema = new mongoose.Schema({
	_id: { type: String, require: true, unique: true },
	userName: { type: String, require: true },
	coins: { type: Number, default: 0 },
	bank: { type: Number, default: 1000 }
});

const userModel = mongoose.model('User', userSchema);

mongoose.model;

module.exports = { userModel, userSchema };
