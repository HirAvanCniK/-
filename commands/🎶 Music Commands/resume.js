const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json")
const { msg } = require("../../functions");

module.exports = {
    name: "resume",
    description: "Resume the song",
    category: "🎶 Music Commands",
    usage: "resume",
    data:{
        name: "resume",
        description: "Resume the song",
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
          distube.resume(interaction)
          interactionEmbed.setTitle("✅ Song resumed")
          return interaction.reply({embeds: [interactionEmbed]})
        } catch {
          interactionEmbed.setTitle("❌ No song playing or song already playing").setColor(config.colors.no)
          return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
        }    
    }
}