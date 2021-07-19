const { MessageEmbed } = require('discord.js');
const ee = require('../../botconfig/embed.json');

module.exports = {
	name: 'stop',
	category: 'Music',
	cooldown: 5,
	usage: 'stop',
	description: 'Stop the current Song',

	run: async (client, message, args, user, text, prefix) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			if (!message.member.voice.channel) {
				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | You are not in a Voice Channel!`)
				);
			}

			await message.channel.send(
				new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(`Music Stoped!`)
			);

			return client.distube.stop(message);
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
