const { msg } = require("../../functions");

module.exports = {
  name: "removerole",
  description: "Remove role of a member",
  category: "👑 Moderation Commands",
  usage: "removerole <user> <role>",
  data:{
    name: "removerole",
    description: "Remove role of a member",
    options:[
      {
        name: "user",
        description: "The user to remove role",
        type: "USER",
        required: true
      },
      {
        name: "role",
        description: "The role to remove to user",
        type: "ROLE",
        required: true
      }
    ]
  },
  async execute(interaction){
    const user = interaction.options.getUser("user")
    const role = interaction.options.getRole("role")
    var target = interaction.guild.members.cache.get(user.id)
    if (!interaction.member.permissions.has("MANAGE_ROLES")){
      return msg({
        interaction,
        color: "RED",
        title: "You don't have permission",
        ephemeral: true
      })
    }
    if (!target.roles.cache.has(role.id)){
      return msg({
        interaction,
        color: "RED",
        title: `${target} doesn't have the role ${role}`,
        ephemeral: true
      })
    }
    try{
      await target.roles.remove(role);
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
      title: `${target} lost the role ${role}`
    })
  }
}
