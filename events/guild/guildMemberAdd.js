const profileModel = require('../Ecosystem/profileSchema');
const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
require('dotenv').config();

module.exports = async (client, user, discord, member) => {
	try {
		let profile = await profileModel.create({
			userID: user.id,
			userName: user.username,
			coins: 1000,
			bank: 0
		});
		profile.save();

		console.log(`newn Profile saved in DB, ID: ${user.id}`);
	} catch (err) {
		console.log(err);
	}
};
