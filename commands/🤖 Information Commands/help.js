const fs = require("fs");
const Discord = require("discord.js");
const config = require("../../config.json");
const { msg } = require("../../functions");
const { ApplicationCommandOptionType } = require('../../index');


module.exports = {
  name: "help",
  category: "🤖 Information Commands",
  description: "List of all commands",
  usage: "help [command_name]",
  data:{
    name: "help",
    description: "List of all commands",
    options:[
      {
        name: "command",
        description: "The command to see help",
        type: ApplicationCommandOptionType.String,
        required: false
      }
    ]
  },
  execute(interaction){
    const command = interaction.options.getString("command") || "";
    if (command != "") {
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      let notFind = true;
      let title
      let desc
      fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        for (let file of commands) {
          let pull = require(`../${dir}/${file}`);
          if (pull.name == command.toLowerCase()) {
            title = `${capitalizeFirstLetter(pull.name)} command`
            desc = `***Category***: ${pull.category}\n***Description***: ${pull.description}\n***Usage***: ${config.prefix}${pull.usage}`
            notFind = false;
            break
          }
        }
      })
      if(notFind){
        title = `Unknown command '${command}'`
      }
      return msg({
        interaction,
        title: title,
        description: desc,
        ephemeral: true
      })
    } else {
      let commandsName = {};
      var row = new Discord.ActionRowBuilder()
      let messageMenu = new Discord.StringSelectMenuBuilder().setCustomId("helpMenu").setPlaceholder("📑 Help menu 📑")
      var options = []
      fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        for (let file of commands) {
          let pull = require(`../${dir}/${file}`);
          if (!commandsName[dir]) {
            commandsName[dir] = pull.name;
          } else {
            commandsName[dir] += "," + pull.name;
          }
        }
      })
      for (let category in commandsName){
        options.push({label: category, value: category})
      }
      messageMenu.addOptions(options)
      row.addComponents(messageMenu)
      return interaction.reply({components: [row], ephemeral: true})
    }
  }
}