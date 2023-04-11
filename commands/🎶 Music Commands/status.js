const { EmbedBuilder } = require("discord.js");
const config = require("../../config.json");
const { msg } = require("../../functions");

module.exports = {
    name: "status",
    description: "Status of song",
    category: "🎶 Music Commands",
    usage: "status",
    data:{
        name: "status",
        description: "Status of song",
    },
    execute(interaction){
      function formated_Time_to_secs(formatted_time){
        var secs = 0;
        let occorrenze = formatted_time.split(":").length - 1;
        if(occorrenze==1){
          secs += Number(formatted_time.split(":")[1]);
          secs += Number(formatted_time.split(":")[0])*60;
        }
        else if(occorrenze==2){
          secs += Number(formatted_time.split(":")[2]);
          secs += Number(formatted_time.split(":")[1])*60;
          secs += Number(formatted_time.split(":")[0])*60*60;
        }
        return secs;
      }
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
        let full_song = formated_Time_to_secs(queue.formattedDuration)
        let progress = formated_Time_to_secs(queue.formattedCurrentTime)
        let progress_percent = Math.floor(progress*100/full_song);
        let num_uguali = Math.floor(progress_percent*50/100)
        let uguali = "";
        for(let i=0; i<num_uguali; i++){
          uguali += "=";
        }
        let num_trattini = 50-num_uguali;
        let trattini="";
        for(let i=0; i<num_trattini; i++){
          trattini += "-";
        }
        let progressBar = "|"+uguali+trattini+"|"+" **"+queue.formattedCurrentTime+"/"+queue.formattedDuration+"**";
        return msg({
          interaction: interaction,
          title: "Status of song",
          description: progressBar,
          // thumbnail: queue.song.thumbnail,
          ephemeral: true
        })
    }
}