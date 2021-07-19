const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');

//const distubeQue = new DisTube.Queue()

const { getVoiceConnection } = require('@discordjs/voice');

// const queue = new DisTube.Queue(DisTube, DisTubeVoice, DisTube.Song, Discord.TextChannel)

module.exports = {
	name: 'filter',
	category: 'Music',
	aliases: [ 'f' ],
	cooldown: 1,
	usage: 'filter <FilterName>',
	description: 'let you add a filter',

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

			if (!args[0])
				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | Please Provide a Filter!`)
				);

			let filter = client.distube.setFilter(message, args[0]);

			return message.channel.send(
				new MessageEmbed()
					.setColor(ee.color)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(`Current Filter` + (filter || 'OFF'))
			);
		} catch (e) {
			console.log(String(e.stack).red);

			return message.channel.send(
				new MessageEmbed()
					.setColor(ee.wrongcolor)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(`❌ ERROR | Filter does not exist`)
			);
		}
	}
};
