const Discord = require("discord.js");
const config = require("../../config.json");
const fs = require("fs");

module.exports = {
    name: "reminder",
    category: "⚙️ Utility Commands",
    description: "Gets the database with user reminders",
    usage: "reminder [add/remove] [thing]",
    run: async (client, message, args) => {
        if (args[0] && !args[1])
            return message.reply("Please specify the thing to be inserted").then((msg) => { msg.delete({ timeout: 10000 }) });;
        if (args[0] && args[1]) {
            const data = JSON.parse(
                fs.readFileSync("./databases/reminder.json", "utf8")
            );
            if (!data[message.author.id]) {
                return message.reply(
                    `You cannot execute functions unless you have created the database first. Run '**${config.prefix}reminder**' to create it`
                ).then((msg) => { msg.delete({ timeout: 10000 }) });;
            }
            function arrayRemove(arr, value) {
                return arr.filter(function (ele) {
                    return ele != value;
                });
            }
            if (args[0].toLowerCase() == "add") {
                args.shift();
                thing = args.join(" ");
                data[message.author.id].push(thing);
                fs.writeFileSync("./databases/reminder.json", JSON.stringify(data));
                return message.reply(
                    `'***${thing}***' added successfully to your database`
                ).then((msg) => { msg.delete({ timeout: 10000 }) });;
            } else if (args[0].toLowerCase() == "remove") {
                args.shift();
                thing = args.join(" ");
                const ray = data[message.author.id];
                if (!ray.includes(thing))
                    return message.reply(
                        `'***${thing}***' element doesn't exist in your database`
                    ).then((msg) => { msg.delete({ timeout: 10000 }) });;
                const newRay = arrayRemove(ray, thing);
                data[message.author.id] = newRay;
                fs.writeFileSync("./databases/reminder.json", JSON.stringify(data));
                return message.reply(
                    `'***${thing}***' removed successfully to your database`
                ).then((msg) => { msg.delete({ timeout: 10000 }) });;
            } else {
                return message.reply(`'***${args[0]}***' not a function`).then((msg) => { msg.delete({ timeout: 10000 }) });;
            }
        }
        if (!args[0]) {
            const preview = JSON.parse(
                fs.readFileSync("./databases/reminder.json", "utf8")
            );
            if (!preview[message.author.id]) {
                preview[message.author.id] = [];
                fs.writeFileSync("./databases/reminder.json", JSON.stringify(preview));
                return message.reply("Database created successfully!").then((msg) => { msg.delete({ timeout: 10000 }) });;
            } else {
                const data = JSON.parse(
                    fs.readFileSync("./databases/reminder.json", "utf8")
                );
                var fields = "";
                for (let i in data[message.author.id]) {
                    fields += `***${parseInt(i) + 1}***. ${data[message.author.id][i.toString()]
                        }\n`;
                }
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username)
                    .setTitle("Reminder")
                    .setDescription(fields);

                message.reply(embed);
            }
        }
    },
};
