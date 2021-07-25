const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');

const { getVoiceConnection } = require('@discordjs/voice');

var { getData, getPreview, getTracks } = require('spotify-url-info');

// Acces-Token: BQDuHlLzNNErWbTbF9ODsZ4d46Sy6FH_mRlM_9hui3NLkZQ-KP8XvQNdLY2rGIwXY4k4yIENzMtH27MHOZ3q3UKVBT9v3JJa1IftWUTyki6ByqIaUSoJoLQRK0FlThQFHlkNOFZoJjLM_FXq1TJnRkEqOsfJ72JsxT4OpJfyRbvGIsSBNR3yuFY2RVkqng6wxs_t
// Refresh-Token: AQCvCtDya3jp_5aW3D5R9mtywKpCeAihAjdm3oweJm8t-c3uS3scANci7dHVmMbGf5-4TXY43r2ABJ3xXzhiJgaD3697aYdMMYsUBvOlw1z6Pp86TSEgCj0HoJC3yYfWCp8

module.exports = {
	name: 'play',
	category: 'Music',
	aliases: [ 'p' ],
	cooldown: 1,
	usage: 'play <song | YouTube/Soundcloud/Spotify Link>',
	description: 'Play some Music in your Voice Channel',

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
							.setTitle(`❌ ERROR | Please Join a Voice Channel!`)
					)
					.then((msg) => {
						return msg.delete({ timeout: 5000 });
					});
			}

			const music = args.join(' ');

			if (!music)
				return message.channel
					.send(
						new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`❌ ERROR | Please Provide a Song!`)
					)
					.then((msg) => {
						return msg.delete({ timeout: 5000 });
					});

			const command = args.shift();
			message.channel
				.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`Loading... Please wait...`)
				)
				.then((msg) => {
					client.distube.play(message, music);

					return msg.delete({ timeout: 5000 });
				});

			const info = message.id;
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
