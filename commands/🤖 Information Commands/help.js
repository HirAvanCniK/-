const fs = require("fs");
const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "help",
  category: "🤖 Information Commands",
  description: "list of all commands",
  usage: "help [command_name]",
  data:{
    name: "help",
    description: "Shows Information about the Developer",
    options:[
      {
        name: "command",
        description: "The command to see help",
        type: "STRING",
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
      let embed = new Discord.MessageEmbed().setFooter(`Created by ${interaction.client.application.owner.tag}`, interaction.client.user.avatarURL())
      let notFind = true;
      fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        for (let file of commands) {
          let pull = require(`../${dir}/${file}`);
          if (pull.name == command.toLowerCase()) {
            embed.setTitle(`${capitalizeFirstLetter(pull.name)} command`)
            embed.setDescription(`***Category***: ${pull.category}\n***Description***: ${pull.description}\n***Usage***: ${config.prefix}${pull.usage}`);
            notFind = false;
            break
          }
        }
      })
      if(notFind){
        embed.setTitle(`Unknown command '${command}'`);
      }
      return interaction.reply({embeds: [embed], ephemeral: true, fetchReply: true})
    } else {
      let commandsName = {};
      var row = new Discord.MessageActionRow()
      let messageMenu = new Discord.MessageSelectMenu().setCustomId("helpMenu").setPlaceholder("📑 Help menu 📑")
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