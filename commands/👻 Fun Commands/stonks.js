const Canvas = require('canvas');
const Discord = require(`discord.js`);
const config = require("../../config.json")
const path = require("path");
module.exports = {
    name: path.parse(__filename).name,
    category: "👻 Fun Commands",
    useage: `${path.parse(__filename).name} [@User]`,
  description: "*Image cmd in the style:* " + path.parse(__filename).name ,
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
		if(!user) user = message.author;		
        const channel = message.channel;
        if (!channel) return;
        const canvas = Canvas.createCanvas(700, 394);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('images/stonks.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(160, 95, 70, 0, Math.PI * 2, true);//position of img
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 85, 20, 150, 150);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'stonks.png');
        let fastembed2 = new Discord.MessageEmbed()
         
        .setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL).setFooter(client.user.username, config.AVATARURL)
        .setTimestamp()
        .setFooter(client.user.username, config.AVATARURL)
        .setImage("attachment://stonks.png")
        .attachFiles(attachment)
        const b = await message.channel.send(fastembed2);
    }
}