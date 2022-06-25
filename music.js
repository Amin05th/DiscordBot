const joinVoiceChannel = require('@discordjs/voice')
const ytdl = require('ytdl-core')
const ytSearch = require('yt-search');

const PREFIX = '!'

function Music(client) {

  client.on('messageCreate', message => {
    const commands = [ `${PREFIX}stop`, `${PREFIX}play`, `${PREFIX}leave`]
    if (message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return
    if(!commands.includes(message.content.split(' ')[0])) return message.channel.send('Invalid Command')
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) return message.channel.send("I need the permissions to join and speak in your voice channel!");


    const connection = joinVoiceChannel.joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    });
    const audioplayer = joinVoiceChannel.createAudioPlayer()
    connection.subscribe(audioplayer)


    if(message.content.startsWith(`${PREFIX}play`)){
      play(message, audioplayer)
      return 
    }

    if(message.content.startsWith(`${PREFIX}stop`)) {
    stop(message, audioplayer)
         return
    }
    if(message.content.startsWith(`${PREFIX}leave`)) {
      leave(connection)
      return
    }
  })
  
  function musicFinder(string){
    const Song = ytSearch(string).then(data => {
      if(data.all.length === 0 || undefined) return
      if(!data.videos) return 
      return data.videos[0]
    })
    return Song
  }
  
  async function play(message, audioplayer){
    const args = message.content.replace(`${PREFIX}play`, "")
    musicFinder(args).then(data => {
    const stream = ytdl(data.url, {filter: 'audioonly', quality: 'highestaudio'})
    const resource = joinVoiceChannel.createAudioResource(stream)
    audioplayer.play(resource)
    message.channel.send(`
      Searching 🔍︎ ${args} \nPlaying 🎵  ${data.title} - Duration ${data.duration} \nThubnail ${data.thumbnail}
    `)
    }).catch(e => {
      console.log(e)
    })
  }
  
  function stop(message, audioplayer){
    audioplayer.stop()
    message.channel.send('Music got stopped')
  }

  function leave(connection){
    connection?.destroy()
  }

}

module.exports = Music