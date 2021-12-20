module.exports = {
    name: "shutdown",
    description: "shutdown the bot",
    aliases: ["sleep"],
    usage: "/shutdown",
    example: "/shutdown",
    category: "👑 Creator Commands",
    cooldown: 5,
    run: async (client, message, args) => {
        if (message.author.id !== "536798044939878403") return message.reply('Non sei il mio creatore :space_invader:')
        try {
            await message.channel.send('Shutdowning...').then(i => i.delete({ timeout: 5000 }))
            await message.channel.send('Sono OFFLINE').then(i => i.delete({ timeout: 5000 }))
            process.exit()
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`)
        }
    }
}