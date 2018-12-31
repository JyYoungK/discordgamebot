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
    //sql unavailable atm since it's not working
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
     if (rps() === 1) {
    //sql unavailable atm since it's not working
    //   addp();
     }
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("games all day everyday", {type: "PLAYING"});

});

bot.on("message", function(message){


  if (message.author.equals(bot.user)) return;
  if (message.content == "Hello" || message.content == "hi" || message.content == "hello" || message.content == "Hi") {
    message.channel.send("Hello!!! I am also a bot! xD")};
if (message.content.startsWith(config.prefix + "clock")) {
    //Starts the game + SetUp
      message.reply(`🤖: 'You will now begin a surviving game'`);

      const filt = (msg) => (msg.author.id === message.author.id) && ["1","2"].includes(msg.content);
      const opts = { maxMatches: 1, time: 20000, errors: [ 'time' ] }
      let playerPosition = random(), hourPosition = random(), minPosition = random(), secPosition = random(), bot1 = random(), bot2 = random(), bot3 = random(), bot4 = random(), bot5 = random();
      let life = 1;
      let level = 1;

      //Decides the difficulty
      message.channel.send("🤖: 'Please select the difficulty. 1: Easy👶[+2000 EXP]  2: Hard👹[+5000 EXP]'");
      message.channel.send("You have 20 seconds");

      message.channel.awaitMessages(filt, opts)
      .then(col => {
        const m = col.first().content
        const val1 = m === "1";
        const val2 = m === "2";
        //const val = m === "1" ? true : false
        if(val1) {
          message.channel.send("🤖: 'You have selected an easy difficulty👶'");
          message.channel.send(`🤖: 'You have spawned on position ${playerPosition}'`);
          if (playerPosition-1 == hourPosition || playerPosition-1 == minPosition || playerPosition-1 == secPosition || playerPosition+1 == hourPosition || playerPosition+1 == minPosition || playerPosition+1 == secPosition){
            message.channel.send(`🤖: 'Watch out! There is something near you'`);
          }
          else{
            message.channel.send(`🤖: 'It seems like there isn't anything near you yet'`);
          }

          game(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
        }
        else {
          message.channel.send("🤖: 'You have selected a hard difficulty👹. Sorry this mode is currently under a development'");
        }
      })
      .catch(err => {
        message.channel.send("🤖: 'You took too long! The game has ended 😥'");
      })
  }

  function random() {
    return Math.floor(Math.random() * 11)+1
  }

  function game(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
      //Decides how many space to Move
      const filt = (msg) => (msg.author.id === message.author.id) && ["1","2"].includes(msg.content);
      const opts = { maxMatches: 1, time: 20000, errors: [ 'time' ] }
      message.channel.send("🤖: 'Please select your action. 1: Move Once 2: Move Twice'");
      message.channel.send("You have 20 seconds");
      message.channel.awaitMessages(filt, opts)
      .then(col => {
        const m = col.first().content
        const val = m === "1" ? true : false
        if(val) {
          //Decides the direction
          message.channel.send("🤖: 'You have moved once'");
          message.channel.send("🤖: 'Please select the direction to move. 1: Move Up 2: Move Down'");
          message.channel.send("You have 20 seconds");
          message.channel.awaitMessages(filt, opts)
          .then(col => {
            const m = col.first().content
            const val = m === "1" ? true : false
            if(val) {
              playerPosition += 1;
              message.channel.send("🤖: 'You have moved up👆'");
            }
            else {
              playerPosition -= 1;
              message.channel.send("🤖: 'You have moved down👇'");
            }

            move(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
          })
          .catch(err => {
            message.channel.send("🤖: 'You took too long! The game has ended 😥'");
          })
        }
        else{
          message.channel.send("🤖: 'You have moved twice'");
          message.channel.send("🤖: 'Please select the direction to move. 1: Move Up 2: Move Down'");
          message.channel.send("You have 20 seconds");
          message.channel.awaitMessages(filt, opts)
          .then(col => {
            const m = col.first().content
            const val = m === "1" ? true : false
            if(val) {
              playerPosition += 2;
              message.channel.send("🤖: 'You have moved up👆'");
            }
            else {
              playerPosition -= 2;
              message.channel.send("🤖: 'You have moved down👇'");
            }


            move(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
          })
          .catch(err => {
            message.channel.send("🤖: 'You took too long! The game has ended 😥'");
          })
        }
      })
      .catch(err => {
        message.channel.send("🤖: 'You took too long! The game has ended 😥'");
      })
    }


  function move(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
    hourPosition = hourPosition + 1;
    minPosition = minPosition + 2;
    secPosition = secPosition + 3;

    if (playerPosition == 13){
      playerPosition = 1;
    }

    if (playerPosition == 14) {
      playerPosition = 2;
    }

    if (playerPosition == -1){
      playerPosition = 12;
    }

    if (playerPosition == -2){
      playerPosition = 11;
    }

    if (hourPosition > 12){
      hourPosition = 1;
    }

    if (minPosition == 13){
      minPosition = 1;
    }

    if (minPosition == 14){
      minPosition = 2;
    }

    if (secPosition == 13){
      secPosition = 1;
    }

    if (secPosition == 14){
      secPosition = 2;
    }

    if (secPosition == 15){
      secPosition = 3;
    }

    if (bot1 == 13){
      bot1 = 1;
    }

    if (bot2 == 13){
      bot2 = 1;
    }

    if (bot3 == 13){
      bot3 = 1;
    }

    if (bot4 == 13){
      bot4 = 1;
    }

    if (bot5 == 13){
      bot5 = 1;
    }
    //message.channel.send(`🤖: 'You are now on position ${playerPosition}'`);
    fate(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition)
  }

  function fate(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){

    message.channel.send(`🤖: -------Dead or Alive Report-------`);

    if (playerPosition == hourPosition || playerPosition == minPosition || playerPosition == secPosition){

      if (bot1 == hourPosition || bot1 == minPosition || bot1 == secPosition ){
        message.channel.send(`🤖: 'Alistar🐮 died at position ${playerPosition}'`);
      }

      if (bot2 == hourPosition || bot2 == minPosition || bot2 == secPosition ){
        message.channel.send(`🤖: 'Wukong🐵 died at position ${playerPosition}'`);
      }

      if (bot3 == hourPosition || bot3 == minPosition || bot3 == secPosition ){
        message.channel.send(`🤖: 'Mundo🧟 died at position ${playerPosition}'`);
      }

      if (bot4 == hourPosition || bot4 == minPosition || bot4 == secPosition ){
        message.channel.send(`🤖: 'Udyr🐻 died at position ${playerPosition}'`);
      }

      if (bot5 == hourPosition || bot5 == minPosition || bot5 == secPosition ){
        message.channel.send(`🤖: 'Rengar🦁 died at position ${playerPosition}'`);
      }

      if (playerPosition == hourPosition){
        message.channel.send("🤖: 'Oops! Sorry you couldn't escape the death from time'");
        message.channel.send(`🤖: 'You got caught by an hour-clock-hand at ${playerPosition}'`);
      }
      if (playerPosition == minPosition){
        message.channel.send("🤖: 'Oops! Sorry you couldn't escape the death from time'");
        message.channel.send(`🤖: 'You got caught by an minute-clock-hand at ${playerPosition}'`);
      }
      if (playerPosition == secPosition){
        message.channel.send("🤖: 'Oops! Sorry you couldn't escape the death from time'");
        message.channel.send(`🤖: 'You got caught by an second-clock-hand at ${playerPosition}'`);
      }
    }
    else {
      level ++;
      if (level >10){
        message.channel.send(`🤖: 'Congratulations~🎉!!! you have finished a game!👑'`);
        message.channel.send(`🤖: 'You have earned 5000 EXP!'`);
      }
      else {
        // message.channel.send(`Hour on position ${hourPosition}`);
        // message.channel.send(`Min on position ${minPosition}`);
        // message.channel.send(`Sec on position ${secPosition}`);
        message.channel.send(`🤖: 'Congratulations you survived level ${level-1}, you are moving on to the level ${level}🔥'`);
        game(bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
      }
    }
  }
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
