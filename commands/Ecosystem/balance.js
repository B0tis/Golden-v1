const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
const profileModel = require('../../handlers/profileSchema');
require('dotenv').config();

module.exports = {
	name: 'balance',
	category: 'Ecosystem',
	aliases: [ 'bal', 'bl' ],
	cooldown: 10,
	usage: 'balance',
	description: 'Check your balance',

	run: async (client, message, args, user, text, prefix, profileData) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;

			await message.channel.send(
				new MessageEmbed()
					.setColor(ee.color)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(message.author.username + '´s Current capital')
					.setDescription(`Wallet: ${profileData.coins}€\nBank: ${profileData.bank}€`)
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
