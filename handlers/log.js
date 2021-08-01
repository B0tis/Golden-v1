const Auditlog = require('discord-auditlog');

const { MessageEmbed } = require('discord.js');
const config = require('../botconfig/config.json');
const ee = require('../botconfig/embed.json');

module.exports = async (client, message, user, discord) => {
	try {
		client.on('channelCreate', (channel) => {
			send_log(
				client,
				channel.guild,
				ee.color,
				'Channel created',
				`Channel created: ${channel.name} \nChannel ID: ${channel.id} \n Channel Type: ${channel.type}`
			);
		});
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
};

function send_log(client, guild, color, title, description) {
	try {
		const logEmbed = new MessageEmbed()
			.setColor(ee.color)
			.setFooter(ee.footertext, ee.footericon)
			.setTitle(title)
			.setDescription(description)
			.setTimestamp();

		const logger = client.channels.fetch('867362953665577001');

		logger.createWebhook(guild.name, {
			avatar: guild.iconURL({ format: 'png' }).then((webhook) => {
				webhook
					.send({
						username: guild.name,
						avatarURL: guild.iconURL({ format: 'png' }),
						embeds: [ logEmbed ]
					})
					.then((message) => {
						webhook.delete();
					})
					.catch((e) => {
						return message.channel.send(
							new MessageEmbed()
								.setColor(color)
								.setFooter('Please Contact Botis‽#6940', ee.footericon)
								.setTitle(`❌ ERROR | An error occurred`)
								.setDescription(`\`\`\`${e.stack}\`\`\``)
						);
					});
			})
		});
	} catch (e) {
		return message.channel.send(
			new MessageEmbed()
				.setColor(color)
				.setFooter('Please Contact Botis‽#6940', ee.footericon)
				.setTitle(`❌ ERROR | An error occurred`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
		);
	}
}
