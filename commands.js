const ms = require('ms')
const {AddNewChannelToWelcome, StopGreetingAndRules, SendsMessageAfterJoining} = require('./GreetAndRules')
const { mute, unmute } = require('./muteMember')
const Readfile = require('./Readfile')

function commandHandler(client) {
    const WelcomeChannelarray = []
    const commands = client.application.commands
    Singlecommands(commands)
    SendsMessageAfterJoining(client, WelcomeChannelarray)
  
    client.on('interactionCreate', async(interaction) => {
      if(!interaction.isCommand) return
      const name = interaction.commandName
      
      if(name === 'deletemessages'){
        const amount = interaction.options.getInteger('amount')
        if(amount > 100) return interaction.followUp({content: "Maximum ammount of messages 100"})
        const messages = await interaction.channel.messages.fetch({
          limit: amount + 1
        })
        
        const filltred = messages.filter(msg => Date.now() - msg.createdTimestamp < ms("14 days"))
        await interaction.channel.bulkDelete(filltred)
    
        interaction.reply({content: `Deleted ${filltred.size - 1} messages`})
      }

      if(name === 'welcomemessage') {
        const channelId = client.channels.cache.find(channel => {
          if(!channel.isText()) return
          const channelname = interaction.options.getString('channelname')
          const isChannel = channel.name === channelname
          if(!isChannel) return
          AddNewChannelToWelcome(channel.id, WelcomeChannelarray)
          return channel.id
        })
        if(channelId === undefined) return interaction.reply('Cannot find Channel')
        return interaction.reply('Welcome is enabled')
      }

      if(name === 'stop-welcomemessage') {
        const channelId = client.channels.cache.find(channel => {
          if(!channel.isText()) return
          const channelname = interaction.options.getString('channelname')
          const isChannel = channel.name === channelname
          if(!isChannel) return
          StopGreetingAndRules(channel.id, WelcomeChannelarray)
          return channel.id
        })
        if(channelId === undefined) return interaction.reply('Cannot find Channel')
        return interaction.reply('Welcome is disabled')
      }

      if(name === 'mute') {
        const MutePerson = interaction.options.getUser('mutemember')
        mute(interaction, MutePerson)
      }

      if(name === 'unmute') {
        const UnMutePerson = interaction.options.getUser('unmutemember')
        unmute(interaction, UnMutePerson)
      }

      if(name === 'readfile') {
        Readfile(client, interaction)
      }
    })
}

function Singlecommands(commands){
    commands.create({
      name: 'welcomemessage',
      description: 'Enable Welcome message',
      options: [
        {
          name: 'channelname',
          description: 'The Channel in which the Messages will be send',
          type: 'STRING',
          required: true,
        }
      ],
    })

    commands.create({
      name: 'stop-welcomemessage',
      description: 'Disable Welcome message',
      options: [
        {
          name: 'channelname',
          description: 'The Channel in which the Messages will be send',
          type: 'STRING',
          required: true,
        }
      ],
    })
  
    commands.create({
      name: 'deletemessages',
      description: 'A Command for deleting messages',
      options: [
        {
          name: 'amount',
          description: 'Amount of messages',
          required: true,
          type: 'INTEGER'
        }
      ]
    })

    commands.create({
      name: 'mute',
      description: 'A Command for muting Members',
      options: [
        {
          name: 'mutemember',
          description: 'Member you want to mute',
          required: true,
          type: 'USER'
        }
      ]
    })

    commands.create({
      name: 'unmute',
      description: 'A Command for unmuting Members',
      options: [
        {
          name: 'unmutemember',
          description: 'Member you want to mute',
          required: true,
          type: 'USER'
        }
      ]
    })

    commands.create({
      name: 'readfile',
      description: 'A Command for reading a files content',
    })
}

module.exports = commandHandler