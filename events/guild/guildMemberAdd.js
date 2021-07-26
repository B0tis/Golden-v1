const profileModel = require('../Ecosystem/profileSchema');
const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json'); //loading config file with token and prefix
const settings = require('../../botconfig/settings.json'); //loading settings file with the settings
const ee = require('../../botconfig/embed.json'); //Loading all embed settings like color footertext and icon ...
const Discord = require('discord.js'); //this is the official discord.js wrapper for the Discord Api, which we use!
require('dotenv').config();

module.exports = (client, user, discord, member) => {
	try {
		let profile = profileModel.create({
			userID: user.id,
			userName: user.username,
			coins: 1000,
			bank: 0
		});
		profile.save();

		console.log(`new Profile saved in DB, ID: ${user.id}`);
	} catch (err) {
		console.log(err);
	}
};
