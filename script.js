require('dotenv').config()
const {Client, Intents } = require('discord.js')
const music = require('./music')
const RemoveWords = require('./RemoveBadWords')
const commandHandler = require('./commands')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]})

client.on('ready', () => {
  console.log('Im Ready')
  commandHandler(client)
})

RemoveWords(client)
music(client)

client.login(process.env.CLIENT_TOKEN)