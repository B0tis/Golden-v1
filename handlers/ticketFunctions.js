const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const config = require('../botconfig/config.json');
const ee = require('../botconfig/embed.json');
const profileModel = require('../events/Ecosystem/profileSchema');
require('dotenv').config();

const transcript = require('../events/Ecosystem/transcript'); //load the transcript.js file

module.exports = { Close, Delete, Save, Reopen };

function Close(creator, channel, button, message, closeBtn, btns) {
	try {
		button.message.edit(closeBtn.setDisabled().setLabel(`Closed by ${button.clicker.user.username}`));

		channel.updateOverwrite(creator, {
			SEND_MESSAGES: false,
			VIEW_CHANNEL: false
		});

		channel.setName(`closed-${message.author.tag}`);

		return button.reply.send(`Ticket closed, what will happen next?`, btns, true);
	} catch (e) {
		return message.channel.send(
			new MessageEmbed()
				.setColor(ee.wrongcolor)
				.setFooter('Please Contact Botis‽#6940', ee.footericon)
				.setTitle(`❌ ERROR | An error occurred`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
		);
	}
}

function Delete(button, deleteBtn) {
	button.message.edit(deleteBtn.setDisabled().setLabel('Deleting...'));
	setTimeout(() => {
		button.channel.delete({ timeout: 50000 });
	}, 5000);
}

function Save(client, button, saveBtn) {
	button.message.edit(saveBtn.setDisabled().setLabel('Please wait...'));
	try {
		transcript(client, 500);
	} catch (e) {
		console.log(e);
	}

	setTimeout(() => {
		button.message.edit(saveBtn.setDisabled().setLabel('Saved!'));
	}, 5000);
}

function Reopen(channel, creator, closeBtn, message, button, pinnedMessage) {
	channel.updateOverwrite(creator, {
		SEND_MESSAGES: true,
		VIEW_CHANNEL: true
	});
	try {
		pinnedMessage.edit(closeBtn.setDisabled(false).setLabel(`Close`));

		message.delete();
		button.reply.send(`Ticket reopend by @${button.clicker.user.tag}`);
	} catch (e) {
		console.log(e);
	}
}
