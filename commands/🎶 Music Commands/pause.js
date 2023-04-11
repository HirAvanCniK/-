const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json")
const { msg } = require("../../functions");

module.exports = {
    name: "pause",
    description: "Pause the song",
    category: "🎶 Music Commands",
    usage: "pause",
    data:{
        name: "pause",
        description: "Pause the song",
    },
    execute(interaction){
        var interactionEmbed = new EmbedBuilder().setColor(config.colors.yes).setTimestamp()
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel){
          return msg({
            interaction,
            color: "RED",
            title: "You must be in a voice channel",
            ephemeral: true
          })
        }
    
        const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
          return msg({
            interaction,
            color: "RED",
            title: "Someone else is already listening to music",
            ephemeral: true
          })
        }
    
        try{
          distube.pause(interaction)
          interactionEmbed.setTitle("✅ Song paused")
          return interaction.reply({embeds: [interactionEmbed]})
        } catch {
          interactionEmbed.setTitle("❌ No song playing or song already paused").setColor(config.colors.no)
          return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
        }
    }
}