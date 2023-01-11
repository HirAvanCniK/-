module.exports = {
  name: "addrole",
  description: "Add role of a member",
  category: "👑 Moderation Commands",
  usage: "addrole <user> <role>",
  data:{
    name: "addrole",
    description: "Add role of a member",
    options:[
      {
        name: "user",
        description: "The user to add role",
        type: "USER",
        required: true
      },
      {
        name: "role",
        description: "The role to add to user",
        type: "ROLE",
        required: true
      }
    ]
  },
  async execute(interaction){
    const user = interaction.options.getUser("user")
    const role = interaction.options.getRole("role")
    var target = interaction.guild.members.cache.get(user.id)
    if (!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.reply({content: "You don't have permission", ephemeral: true})
    if (target.roles.cache.has(role.id)) return interaction.reply({content: `${target} already has the role ${role}`, ephemeral: true})
    try{
      await target.roles.add(role);
    }catch{return interaction.reply({content: "I don't have permission", ephemeral: true})}
    interaction.reply(`${target} received role ${role}`)
  }
}
