const { msg } = require("../../functions");

module.exports = {
  name: "roleinfo",
  description: "Information of a role",
  category: "🤖 Information Commands",
  usage: "roleinfo <role>",
  data:{
    name: "roleinfo",
    description: "Information of a role",
    options:[
      {
        name: "role",
        description: "Role to extract information",
        type: "ROLE",
        required: true
      }
    ]
  },
  execute(interaction){
    const role = interaction.options.getRole("role")
    let rolemembers;
    if (role.members.size > 20) rolemembers = role.members.map((e) => `<@${e.id}>`).slice(0, 20).join(", ") + ` and ${role.members.size - 20} more members...`;
    if (role.members.size < 20) rolemembers = role.members.map((e) => `<@${e.id}>`).join(", ");
  
    let flds = [
      {
        name: "Role Members",
        value: rolemembers || "Not Found"
      },
      {
        name: "Role Permissions",
        value: "```" + role.permissions.toArray().join(", ") + "```"
      }
    ]

    return msg({
      interaction,
      color: role.color,
      fields: flds,
      description: `**Role Name:** <@&${role.id}>\n\n**Role ID:** **\`${role.id}\`**\n\n**Role Mentionable:** ${
        role.mentionable
        .toString()
        .replace("true", "Yes")
        .replace("false", "No")}\n\n**Role Members Size:** ${
        role.members.size || 0
      }`
    })
  }
}