module.exports = {
    name: "say",
    category: "👻 Fun Commands",
    description: "Says text",
    usage: "say TEXT",
    run: async (client, message, args) => {
        if(!args) return message.reply("ADD SOMETHING TO SAY");
        message.channel.send(args.join(" ")).then(msg =>{
            try{
                if(msg.channel.type === "news")
                msg.crosspost()
           } catch (error) {
               console.log(error.stack.toString().red)
           }  
        })
    }
}
