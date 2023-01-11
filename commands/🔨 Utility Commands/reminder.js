const Discord = require("discord.js");
const config = require("../../config.json");
const fs = require("fs");

module.exports = {
    name: "reminder",
    category: "🔨 Utility Commands",
    description: "Gets the database with user reminders",
    usage: "reminder [add/remove] [thing]",
    data:{
        name: "reminder",
        description: "Gets the database with user reminders",
        options:[
            {
                name: "istruction",
                description: "What do you do",
                type: "STRING",
                required: false
            },
            {
                name: "thing",
                description: "The thing to be added/removed",
                type: "STRING",
                required: false
            }
        ]
    },
    execute(interaction){
        const istruction = interaction.options.getString("istruction") || "";
        const thing = interaction.options.getString("thing") || "";
        if(istruction == "" && thing == ""){
            const preview = JSON.parse(fs.readFileSync("./databases/reminder.json", "utf8"));
            if (!preview[interaction.user.id]) {
                preview[interaction.user.id] = [];
                fs.writeFileSync("./databases/reminder.json", JSON.stringify(preview));
                return interaction.reply("Database created successfully!")
            } else {
                const data = JSON.parse(fs.readFileSync("./databases/reminder.json", "utf8"));
                var fields = "";
                for (let i in data[interaction.user.id]) {
                    fields += `***${parseInt(i) + 1}***. ${data[interaction.user.id][i.toString()]}\n`;
                }
                let embed = new Discord.MessageEmbed()
                    .setAuthor(interaction.user.username)
                    .setTitle("Reminder")
                    .setColor(config.colors.yes)
                    .setDescription(fields);

                    interaction.reply({embeds: [embed]});
            }
        }
        else if(istruction != "" && thing != ""){
            const data = JSON.parse(fs.readFileSync("./databases/reminder.json", "utf8"));
            if (!data[interaction.user.id]) {
                return interaction.reply(`You cannot execute functions unless you have created the database first. Run '**${config.prefix}reminder**' to create it`)
            }
            function arrayRemove(arr, value) {
                return arr.filter(function (ele) {return ele != value});
            }
            if (istruction == "add") {
                data[interaction.user.id].push(thing);
                fs.writeFileSync("./databases/reminder.json", JSON.stringify(data));
                return interaction.reply(`'***${thing}***' added successfully to your database`)
            } else if (istruction == "remove") {
                const ray = data[interaction.user.id];
                if (!ray.includes(thing)) return interaction.reply(`'***${thing}***' element doesn't exist in your database`)
                const newRay = arrayRemove(ray, thing);
                data[interaction.user.id] = newRay;
                fs.writeFileSync("./databases/reminder.json", JSON.stringify(data));
                return interaction.reply(`'***${thing}***' removed successfully to your database`)
            } else {
                return interaction.reply({content: `'***${istruction}***' not a function`, ephemeral: true})
            }
        }
        else if(istruction == "" && thing != ""){
            return interaction.reply({content: "Please specify the istruction", ephemeral: true})
        }
        else{
            return interaction.reply({content: "Please specify the thing to be inserted/removed", ephemeral: true})
        }
    }
};
