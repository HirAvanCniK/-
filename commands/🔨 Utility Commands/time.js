module.exports = {
  name: "time",
  description: "send the time",
  category: "🔨 Utility Commands",
  usage: "time",
  data: {
    name: "time",
    description: "send the time"
  },
  execute(interaction){
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
      interaction.reply(
        "Current time " + emoji + " " + ora + ":" + minuto + " " + giorno
      );
      return;
    }
    if (ora >= 10 && minuto < 10) {
      interaction.reply(
        "Current time " + emoji + " " + ora + ":" + "0" + minuto + " " + giorno
      );
      return;
    }
    if (ora < 10 && minuto >= 10) {
      interaction.reply(
        "Current time " + emoji + " " + "0" + ora + ":" + minuto + " " + giorno
      );
      return;
    }
    if (ora < 10 && minuto < 10) {
      interaction.reply(
        "Current time " +
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
  }
}