let auth = require('./auth.json')
let pl = require('./utils/printList')
let writeScript = require('./utils/writeFile')
const fs = require('fs')
let data = []

try {
	if (fs.existsSync('./userData.json')) {
		let rawdata = fs.readFileSync('./userData.json', 'utf-8')
		if (rawdata === '') data = []
		else {
			data = JSON.parse(rawdata)
		}
	} else {
		fs.writeFile('./userData.json', '')
	}
} catch (err) {
	console.error(err)
}

async function startCollecting(filter, chid, msgid) {
	const rolesChannel = bot.channels.cache.get(chid)
	let testmsg = await rolesChannel.messages.fetch(msgid)
	let ApeSquad = testmsg.guild

	const collector = testmsg.createReactionCollector(filter, {
		dispose: true
	})

	collector.on('collect', async function (reaction, user) {
		let role = ApeSquad.roles.cache.find(role => role.name === reaction._emoji.name)
		let member = ApeSquad.members.cache.get(user.id);
		member.roles.add(role)
	})
	collector.on('remove', async function (reaction, user) {
		let role = ApeSquad.roles.cache.find(role => role.name === reaction._emoji.name)
		let member = ApeSquad.members.cache.get(user.id);
		member.roles.remove(role)
	})
}

async function giveawayCollect(filter, chid, msgid) {
	const rolesChannel = bot.channels.cache.get(chid)
	let testmsg = await rolesChannel.messages.fetch(msgid)
	let ApeSquad = testmsg.guild

	const collector = testmsg.createReactionCollector(filter, {
		dispose: true
	})

	collector.on('collect', async function (reaction, user) {
		let role = ApeSquad.roles.cache.find(role => role.name === "Giveaways")
		let member = ApeSquad.members.cache.get(user.id);
		member.roles.add(role)
	})
	collector.on('remove', async function (reaction, user) {
		let role = ApeSquad.roles.cache.find(role => role.name === "Giveaways")
		let member = ApeSquad.members.cache.get(user.id);
		member.roles.remove(role)
	})
}

console.log('loaded from userData.json', data)

const commando = require('discord.js-commando')
const bot = new commando.Client({
	owner: auth.ownerID
})
const discord = require('discord.js')

//var json = JSON.parse(auth.token);
console.log('token', auth.token)

bot.registry.registerGroup('search')
bot.registry.registerGroup('junk')
bot.registry.registerGroup('music')
bot.registry.registerGroup('todo')
bot.registry.registerGroup('ristonia')
bot.registry.registerCommandsIn(__dirname + "/commands")
bot.registry.registerDefaults()

