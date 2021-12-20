const Discord = require('discord.js');

module.exports = {
    name: 'time',
    description: "send the time",
    aliases: ["time"],
    category: "👻 Fun Commands",
    usage: "time",
    run: (client, message) => {
        var data = new Date();
        var ora = data.getHours();
        var minuto = data.getMinutes();
        if(ora >= 10 && minuto >= 10){
            message.channel.send('Ora attuale :alarm_clock:' + ' ' + ora + ':' + minuto);
            return;
        }
        if(ora >= 10 && minuto < 10){
            message.channel.send('Ora attuale :alarm_clock:' + ' ' + ora + ':' + "0" + minuto);
            return;
        }
        if(ora < 10 && minuto >= 10){
            message.channel.send('Ora attuale :alarm_clock:' + ' ' + "0" + ora + ':' + minuto);
            return;
        }
        if(ora < 10 && minuto < 10){
            message.channel.send('Ora attuale :alarm_clock:' + ' ' + "0" + ora + ':' + "0" + minuto);
            return;
        }
    }
}