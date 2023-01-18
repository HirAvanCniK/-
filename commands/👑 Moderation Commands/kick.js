const { msg } = require("../../functions");

module.exports = {
  name: "kick",
  description: "kick an user",
  category: "👑 Moderation Commands",
  usage: "kick <user>",
  data:{
    name: "kick",
    description: "kick an user",
    options:[
      {
        name: "user",
        description: "The user to kick",
        type: "USER",
        required: true
      }
    ]
  },
  execute(interaction){
    const user = interaction.options.getUser("user")
    var utenteKick = interaction.guild.members.cache.get(user.id)
    if (!interaction.member.permissions.has("KICK_MEMBERS")){
      return msg({
        interaction,
        color: "RED",
        title: "You don't have permission",
        ephemeral: true
      })
    }
    if (!utenteKick?.kickable){
      return msg({
        interaction,
        color: "RED",
        title: "I can't kick this user",
        ephemeral: true
      })
    }
    try{
      utenteKick.kick()
    }catch{
      return msg({
        interaction,
        color: "RED",
        title: "I don't have permission",
        ephemeral: true
      })
    }
    return msg({
      interaction,
      title: `${utenteKick} has been kicked`
    })
  }
}