const { MessageEmbed } = require('discord.js');
const config = require('../../botconfig/config.json');
const ee = require('../../botconfig/embed.json');
const profileModel = require('../../handlers/profileSchema');
require('dotenv').config();

module.exports = {
	name: 'deposit',
	category: 'Ecosystem',
	aliases: [ 'dep' ],
	cooldown: 10,
	usage: 'deposit <amount>',
	description: 'let you Deposit money to your bank account',

	run: async (client, message, args, user, text, prefix, profileData) => {
		try {
			if (message.author.bot) return;
			if (!message.guild) return;
			/** -------------------------------------------------- */

			let depMoney = args.join(' ');
			args = message.content.slice(config.prefix.length).trim().split(/ +/g);

			let money = profileData.coins;
			let bank = profileData.bank;

			if (depMoney <= money) {
				const response = await profileModel.findOneAndUpdate(
					{
						userID: message.author.id
					},
					{
						$inc: {
							bank: depMoney,
							coins: -depMoney
						}
					}
				);

				const sumZahl = parseInt(depMoney) + parseInt(bank);

				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(message.author.username + ' has successfully deposited ' + depMoney + '€')
						.setDescription(`You now have a total of ` + sumZahl + '€ on your Bank Account')
				);
			} else {
				return message.channel.send(
					new MessageEmbed()
						.setColor(ee.color)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`❌ ERROR | You dont have that much Coins`)
						.setDescription('you only have ' + money + '€ so you cant deposit ' + depMoney + '€')
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
