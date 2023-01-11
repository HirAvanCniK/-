const config = require("../../config.json");
const { msg } = require("../../functions");

module.exports = {
  name: "support",
  category: "🤖 Information Commands",
  description: "Shows you the Support Server",
  usage: "support",
  data:{
    name: "support",
    description: "Shows you the Support Server"
  },
  execute(interaction){
    msg(
      interaction,
      null,
      null,
      null,
      "Support",
      `[\`Server\`](${config.serverInviteURL})`
    )
  }
}