bot.on('ready', async function() {

	const warriorsFilter = (reaction, user) => {
		return ['Adele', 'Aran', 'Blaster', 'DarkKnight', 'DawnWarrior', 'DemonSlayer', 'DemonAvenger', 'Hayato', 'Hero', 'Kaiser', 'Mihile', 'Paladin', 'Zero'].includes(reaction.emoji.name) && !user.bot;
	}

	const archersFilter = (reaction, user) => {
		return ['Bowmaster', 'Kain', 'Marksman', 'Mercedes', 'Pathfinder', 'WildHunter', 'WindArcher'].includes(reaction.emoji.name) && !user.bot;
	}

	const thievesFilter = (reaction, user) => {
		return ['Cadena', 'DualBlade', 'Hoyoung', 'NightLord', 'NightWalker', 'Phantom', 'Xenon' ,'Shadower'].includes(reaction.emoji.name) && !user.bot;
	}

	const piratesFilter = (reaction, user) => {
		return ['AngelicBuster', 'Ark', 'Buccaneer', 'Cannoneer', 'Corsair', 'Jett', 'Mechanic' ,'ThunderBreaker', 'Shade'].includes(reaction.emoji.name) && !user.bot;
	}

	const magesFilter = (reaction, user) => {
		return ['BattleMage', 'BeastTamer', 'Bishop', 'BlazeWizard', 'Evan', 'FirePoison', 'IceLightning' ,'Illium', 'Kanna', 'Kinesis', 'Luminous'].includes(reaction.emoji.name) && !user.bot;
	}

	const giveawayFilter = (reaction, user) => {
		return ['catto'].includes(reaction.emoji.name) && !user.bot;
	}

	//842098209303822407 = Dan
	//728656476352151681 = Moon
	startCollecting(warriorsFilter, '842098209303822407', '847885495505387520')
	startCollecting(warriorsFilter, '728656476352151681', '847886330482786314')

	startCollecting(archersFilter, '842098209303822407', '847885513595420682')
	startCollecting(archersFilter, '728656476352151681', '847886424438865960')

	startCollecting(thievesFilter, '842098209303822407', '847885522172641280')
	startCollecting(thievesFilter, '728656476352151681', '847886442956062740')

	startCollecting(piratesFilter, '842098209303822407', '847885532834955284')
	startCollecting(piratesFilter, '728656476352151681', '847886453509062666')

	startCollecting(magesFilter, '842098209303822407', '847885541533417523')
	startCollecting(magesFilter, '728656476352151681', '847886435741597776')

	giveawayCollect(giveawayFilter, '842098209303822407', '847906712740167711')

	// collector.on('collect', async function (reaction, user) {
	// 	let role = ApeSquad.roles.cache.find(role => role.name === reaction._emoji.name)
	// 	let member = ApeSquad.members.cache.get(user.id);
	// 	member.roles.add(role)
	// })
	// collector.on('remove', async function (reaction, user) {
	// 	let role = ApeSquad.roles.cache.find(role => role.name === reaction._emoji.name)
	// 	let member = ApeSquad.members.cache.get(user.id);
	// 	member.roles.remove(role)
	// })
})

bot.on('message', (message) => {
	if (message.content == 'ping') {
		message.channel.send('pong')
	} else if (message.content.toLowerCase().includes('penis')) {
		message.channel.send(':b:enis')
	}
})

bot.on('message', (message) => {
	if (message.content.toLowerCase().startsWith('=add ')) {
		let item = message.content.replace('=add ', '')
		let userData = [message.author.id, item]
		if (data.length == 0) {
			data.push(userData)
			message.channel.send('Item added!')
			writeScript.wf('./userData.json', JSON.stringify(data))
		} else {
			let counter = 0
			for (let i = 0; i < data.length; i++) {
				if (data[i][0] == message.author.id) {
					console.log('list exists')
					data[i].push(item)
					counter++
					message.channel.send('Item added!')
					writeScript.wf('./userData.json', JSON.stringify(data))
					break
				}
			}
			if (counter == 0) {
				data.push(userData)
				message.channel.send(`Item added!`)
				writeScript.wf('./userData.json', JSON.stringify(data))
			}
		}
		console.log(data)
	}
	if (message.content.toLowerCase().startsWith('=remove ')) {
		let index = parseInt(message.content.replace('=remove ', ''))
		if (data.length == 0) {
			message.channel.send('There is nothing to remove!')
		} else {
			let counter = 0
			for (let i = 0; i < data.length; i++) {

				if (data[i].length == 1) {
					message.channel.send('You have nothing in your list to remove!')
					break
				} else if ((data[i][0] == message.author.id)) {
					data[i].splice(index, 1)
					counter++
					message.channel.send(`Successfully removed!`)
					writeScript.wf('./userData.json', JSON.stringify(data))
					break
				}
			}
			if (counter == 0) {
				message.channel.send('Incorrect usage of the remove command')
			}
		}
		console.log(data)
	}	
	if (message.content.toLowerCase().startsWith('=list')) {
		if (data.length == 0) {
			message.channel.send('You have nothing in your list!')
		}

		for (let i = 0; i < data.length; i++) {
			if (data[i].length == 1) {
				message.channel.send('You have nothing in your list!')
			} else if (data[i][0] == message.author.id) {
				pl.printList(message, data[i])
			}
		}
		let rawdata = fs.readFileSync('./userData.json', 'utf-8')
		if (rawdata === '') data = []
		else {
			data = JSON.parse(rawdata)
		}
	}

})

bot.login(auth.token)