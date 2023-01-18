const { msg } = require("../../functions");

module.exports = {
  name: "unmute",
  description: "Toggle mute of a member",
  category: "👑 Moderation Commands",
  usage: "unmute <user>",
  data:{
    name: "unmute",
    description: "Toggle mute of a member",
    options:[
      {
        name: "user",
        description: "The user to unmute",
        type: "USER",
        required: true
      }
    ]
  },
  async execute(interaction){
    const user = interaction.options.getUser("user")
    const Member = interaction.guild.members.cache.get(user.id)
    if (!interaction.member.permissions.has("MANAGE_MESSAGES", "ADMINISTRATOR")){
      return msg({
        interaction,
        color: "RED",
        title: "You don't have permission",
        ephemeral: true
      })
    }
    const role = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === "muted")
    if (!Member.roles.cache.has(`${role.id}`)){
      return msg({
        interaction,
        color: "RED",
        title: `${Member} has not mutated`,
        ephemeral: true
      })
    }
    await Member.roles.remove(role)
    return msg({
      interaction,
      title: `${Member} is now unmutated`
    })
  }
}
