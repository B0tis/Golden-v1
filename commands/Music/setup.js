const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');

//const distubeQue = new DisTube.Queue()

const { getVoiceConnection } = require('@discordjs/voice');

// const queue = new DisTube.Queue(DisTube, DisTubeVoice, DisTube.Song, Discord.TextChannel)

module.exports = {
	name: 'setup',
	category: 'Music',
	cooldown: 10,
	usage: 'setup',
	description: 'Setup a channel only for the Songrequests',

	run: async (client, message, args, user, text, prefix) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;

			const queue = client.distube.getQueue(message);

			message.guild.channels.create('golden-requests', { reason: 'test' });

			message.channel.send(
				new MessageEmbed()
					.setColor(ee.color)
					.setFooter(ee.footertext, ee.footericon)
					.setThumbnail(song.thumbnail)
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
			);

			return (setup = true);
		} catch (e) {
			console.log(String(e.stack).red);

			return message.channel.send(
				new MessageEmbed()
					.setColor(ee.wrongcolor)
					.setFooter('Please Contact Botis‽#6940', ee.footericon)
					.setTitle(`❌ ERROR`)
			);
		}
	}
};
