const { Command } = require("reconlx");
const ms = require('ms');
module.exports = new Command({
    name: "timeout",
    description: "timeout temporarily an user",
    aliases: ["timeout"],
    category: "⛔️ Moderation Commands",
    usage: "timeout <user> <sec> <reason>",
    options: [
        {
            name: "user",
            description: "member to perform the timeout on",
            type: "USER",
            required: true
        },
        {
            name: "length",
            description: "length of timeout",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "reason for this timeout",
            type: "STRING",
            required: true
        }
    ],
    run : async({ interaction }) => {
        const user = interaction.options.getUser('user')
        const length = interaction.options.getString('length')
        const reason = interaction.options.getString('reason')
        const member = interaction.guild.cache.get(user.id)
        const timeInMs = ms(length);
        if(!timeInMs)
        return interaction.followUp("Please specify a valid time!");

        member.timeout(timeInMs, reason);
        interaction.followUp(`${user} has been timeout-ed for ${length}! (${reason})`);

    }
})