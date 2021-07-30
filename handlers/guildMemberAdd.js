const profileModel = require('./profileSchema');
const { MessageEmbed } = require('discord.js');
const config = require('../botconfig/config.json'); //loading config file with token and prefix
const settings = require('../botconfig/settings.json'); //loading settings file with the settings
const ee = require('../botconfig/embed.json'); //Loading all embed settings like color footertext and icon ...
const Discord = require('discord.js'); //this is the official discord.js wrapper for the Discord Api, which we use!
require('dotenv').config();

module.exports = { newUserSave };

function newUserSave(user) {
	try {
		let user = userModel.create({
			_id: user.id,
			userName: user.username,
			coins: 1000,
			bank: 0
		});

		// let profile = profileModel.create({
		// userID: user.id,
		// userName: user.username,
		// coins: 1000,
		// bank: 0
		// });
		userModel.save();
	} catch (err) {
		console.log(err);
	}
}
