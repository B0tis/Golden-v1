const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
const profileModel = require('../../events/Ecosystem/profileSchema');
require('dotenv').config();

module.exports = {
	name: 'work',
	category: 'Ecosystem',
	aliases: [ 'wo' ],
	cooldown: 3600,
	usage: 'work',
	description: 'let you Work to gain more Money',

	run: async (client, message, args, user, text, prefix, profileData) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			/** -------------------------------------------------- */

			let work;

			work = Math.floor(Math.random() * 250) + 1;

			money = profileData.coins;

			const response = await profileModel.findOneAndUpdate(
				{
					userID: message.author.id
				},
				{
					$inc: {
						coins: work
					}
				}
			);

			const sumZahl = parseInt(work) + parseInt(money);

			return message.channel.send(
				new MessageEmbed()
					.setColor(ee.color)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(message.author.username + ' just did some Work, he gained him ' + work + '€')
					.setDescription(`You now have ` + sumZahl + '€ in your Wallet')
			);
		} catch (e) {
			console.log(String(e.stack).red);

			return message.channel.send(
				new MessageEmbed()
					.setColor(ee.wrongcolor)
					.setFooter('Please Contact Botis‽#6940', ee.footericon)
					.setTitle(`❌ ERROR | An error occurred`)
					.setDescription(`\`\`\`${e.stack}\`\`\``)
			);
		}
	}
};
