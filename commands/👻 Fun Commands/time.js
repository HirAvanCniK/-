module.exports = {
  name: "time",
  description: "send the time",
  category: "👻 Fun Commands",
  usage: "time",
  run: (client, message) => {
    var data = new Date();
    var ora = data.getHours();
    var minuto = data.getMinutes();
    var giorno;
    var emoji;
    if (ora < 12 && ora > 5) {
      giorno = "Good morning";
      emoji = "☀️";
    }
    if (ora >= 12 && ora < 18) {
      giorno = "Good afternoon";
      emoji = "☀️";
    }
    if (ora >= 18 && ora < 24) {
      giorno = "Good evening";
      emoji = "🌙";
    }
    if (ora >= 0 && ora < 5) {
      giorno = "Good night";
      emoji = "💤";
    }
    if (ora >= 10 && minuto >= 10) {
      message.channel.send(
        "Ora attuale " + emoji + " " + ora + ":" + minuto + " " + giorno
      );
      return;
    }
    if (ora >= 10 && minuto < 10) {
      message.channel.send(
        "Ora attuale " + emoji + " " + ora + ":" + "0" + minuto + " " + giorno
      );
      return;
    }
    if (ora < 10 && minuto >= 10) {
      message.channel.send(
        "Ora attuale " + emoji + " " + "0" + ora + ":" + minuto + " " + giorno
      );
      return;
    }
    if (ora < 10 && minuto < 10) {
      message.channel.send(
        "Ora attuale " +
          emoji +
          " " +
          "0" +
          ora +
          ":" +
          "0" +
          minuto +
          " " +
          giorno
      );
      return;
    }
  },
};
