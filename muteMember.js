function mute(interaction, MutePerson){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply('No permission to mute')
    const muterole = interaction.guild.roles.cache.find(role => role.name === "Muted")
    if(muterole === undefined) return interaction.reply('Role does not exist: Muted')
    const member = interaction.guild.members.cache.get(MutePerson.id)
    if(member.roles.cache.has(muterole.id)) return interaction.reply('User is muted!')
    member.roles.add(muterole)
    interaction.reply('User is muted')
}

function unmute(interaction, UnMutePerson){
    if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply('No permission to mute')
    const muterole = interaction.guild.roles.cache.find(role => role.name === "Muted")
    if(muterole === undefined) return interaction.reply('Role does not exist: Muted')
    const member = interaction.guild.members.cache.get(UnMutePerson.id)
    member.roles.remove(muterole)
    interaction.reply('User is unmuted')
}

module.exports = {
    mute,
    unmute
}