const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
const profileModel = require('../../events/Ecosystem/profileSchema');
require('dotenv').config();

module.exports = {
	name: 'ticketSetup',
	category: 'Ticketsystem',
	aliases: [ 'ticketS', 'tSetup', 'tS' ],
	cooldown: 10,
	memberpermissions: [ 'MANAGE_SERVER' ],
	usage: 'ticketSetup',
	description: 'let you Create a Channel where People can create tickets',

	run: async (client, message, args, user, text, prefix, profileData) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			/** -------------------------------------------------- */
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
