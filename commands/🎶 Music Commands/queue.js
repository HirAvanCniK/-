const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json")
const { msg } = require("../../functions");

module.exports = {
    name: "queue",
    description: "Return the queue of songs",
    category: "🎶 Music Commands",
    usage: "queue",
    data:{
        name: "queue",
        description: "Return the queue of songs",
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
    
        let queue = distube.getQueue(interaction)
    
        if (!queue){
          return msg({
            interaction,
            color: "RED",
            title: "Empty queue",
            ephemeral: true
          })
        }
    
        var description = ""
        var index = 0
        for (let song in queue.songs){
          index++
          description += `**${index}.** ${queue.songs[song].name} ***${queue.songs[song].formattedDuration}***\n`
        }
    
        let embed = new EmbedBuilder()
          .setTitle(":cyclone: Queue :cyclone:")
          .setDescription(description)
          .setColor(config.colors.yes)
    
        interaction.reply({embeds: [embed]})    
    }
}