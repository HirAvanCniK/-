const { msg } = require("../../functions");

module.exports = {
  name: "developer",
  category: "🤖 Information Commands",
  description: "Shows Information about the Developer",
  usage: "developer",
  data:{
    name: "developer",
    description: "Shows Information about the Developer"
  },
  async execute(interaction){
    await interaction.client.application.fetch()
    msg(
      interaction,
      "",
      [],
      interaction.client.application.owner.tag,
      "",
      `
      > Hello I am **IRVANNI** <@536798044939878403>
      
      > I am a developer of websites, applications, bots and more [SEE IT](https://irvanni.ga/)
      
      > I hope you like my stuff :v: :heart:
      
      `,
      interaction.client.application.owner.avatarURL()
    )
  }
};
