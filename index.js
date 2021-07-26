//Importing all needed Commands
const Discord = require('discord.js'); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require('colors'); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require('fs'); //this package is for reading files and getting their inputsconst fs = require('fs'); //this package is for reading files and getting their inputs
const { MessageEmbed } = require('discord.js');
const config = require('./botconfig/config.json');
const ee = require('./botconfig/embed.json');
const mongoose = require('mongoose');

let setup = false;

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
	messageCacheLifetime: 60,
	fetchAllMembers: false,
	messageCacheMaxSize: 10,
	restTimeOffset: 0,
	restWsBridgetimeout: 100,
	disableEveryone: true,
	partials: [ 'MESSAGE', 'CHANNEL', 'REACTION' ]
});

/** Discord Buttons */
require('discord-buttons')(client);
const disbut = require('discord-buttons');
/**  */

require('dotenv').config();

/** Mongoose Stuff */

const dboptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	autoIndex: false,
	poolSize: 5,
	family: 4
};

mongoose
	.connect(process.env.MONGODB_SRV, dboptions)
	.then(() => {
		const stringlength2 = 69;
		console.log('\n');
		console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen);
		console.log(`     ┃ `.bold.brightGreen + ' '.repeat(-1 + stringlength2 - ` ┃ `.length) + '┃'.bold.brightGreen);
		console.log(
			`     ┃ `.bold.brightGreen +
				`Connected To DB...`.bold.brightGreen +
				' '.repeat(-1 + stringlength2 - ` ┃ `.length - `Connected To DB...`.length) +
				'┃'.bold.brightGreen
		);
		console.log(`     ┃ `.bold.brightGreen + ' '.repeat(-1 + stringlength2 - ` ┃ `.length) + '┃'.bold.brightGreen);
		console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen);
	})
	.catch((e) => {
		console.log(String(e.stack).red);
	});

/**  */

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync('./commands/'); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
// client.emotes = config.emoji

//defining all files 2 be loaded in ./handlers
client.handlers = [ 'command', 'events' ];
//Loading files, with the client variable like Command Handler, Event Handler, ...
function handlers() {
	client.handlers.forEach((handler) => {
		require(`./handlers/${handler}`)(client);
	});
}
handlers();
module.exports.handlers = handlers;

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */

/** Distube */

const distube = require('distube');
const SpotifyPlugin = require('@distube/spotify');

client.distube = new distube(client, {
	emitNewSongOnly: true,
	leaveOnFinish: false,
	leaveOnEmpty: false,
	plugins: [ new SpotifyPlugin({ parallel: true }) ]
});

client.distube.on('initQueue', (queue) => {
	queue.autoplay = false;
	queue.volume = 100;
});

const status = (queue) =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || 'Off'}\` | Loop: \`${queue.repeatMode
		? queue.repeatMode === 2 ? 'All Queue' : 'This Song'
		: 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

client.distube.on('playSong', (queue, song) => {
	let button = new disbut.MessageButton().setStyle('url').setEmoji('864828501206761502').setURL(song.url);

	queue.textChannel
		.send(
			new MessageEmbed()
				.setColor(ee.color)
				.setFooter(ee.footertext, ee.footericon)
				.setTitle(`Playing: ${song.name} - ${song.formattedDuration}`)
				.setImage(song.thumbnail)
				.setDescription(`Requested by: ${song.user}\n${status(queue)}`),
			button
		)
		.then((msg) => {
			msg.delete({ timeout: 30000 });
		});
});

client.distube.on('addSong', (queue, song) => {
	let button = new disbut.MessageButton().setStyle('url').setURL(song.url).setEmoji('864828501206761502');

	queue.textChannel
		.send(
			new MessageEmbed()
				.setColor(ee.color)
				.setFooter(ee.footertext, ee.footericon)
				.setThumbnail(song.thumbnail)
				.setTitle(`Added ${song.name} to the Queue`)
				.setDescription(`requested by: ${song.user}`),
			button
		)
		.then((msg) => {
			msg.delete({ timeout: 30000 });
		});
});

client.distube.on('playList', (queue, playlist, song) =>
	queue.textChannel
		.send(
			`${client.emotes
				.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(
				queue
			)}`
		)
		.then((msg) => {
			msg.delete({ timeout: 60000 });
		})
);

client.distube.on('addList', (queue, playlist) =>
	queue.textChannel.send(
		`${client.emotes
			.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
	)
);

// DisTubeOptions.searchSongs = true
client.distube.on('searchResult', (queue, result) => {
	let i = 0;
	queue.textChannel.send(
		new MessageEmbed()
			.setColor(ee.color)
			.setFooter(ee.footertext, ee.footericon)
			.setTitle(`**Choose an option from below**`)
			.setDescription(
				result
					.map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
					.join('\n\n*Enter anything else or wait 60 seconds to cancel*')
			)
	);
});

// DisTubeOptions.searchSongs = true
client.distube.on('searchCancel', (message) =>
	message.Channel.send(
		new MessageEmbed()
			.setColor(ee.wrongcolor)
			.setFooter(ee.footertext, ee.footericon)
			.setTitle(`❌ ERROR | Search Cancelled`)
	)
);

client.distube.on('error', (queue, error) => {
	queue.textChannel.send(`❌ ERROR | An error occurred:\n\`\`\`${error}\`\`\` \nPlease Contact Botis‽#6940`);
});

//login into the bot
client.login(process.env.TOKEN);
