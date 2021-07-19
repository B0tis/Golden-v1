const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');

//const distubeQue = new DisTube.Queue()

const { getVoiceConnection } = require('@discordjs/voice');

// const queue = new DisTube.Queue(DisTube, DisTubeVoice, DisTube.Song, Discord.TextChannel)

module.exports = {
	name: 'queue',
	category: 'Music',
	aliases: [ 'q' ],
	cooldown: 10,
	usage: 'queue',
	description: 'let you know the queue',

	run: async (client, message, args, user, text, prefix) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;

			const queue = client.distube.getQueue(message);

			message.channel
				.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`Current queue:`)
						.setDescription(
							`${queue.songs
								.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)
								.slice(0, 20)
								.join('\n')}\nVolume: \`${queue.volume}%\` | Filter: \`${queue.filter ||
								'Off'}\` | Loop: \`${queue.repeatMode
								? queue.repeatMode === 2 ? 'All Queue' : 'This Song'
								: 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
						)
				)
				.then((msg) => {
					msg.delete({ timeout: 30000 });
				});
		} catch (e) {
			return message.channel
				.send(
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter('Please Contact Botis‽#6940', ee.footericon)
						.setTitle(`${user} ❌ ERROR | No Song is in the Queue`)
				)
				.then((msg) => {
					msg.delete({ timeout: 10000 });
				});
		}
	}
};
