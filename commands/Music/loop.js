const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');

//const distubeQue = new DisTube.Queue()

const { getVoiceConnection } = require('@discordjs/voice');

// const queue = new DisTube.Queue(DisTube, DisTubeVoice, DisTube.Song, Discord.TextChannel)

module.exports = {
	name: 'loop',
	category: 'Music',
	aliases: [ 'l', 'repeat', 'r' ],
	cooldown: 5,
	usage: 'loop <0,1,2 OR off,enable,queue>',
	description: 'let you enable a loop',

	run: async (client, message, args, user, text, prefix) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			if (!message.member.voice.channel) {
				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | Please Join a Voice Channel!`)
				);
			}

			const loop = args.join(' ');
			if (!loop)
				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | Please Provide a Option!`)
				);

			args = message.content.slice(config.prefix.length).trim().split(/ +/g);
			let command = args.shift();

			switch (args[0]) {
				case 'song':
					args[0] = 1;
					break;
				case 'queue':
					args[0] = 2;
					break;
				default:
					args[0] = 0;
					break;
			}

			// console.log(args[0]);
			//
			// if (args[0] == 'song') {
			// args[0] = 1;
			// } else if (args[0] == 'queue') {
			// args[0] = 2;
			// } else {
			// args[0] = 0;
			// }

			let mode = client.distube.setRepeatMode(message, parseInt(command));

			message.channel.send(
				new MessageEmbed()
					.setColor(ee.color)
					.setFooter(ee.footertext, ee.footericon)
					.setTitle(`Current mode: ${mode}`)
			);
		} catch (e) {
			console.log(String(e.stack).red);

			return message.channel.send(
				new MessageEmbed()
					.setColor(ee.wrongcolor)
					.setFooter('Please Contact Botis‽#6940', ee.footericon)
					.setTitle(`❌ ERROR | No Song playing`)
			);
		}
	}
};
