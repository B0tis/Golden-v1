const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');

module.exports = {
	name: 'volume',
	category: 'Music',
	aliases: [ 'v' ],
	cooldown: 1,
	usage: 'volume <1% - 100%>',
	description: 'Change the Volume of the music',

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

			args = message.content.slice(config.prefix.length).trim().split(/ +/g);
			const command = args.shift();

			if (args[0] > 100) {
				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | 100% is enough`)
				);
			}

			try {
				await client.distube.setVolume(message, Number(args[0]));

				message.channel.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`Volume now at ${args[0]} %`)
				);
			} catch (e) {
				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | there is no song in the Queue!`)
				);
			}
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
