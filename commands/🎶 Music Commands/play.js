const { ApplicationCommandOptionType } = require('../../index');
const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json")
const { msg } = require("../../functions");

module.exports = {
    name: "play",
    description: "Play any song",
    category: "🎶 Music Commands",
    usage: "play <song>",
    data:{
        name: "play",
        description: "Play any song",
        options: [
            {
                name: "song",
                description: "The song to play",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    execute(interaction){
        var interactionEmbed = new EmbedBuilder().setColor(config.colors.yes).setTimestamp()
        const song = interaction.options.getString("song")
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel){
          return msg({
            interaction,
            color: "RED",
            title: "You must be in a voice channel",
            ephemeral: true
          })
        }
        
        const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(interaction.client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
          return msg({
            interaction,
            color: "RED",
            title: "Someone else is already listening to music",
            ephemeral: true
          })
        }
        
        let queue = distube.getQueue(interaction)
        if (queue){
          return msg({
            interaction,
            color: "RED",
            title: "Song already running",
            ephemeral: true
          })
        }
    
        distube.play(voiceChannelBot || voiceChannel, song, {
            member: interaction.member,
            textChannel: interaction.channel,
            message: interaction.message
        })
    
        interactionEmbed.setTitle(`🎶 Searching... 🎶\n\`${song}\``)
    
        interaction.reply({embeds: [interactionEmbed]})    
    }
}