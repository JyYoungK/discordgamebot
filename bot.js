const Discord = require('discord.js');
const PREFIX = "askbot: ";
const PREFIX2 = "gamebot: ";
const bot = new Discord.Client();
const config = require("./config.json");
//sql unavailable atm since it's not working
    //const = require("sqlite");
//.open("./score.sqlite");
var opt = ['spock', 'scissors', 'rock', 'paper', 'lizard'];
var moji = ['Spock, \:vulcan:', 'Scissors, \:scissors:', 'Rock, \:full_moon_with_face:', 'Paper, \:newspaper:', 'Lizard, \:lizard:'];
var uss = new Array(opt.length);
for (var i = 0; i < opt.length; i++) {
    uss[i] = '!' + opt[i];
}

bot.on('message', message => {
    if (message.content === 'ping') {
    	message.channel.send('PONG!');
  	}
    if (message.channel.type === "dm") return;
    function rps() {
      for (var i = 0; i < opt.length; i++) {
        if (message.content === uss[i]) {
          var resp = opt[Math.floor(Math.random()*opt.length)];
          var gene = moji[opt.indexOf(resp)];
          message.reply(gene);
          var uso = message.content.substr(1);
          if (resp === uso) {
            message.channel.send('tie');
            return 0.5;
          } else if (opt.indexOf(resp) > opt.indexOf(uso)) {
            if (opt.indexOf(uso) === 1 && opt.indexOf(resp) === 3) {
              message.channel.send('you win');
              return 1;
            } else if (opt.indexOf(uso) == 0 && opt.indexOf(resp) == 4) {
              message.channel.send('you win');
              return 1;
            } else {
              message.channel.send('you lose');
              return 0;
            }
          } else {
            if (opt.indexOf(resp) === 1 && opt.indexOf(uso) === 3) {
              message.channel.send('you lose');
              return 0;
            } else if (opt.indexOf(resp) == 0 && opt.indexOf(uso) == 4) {
              message.channel.send('you lose');
              return 0;
            } else {
              message.channel.send('you win');
              return 1;
            }
          }
        }
      }
    }

    if (!message.content.startsWith(config.prefix)) return; // Ignore messages that don't start with the prefix
    //Make it available when sql works
    // if (message.content.startsWith(config.prefix + "level")) {
    //     sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    //     if (!row) return message.reply("Your current level is 0");
    //       message.reply(`Your current level is ${row.level}`);
    //     });
    // } else if (message.content.startsWith(config.prefix + "points")) {
    //     sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    //     if (!row) return message.reply("sadly you do not have any points yet!");
    //       message.reply(`you currently have ${row.points} points, good going!`);
    //     });
    // }
    // function addp() {
    //   sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    //     if (!row) { // Can't find the row.
    //       sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    //     } else { // Can find the row.
    //     let curLevel = Math.floor(0.3 * Math.sqrt(row.points + 1));
    //     if (curLevel > row.level) {
    //         row.level = curLevel;
    //         sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
    //         message.reply(`Congratulations! You've leveled up to level **${curLevel}**! :tada::tada::tada: `);
    //     }
    //     sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    //     }
    //   }).catch(() => {
    //     console.error;
    //     sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
    //       sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    //     });
    //   });
    // }
    // if (rps() === 1) {
    //   addp();
    // }
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("games all day everyday", {type: "PLAYING"});

});

bot.on("message", function(message){


  if (message.author.equals(bot.user)) return;
  if (message.content == "Hello" || message.content == "hi" || message.content == "hello" || message.content == "Hi") {
    message.channel.send("Hello!!! I am also a bot! xD")};

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args0 = messageArray.slice(1);
  //let commandfile = bot.commands.get(cmd.slice(prefix.length));
  //if(commandfile) commandfile.run(bot,message,args0);

  //↓↓↓↓↓↓↓VERY DANGEROUS. THIS HAS TO BE HERE!
  if (!message.content.startsWith(PREFIX) && !message.content.startsWith(PREFIX2)) return;
  var args1 = message.content.substring(PREFIX.length).split(" ");
  var args2 = message.content.substring(PREFIX2.length).split(" ");

  switch (args1[0].toLowerCase()) {
    case "noticeme":
          message.channel.send(message.author.toString() + " I missed you too buddy!");
          break;
  }

  switch (args2[0].toLowerCase()) {

          case "info":
                message.channel.send("Yo! I'm the second bot programmed by Chocolate Rose");
                message.channel.send("Here are useful functions you can ask me");
                var embed = new Discord.RichEmbed()
                  .addField("gamebot: info", "Shows all the games I can play!", true)
                  .addField("!rps: `enter either rock, paper or scissors`", "I will play rock-paper-scissor game with you!", true)
                  .setColor(0xff00dc)
                  .setFooter("Was this message helpful?")
                  .setThumbnail(message.author.avatarURL)
                message.channel.send(embed);
                break;
  }
});

bot.login(process.env.BOT_TOKEN);
