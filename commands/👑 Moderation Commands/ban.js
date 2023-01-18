const { msg } = require("../../functions");

module.exports = {
  name: "ban",
  description: "Ban an user",
  category: "👑 Moderation Commands",
  usage: "ban <user>",
  data:{
    name: "ban",
    description: "Ban an user",
    options:[
      {
        name: "user",
        description: "The user to ban",
        type: "USER",
        required: true
      }
    ]
  },
  execute(interaction){
    const user = interaction.options.getUser("user")
    var utenteban = interaction.guild.members.cache.get(user.id)
    if (!interaction.member.permissions.has("BAN_MEMBERS")){
      return msg({
        interaction,
        color: "RED",
        title: "You don't have permission",
        ephemeral: true
      })
    }
    if (!utenteban?.kickable){
      return msg({
        interaction,
        color: "RED",
        title: "I can't ban this user",
        ephemeral: true
      })
    }
    try{
      utenteban.ban()
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
      title: `${utenteban} has been banned`
    })
    interaction.reply(`${utenteban} has been banned`)
  }
}