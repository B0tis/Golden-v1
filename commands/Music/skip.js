const { MessageEmbed } = require('discord.js');
const ee = require('../../botconfig/embed.json');

module.exports = {
	name: 'skip',
	category: 'Music',
	aliases: [ 's' ],
	cooldown: 10,
	usage: 'skip',
	description: 'Skip the current Song',

	run: async (client, message, args, user, text, prefix) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			if (!message.member.voice.channel) {
				return message.channel
					.send(
						new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`❌ ERROR | You are not in a Voice Channel!`)
					)
					.then((msg) => {
						msg.delete({ timeout: 5000 });
					});
			}

			await client.distube.skip(message);

			return message.channel
				.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`Skipped current Song!`)
				)
				.then((msg) => {
					msg.delete({ timeout: 5000 });
				});
		} catch (e) {
			return message.channel.send(
				new MessageEmbed()
					.setColor(ee.wrongcolor)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(`❌ ERROR | There is no song to skip`)
			);
		}
	}
};
