function AddNewChannelToWelcome(channelId, WelcomeChannelarray) {
  if(WelcomeChannelarray.includes(channelId)) return
  WelcomeChannelarray.push(channelId)
}

function SendsMessageAfterJoining(client, WelcomeChannelarray){
  client.on('guildMemberAdd', member => {
    WelcomeChannelarray.forEach((value) => {
      member.guild.channels.cache.get(value).send(`**Welcome to the discord server, <@${member.user.id}>!**`);
    })
  })
}

function StopGreetingAndRules(channelId, WelcomeChannelarray) {
  if(!WelcomeChannelarray.includes(channelId)) return
  const Index = WelcomeChannelarray.indexOf(channelId)
  const DeleteIds = 1
  WelcomeChannelarray.splice(Index, DeleteIds)
}



module.exports = {
  AddNewChannelToWelcome,
  StopGreetingAndRules,
  SendsMessageAfterJoining
}
