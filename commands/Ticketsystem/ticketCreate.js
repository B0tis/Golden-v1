const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
const profileModel = require('../../events/Ecosystem/profileSchema');
require('dotenv').config();

const ticketFunctions = require('../../handlers/ticketFunctions');

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

			let closeBtn = new disbut.MessageButton().setStyle('red').setLabel('📁 | Close').setID('close');

			let deleteBtn = new disbut.MessageButton().setStyle('red').setLabel('🗑️ | Delete').setID('delete');

			let saveBtn = new disbut.MessageButton().setStyle('blurple').setLabel('🗄️ | Save').setID('save');

			let reopenBtn = new disbut.MessageButton().setStyle('green').setLabel('📂 | Reopen').setID('reopen');

			let btns = new disbut.MessageActionRow().addComponents(deleteBtn, saveBtn, reopenBtn);

			const reactionMessage = await channel
				.send(`${creator} Thank you for creating a Ticket. How can we Help you?`, closeBtn)
				.then((message) => {
					message.pin();
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
						ticketFunctions.Close(creator, channel, button, message, closeBtn, btns);
						break;
					case 'delete':
						ticketFunctions.Delete(button);
						break;
					case 'save':
						ticketFunctions.Save();
						break;
					case 'reopen':
						ticketFunctions.Reopen(channel, creator, closeBtn, msg, button, pinndedOne);
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
