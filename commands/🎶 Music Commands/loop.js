const { ApplicationCommandOptionType } = require('../../index');
const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json")
const { msg } = require("../../functions");

module.exports = {
    name: "loop",
    description: "Loop queue",
    category: "🎶 Music Commands",
    usage: "loop",
    data:{
        name: "loop",
        description: "Loop queue",
        options: [
            {
                name: "loop",
                description: "What do you want repeated?",
                type: ApplicationCommandOptionType.Integer,
                required: true
            }
        ]
    },
    execute(interaction){
        var interactionEmbed = new EmbedBuilder().setColor(config.colors.yes).setTimestamp()
        const what = interaction.options.getInteger("loop")
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
    
        if (what != 0 && what != 1 && what != 2){
          return msg({
            interaction,
            color: "RED",
            title: `The argument '**${what}**' does not exist\n(0) Remove loop\n(1) Loop at song\n(2) Loop at queue`,
            ephemeral: true
          })
        }
    
        try{
          distube.setRepeatMode(interaction, what)
          if (what == 0) interactionEmbed.setTitle(`✅ Loop removed`)
          else if (what == 1) interactionEmbed.setTitle(`✅ Loop set at song`)
          else interactionEmbed.setTitle(`✅ Loop set at queue`)
          return interaction.reply({embeds: [interactionEmbed]})
        } catch {
          interactionEmbed.setTitle("❌ No song playing").setColor(config.colors.no)
          return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
        }    
    }
}