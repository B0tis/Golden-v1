const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
const profileModel = require('../../events/Ecosystem/profileSchema');
require('dotenv').config();

module.exports = {
	name: 'ticketCreate',
	category: 'Ticketsystem',
	aliases: [ 'tcreate', 'tc', 'ticketc' ],
	usage: 'ticketCreate',
	description: 'let you Create a Ticket if you need Help',

	run: async (client, message, args, user, text, prefix, profileData) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			/** -------------------------------------------------- */

			const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);

			try {
				channel.setParent('868794969664659516');
			} catch (e) {
				return message.channel.send(
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`❌ ERROR | No Category found for Tickets!`)
				);
			}

			const creator = message.author;

			await channel.updateOverwrite(message.guild.id, {
				SEND_MESSAGES: false,
				VIEW_CHANNEL: false
			});

			await channel.updateOverwrite(creator, {
				SEND_MESSAGES: true,
				VIEW_CHANNEL: true
			});

			let closeBtn = new disbut.MessageButton().setStyle('red').setLabel('Close').setID('close');

			let deleteBtn = new disbut.MessageButton().setStyle('red').setLabel('Delete').setID('delete');

			let saveBtn = new disbut.MessageButton().setStyle('blurple').setLabel('Save').setID('save');

			let reopenBtn = new disbut.MessageButton().setStyle('green').setLabel('Reopen').setID('reopen');

			let btns = new disbut.MessageActionRow().addComponents(deleteBtn, saveBtn, reopenBtn);

			const reactionMessage = await channel
				.send('Thank you for creating a Ticket. How can we Help you?', closeBtn)
				.then((message) => {
					message.pin({ reason: 'Important' });
				});

			let pinnedMessage = channel.messages
				.fetchPinned()
				.then((messages) => {
					pinnedMessage = messages.first();
				})
				.catch(console.error);

			client.on('clickButton', (button) => {
				const pinndedOne = pinnedMessage;
				const msg = message;
				switch (button.id) {
					case 'close':
						try {
							button.message.edit(
								closeBtn.setDisabled().setLabel(`Closed by ${button.clicker.user.username}`)
							);

							channel.updateOverwrite(creator, {
								SEND_MESSAGES: false,
								VIEW_CHANNEL: false
							});

							button.channel.send(`Ticket closed, what will happen next?`, btns);
						} catch (e) {
							return message.channel.send(
								new MessageEmbed()
									.setColor(ee.wrongcolor)
									.setFooter('Please Contact Botis‽#6940', ee.footericon)
									.setTitle(`❌ ERROR | An error occurred`)
									.setDescription(`\`\`\`${e.stack}\`\`\``)
							);
						}
						break;
					case 'delete':
						button.reply.send('This Ticket will be delted in 5 seconds.');
						setTimeout(() => {
							button.channel.delete({ timeout: 50000 });
						}, 5000);
						break;
					case 'save':
						button.reply.send('Saving...Please wait...');

						break;
					case 'reopen':
						channel.updateOverwrite(creator, {
							SEND_MESSAGES: true,
							VIEW_CHANNEL: true
						});
						try {
							pinndedOne.edit(closeBtn.setDisabled(false).setLabel(`Close`));

							msg.delete();
							button.reply.send(`Ticket reopend by @${button.clicker.user.tag}`);
						} catch (e) {
							console.log(e);
						}
						break;
				}

				// button.reply.send(`What is your plan for this Ticket?`, btns);
				// setTimeout(() => {
				// channel.delete({ timeout: 50000 });
				// }, 5000);
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
	}
};
