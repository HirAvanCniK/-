const { readdirSync } = require("fs");
const Discord = require("discord.js");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const config = require("../../config.json");

module.exports = {
  name: "help",
  category: "🤖 Information Commands",
  description: "list of all commands",
  usage: "help [command_name]",
  run: async (client, message, args) => {
    if (args[0]) {
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        for (let file of commands) {
          let pull = require(`../${dir}/${file}`);
          if (pull.name == args[0].toLowerCase()) {
            let embed = new Discord.MessageEmbed()
              .setAuthor(`${capitalizeFirstLetter(pull.name)} command`)
              .setDescription(
                `***Category***: ${pull.category}\n***Description***: ${pull.description}\n***Usage***: ${config.prefix}${pull.usage}`
              );
            message.reply(embed);
            break;
          }
        }
      });
    } else {
      let option1 = new MessageMenuOption()
        .setLabel("Music-Filter Commands")
        .setValue("Option 1")
        .setDefault()
        .setEmoji("♨️");
      let option2 = new MessageMenuOption()
        .setLabel("Utility Commands")
        .setValue("Option 2")
        .setDefault()
        .setEmoji("⚙️");
      let option3 = new MessageMenuOption()
        .setLabel("Moderation Commands")
        .setValue("Option 3")
        .setDefault()
        .setEmoji("⛔");
      let option4 = new MessageMenuOption()
        .setLabel("Game Commands")
        .setValue("Option 4")
        .setDefault()
        .setEmoji("🎮");
      let option5 = new MessageMenuOption()
        .setLabel("Music Commmands")
        .setValue("Option 5")
        .setDefault()
        .setEmoji("🎶");
      let option6 = new MessageMenuOption()
        .setLabel("Creator Commands")
        .setValue("Option 6")
        .setDefault()
        .setEmoji("👑");
      let option7 = new MessageMenuOption()
        .setLabel("Fun Commands")
        .setValue("Option 7")
        .setDefault()
        .setEmoji("👻");
      let option8 = new MessageMenuOption()
        .setLabel("School Commands")
        .setValue("Option 8")
        .setDefault()
        .setEmoji("📋");
      let option9 = new MessageMenuOption()
        .setLabel("NSFW Commands")
        .setValue("Option 9")
        .setDefault()
        .setEmoji("🔞");
      let option10 = new MessageMenuOption()
        .setLabel("Information Commands")
        .setValue("Option 10")
        .setDefault()
        .setEmoji("🤖");
      let selection = new MessageMenu()
        .setID("Selection")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Click here to choose which commands to view!")
        .addOption(option1)
        .addOption(option2)
        .addOption(option3)
        .addOption(option4)
        .addOption(option5)
        .addOption(option6)
        .addOption(option7)
        .addOption(option8)
        .addOption(option9)
        .addOption(option10);
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("HELP MENÙ!");

      let menumsg = await message.channel.send(embed, selection);
      function menuselection(menu) {
        let commandsName = {};
        readdirSync("./commands/").forEach((dir) => {
          const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );
          for (let file of commands) {
            let pull = require(`../${dir}/${file}`);
            if (!commandsName[dir.slice(3)]) {
              commandsName[dir.slice(3)] = pull.name;
            } else {
              commandsName[dir.slice(3)] += "," + pull.name;
            }
          }
        });
        switch (menu.values[0]) {
          case "Option 1":
            desc = ""
            array = commandsName["Music-Filter Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed1 = new Discord.MessageEmbed()
              .setTitle("♨️ Music-Filter Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed1, true);
            break;
          case "Option 2":
            desc = ""
            array = commandsName["Utility Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed2 = new Discord.MessageEmbed()
              .setTitle("⚙️ Utility Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed2, true);
            break;
          case "Option 3":
            desc = ""
            array = commandsName["Moderation Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed3 = new Discord.MessageEmbed()
              .setTitle("⛔️ Moderation Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed3, true);
            break;
          case "Option 4":
            desc = ""
            array = commandsName["Game Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed4 = new Discord.MessageEmbed()
              .setTitle("🎮 Game Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed4, true);
            break;
          case "Option 5":
            desc = ""
            array = commandsName["Music Commmands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed5 = new Discord.MessageEmbed()
              .setTitle("🎶 Music Commmands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed5, true);
            break;
          case "Option 6":
            desc = ""
            array = commandsName["Creator Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed6 = new Discord.MessageEmbed()
              .setTitle("👑 Creator Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed6, true);
            break;
          case "Option 7":
            desc = ""
            array = commandsName["Fun Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed7 = new Discord.MessageEmbed()
              .setTitle("👻 Fun Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed7, true);
            break;
          case "Option 8":
            desc = ""
            array = commandsName["School Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed8 = new Discord.MessageEmbed()
              .setTitle("📋 School Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed8, true);
            break;
          case "Option 9":
            desc = ""
            array = commandsName["NSFW Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed9 = new Discord.MessageEmbed()
              .setTitle("🔞 NSFW Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed9, true);
            break;
          case "Option 10":
            desc = ""
            array = commandsName["Information Commands"].split(",")
            for (let name in array){
                if (desc == ""){
                    desc = `***➤ ${array[name]}***`
                }else{
                    desc += `\n***➤ ${array[name]}***`
                }
            }
            const embed10 = new Discord.MessageEmbed()
              .setTitle("🤖 Information Commands")
              .setFooter(
                `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`,
                client.user.displayAvatarURL()
              )
              .setDescription(desc);
            menu.reply.send(embed10, true);
            break;
        }
      }

      client.on("clickMenu", (menu) => {
        if (menu.message.id == menumsg.id) {
          if (menu.clicker.user.id == message.author.id) menuselection(menu);
          else
            menu.reply.send(":x: you are not allowed to pick something", true);
        }
      });
    }
  },
};
