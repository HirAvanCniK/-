module.exports = {
    name: "add-role",
    description: "add role of a member",
    aliases: ["add-role"],
    category: "⛔️ Moderation Commands",
    usage: "add-role <user> <role>",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Non hai il permesso.");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Non ho il permesso.");

        const target = message.mentions.members.first();
        if (!target) return message.reply("Non hai mensionato l'utente.");
        const role = message.mentions.roles.first();
        if (!role) return message.reply("Non hai mensionato il ruolo.");
        await target.roles.add(role);

        message.channel.send(`${target.user.username} ha ricevuto il ruolo -> ${role}`);
    }
}