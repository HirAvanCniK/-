const { msg } = require("../../functions");

module.exports = {
  name: "invite",
  category: "🤖 Information Commands",
  description: "Invite the Bot to your Server",
  usage: "invite",
  data:{
    name: "invite",
    description: "Invite the Bot to your Server"
  },
  async execute(interaction){
    await interaction.client.application.fetch()
    let inviteLink = interaction.client.application.customInstallURL + "&applications.commands"
    return msg({
      interaction,
      title: `${interaction.client.user.username} invite`,
      description: `[INVITE ME NOW](${inviteLink})`
    })
  }
}

