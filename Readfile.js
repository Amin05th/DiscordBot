const {MessageActionRow , MessageEmbed, TextInputComponent, Modal} = require('discord.js')
const fs = require('fs')

function Readfile(client, interaction) {
    
    const modal = new Modal()
        .setCustomId('myModal')
        .setTitle('Choose File')


    const TextInput = new TextInputComponent()
        .setRequired(true)
        .setPlaceholder('Path of file...')
        .setLabel('File finder')
        .setStyle('SHORT')
        .setCustomId('PathInput')

    const firstActionRow = new MessageActionRow().addComponents(TextInput)

    modal.addComponents(firstActionRow)

    interaction.showModal(modal)

    client.on('interactionCreate', async interaction => {
        const path = interaction.fields.getTextInputValue('PathInput')
        const Title = path.substring(path.lastIndexOf('/') + 1)        

        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'myModal') {
            fs.readFile(path, async (err, data) => {
                const DocumentEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(Title)
                    .setURL('https://discord.js.org/')
                    .setDescription(data.toString())

                await interaction.reply({embeds: [DocumentEmbed]})
            })
        }
    })
}

module.exports = Readfile