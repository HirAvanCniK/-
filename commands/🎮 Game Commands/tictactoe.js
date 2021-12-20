const { tictactoe } = require('reconlx')

module.exports = {
    name: 'tris',
    category: "🎮 Game Commands",
    description: "play a famous game tictactoe",
    usage: "tris <user>",
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}