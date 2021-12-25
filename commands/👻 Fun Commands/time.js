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
        var giorno;
        var emoji;
        if(ora < 12 && ora > 5){
            giorno = "Buongiorno."
            emoji = "☀️"
        }
        if(ora >= 12 && ora < 18){
            giorno = "Buon pomeriggio."
            emoji = "☀️"
        }
        if(ora >= 18 && ora < 24){
            giorno = "Buonasera."
            emoji = "🌙"
        }
        if(ora >= 0 && ora < 5){
            giorno = "Buonanotte."
            emoji = "💤" 
        }
        if(ora >= 10 && minuto >= 10){
            message.channel.send('Ora attuale ' + emoji + ' ' + ora + ':' + minuto + " " + giorno);
            return;
        }
        if(ora >= 10 && minuto < 10){
            message.channel.send('Ora attuale ' + emoji + ' ' + ora + ':' + "0" + minuto + " " + giorno);
            return;
        }
        if(ora < 10 && minuto >= 10){
            message.channel.send('Ora attuale ' + emoji + ' ' + "0" + ora + ':' + minuto + " " + giorno);
            return;
        }
        if(ora < 10 && minuto < 10){
            message.channel.send('Ora attuale ' + emoji + ' ' + "0" + ora + ':' + "0" + minuto + " " + giorno);
            return;
        }

    }
}