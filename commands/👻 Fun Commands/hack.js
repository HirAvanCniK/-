const Discord = require("discord.js");

module.exports = {
  name: "hack",
  description: "divent a fake hacker in server",
  category: "👻 Fun Commands",
  usage: "hack <user>",
  run: (client, message, args) => {
    function wait(ms) {
      let start = new Date().getTime();
      let end = start;
      while (end < start + ms) {
        end = new Date().getTime();
      }
    }

    const taggedUser = message.mentions.members.first();

    message.channel.send(`Hacking  ${taggedUser}...`).then((msg) => {
      msg.delete({ timeout: 1000 });
    });
    message.channel.send("`           | 0%`").then((msg) => {
      wait(93);
      msg.edit("`           | 7%`");
      wait(100);
      msg.edit("`           | 8%`");
      wait(20);
      msg.edit("`           | 9%`");
      wait(90);
      msg.edit("`#          | 12%`");
      wait(60);
      msg.edit("`#          | 14%`");
      wait(60);
      msg.edit("`#          | 17%`");
      wait(40);
      msg.edit("`##         | 20%`");
      wait(10);
      msg.edit("`##         | 21%`");
      wait(12);
      msg.edit("`##         | 22%`");
      wait(13);
      msg.edit("`##         | 24%`");
      wait(80);
      msg.edit("`##         | 29%`");
      wait(80);
      msg.edit("`###        | 31%`");
      wait(80);
      msg.edit("`###        | 36%`");
      wait(40);
      msg.edit("`####       | 41%`");
      wait(60);
      msg.edit("`####       | 47%`");
      wait(50);
      msg.edit("`#####      | 53%`");
      wait(35);
      msg.edit("`#####      | 58%`");
      wait(80);
      msg.edit("`######     | 66%`");
      wait(60);
      msg.edit("`#######    | 74%`");
      wait(20);
      msg.edit("`#######    | 79%`");
      wait(63);
      msg.edit("`########   | 80%`");
      wait(50);
      msg.edit("`########   | 85%`");
      wait(14);
      msg.edit("`#########  | 93%`");
      wait(70);
      msg.edit("`#########  | 97%`");
      wait(90);
      msg.edit("`########## | 100%`").then(() => {
        var messaggi = ["gmail.com", "hotmail.it", "tin.it"];

        var random = Math.floor(Math.random() * messaggi.length);

        let min = 1;
        let max = 9;

        let randomNumber1 = Math.round(Math.random() * max + min);
        let randomNumber2 = Math.round(Math.random() * max + min);
        let randomNumber3 = Math.round(Math.random() * max + min);
        let randomNumber4 = Math.round(Math.random() * max + min);

        var user = taggedUser.user.username;

        var id = taggedUser.user.id;

        var lettere1 = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        var lettere2 = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        var lettere3 = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        var lettere4 = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];

        var randomL1 = Math.floor(Math.random() * lettere1.length);
        var randomL2 = Math.floor(Math.random() * lettere2.length);
        var randomL3 = Math.floor(Math.random() * lettere3.length);
        var randomL4 = Math.floor(Math.random() * lettere4.length);

        var numero1 = randomNumber1;
        var numero2 = randomNumber2;
        var numero3 = randomNumber3;
        var numero4 = randomNumber4;

        var lettera1 = lettere1[randomL1];
        var lettera2 = lettere2[randomL2];
        var lettera3 = lettere3[randomL3];
        var lettera4 = lettere4[randomL4];
        //----------------------------------------------------------

        var cognome;
        var nome;
        var anno;
        var mese;
        var giorno;
        var randomSesso;
        var comuneCode;
        var controlChar;
        var provincia;

        var sesso = ["Maschio", "Femmina"];
        var randomSesso = Math.floor(Math.random() * sesso.length);

        var Annno = [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
        ];
        var randomAnno = Math.floor(Math.random() * Annno.length);

        var Mese = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
        var randomMese = Math.floor(Math.random() * Mese.length);

        var Giorno = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
        ];
        var randomGiorno = Math.floor(Math.random() * Giorno.length);

        var controlchhar = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        var randomChar = Math.floor(Math.random() * controlchhar.length);

        var city = [
          "FIRENZE",
          "LUCCA",
          "PISA",
          "SIENA",
          "PRATO",
          "AREZZO",
          "GROSSETO",
          "PISA",
          "VOLTERRA",
          "MASSA",
          "CARRARA",
          "EMPOLI",
          "CECINA",
          "PONTEDERA",
          "PONSACCO",
          "SAN MINIATO",
          "CAMAIORE",
          "CASCINA",
          "PISA",
          "FOLLONICA",
        ];
        var randomProvincia = Math.floor(Math.random() * city.length);

        nome = user;
        cognome = user;
        anno = Annno[randomAnno];
        mese = Mese[randomMese];
        giorno = Giorno[randomGiorno];
        controlChar = controlchhar[randomChar];
        provincia = city[randomProvincia];

        //----------------------------------------------------------

        const embed = new Discord.MessageEmbed()
          .setTitle(`${user} S̴̯̺͉̓E̸͎̳̐́I̶̺̽͜ ̴̨͉̹̈̀͜S̷̛̪̺T̸̪̭͓͠A̴̛̫̼̣͇̒T̸̹̐͋͑͝O̸̻̭̲̳̚͝ ̵̯̫̾̇̒H̴͇͖͓̑̓̓͝Ḁ̴͘͠͝C̸̺͖͋̽̀K̷͍͒͗̚͠E̶̹͑͝R̸͇̊̆͠͝A̷̱͗͌̌̎T̷̐ͅO̴̢͇͆̎ `)

          .setDescription(
            `**EMAIL:** ${user}@${messaggi[random]}\n**PASSWORD:** ${numero1}${lettera1}${numero2}${lettera2}${numero3}${lettera3}${numero4}${lettera4}\n**ID:** ${id}\n**NOME:** ${user}\n**COGNOME:** ${user}\n**NATO IL:** ${giorno}/${mese}/${anno}\n**SESSO:** ${sesso[randomSesso]}\n**CITTÁ:** ${provincia}`
          )
          .setColor(0x00ff00);
        message.channel.send(embed);
      });
    });
  },
};

/*
//fiscal code start

                //consonanti del cognome

                var consonantiCognome1 = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
                var consonantiCognome2 = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
                var consonantiCognome3 = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

                var randomconsonantiCognome1 = Math.floor(Math.random() * consonantiCognome1.length)
                var randomconsonantiCognome2 = Math.floor(Math.random() * consonantiCognome2.length)
                var randomconsonantiCognome3 = Math.floor(Math.random() * consonantiCognome3.length)

                //consonanti del nome

                var consonantiNome1 = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
                var consonantiNome2 = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
                var consonantiNome3 = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

                var randomconsonantiNome1 = Math.floor(Math.random() * consonantiNome.length)
                var randomconsonantiNome2 = Math.floor(Math.random() * consonantiNome.length)
                var randomconsonantiNome3 = Math.floor(Math.random() * consonantiNome.length)

                //cifre anno

                var cifreAnno = ["60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]

                var randomcifreAnno = Math.floor(Math.random() * cifreAnno.length)

                //lettere mese

                var lettereMese = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"]

                var randomlettereMese = Math.floor(Math.random() * lettereMese.length)

                */
