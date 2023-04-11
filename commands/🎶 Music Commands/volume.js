const { ApplicationCommandOptionType } = require('../../index');
const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json")
const { msg } = require("../../functions");

module.exports = {
    name: "volume",
    description: "Set the volume of the song",
    category: "🎶 Music Commands",
    usage: "volume <volume>",
    data:{
        name: "volume",
        description: "Set the volume of the song",
        options: [
            {
                name: "volume",
                description: "The volume of the song",
                type: ApplicationCommandOptionType.Integer,
                required: true
            }
        ]
    },
    execute(interaction){
        var interactionEmbed = new EmbedBuilder().setColor(config.colors.yes).setTimestamp()
        const volume = interaction.options.getInteger("volume")
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
    
        if (volume < 0){
          interactionEmbed.setTitle("❌ The minimum value of the volume is 0").setColor(config.colors.no)
          return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
        }
        if (volume > 100){
          interactionEmbed.setTitle("❌ The maximum value of the volume is 100").setColor(config.colors.no)
          return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
        }
      
        try{
          distube.setVolume(interaction, volume)
          interactionEmbed.setTitle(`✅ Volume set at \`${volume}%\``)
          return interaction.reply({embeds: [interactionEmbed]})
        } catch {
          interactionEmbed.setTitle("❌ No song playing").setColor(config.colors.no)
          return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
        }    
    }
}