const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
const profileModel = require('../../events/Ecosystem/profileSchema');
require('dotenv').config();

module.exports = {
	name: 'withdraw',
	category: 'Ecosystem',
	aliases: [ 'draw', 'with' ],
	cooldown: 10,
	usage: 'withdraw <amount>',
	description: 'let you Withdraw money from your bank account',

	run: async (client, message, args, user, text, prefix, profileData) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			/** -------------------------------------------------- */

			let drewMoney = args.join(' ');
			args = message.content.slice(config.prefix.length).trim().split(/ +/g);

			let money = profileData.coins;
			let bank = profileData.bank;

			if (drewMoney <= bank) {
				const response = await profileModel.findOneAndUpdate(
					{
						userID: message.author.id
					},
					{
						$inc: {
							bank: -drewMoney,
							coins: drewMoney
						}
					}
				);

				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(message.author.username + ' has successfully withdrawed ' + drewMoney + '€')
						.setDescription(`You now have a total of ` + (bank - drewMoney) + '€ on your Bank Account')
				);
			} else {
				console.log(drewMoney);

				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | You dont have that much Money on the Bank`)
						.setDescription('you only have ' + bank + '€ so you cant withdraw ' + drewMoney + '€')
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
