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
    if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({content: "You don't have permission", ephemeral: true})
    if (!utenteKick?.kickable) {return interaction.reply({ content: "I can't kick this user", ephemeral: true })}
    try{
      utenteKick.kick()
    }catch{return interaction.reply({content: "I don't have permission", ephemeral: true})}
    interaction.reply(`${utenteKick} has been kicked`)
  }
}