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

      //assign clock positions
      let playerPosition = random(), hourPosition = random(), minPosition = random(), secPosition = random();
      //SetUp Values
      let life = 2, flashlight = 5, level = 1, difficulty = 0;

      //assign different positions for bots
      var a = [1,2,3,4,5,6,7,8,9,10,11,12];
      var n;
      var r=[];
      for (n=1; n<=5; ++n)
      {
        var i = Math.floor((Math.random() * (12-n)) + 1);
        r.push(a[i]);
        a[i] = a[12-n];
      }
      let bot1 = r[0], bot2 = r[1], bot3 = r[2], bot4 = r[3], bot5 = r[4];

      //assign different positions for snake/flashlight
      var r=[];
      for (n=1; n<=3; ++n)
      {
        var i = Math.floor((Math.random() * (12-n)) + 1);
        r.push(a[i]);
        a[i] = a[12-n];
      }
      snake1 = r[0], snake2 = r[1], flash = r[2];

      message.reply(`🤖: 'You will now begin a surviving game'`);
      const filt = (msg) => (msg.author.id === message.author.id) && ["1","2"].includes(msg.content);
      const opts = { maxMatches: 1, time: 60000, errors: [ 'time' ] }
      const opts2 = { maxMatches: 1, time: 300000, errors: [ 'time' ] }
      message.channel.send("🤖: 'Do you wish to go over a rule?'" + '\n1: Yes' + '\n2: No');

      message.channel.awaitMessages(filt, opts)
      .then(col => {
        const m = col.first().content
        const val1 = m === "1";
        const val2 = m === "2";
        if(val1) {
          message.channel.send("🤖: 'Okay, let's go over some rules." + `\nYou are trapped inside a clock 🕰️` + `\n(The position goes from 1~12)` + `\nYour goal is to survive certain amount of levels (depending on the difficutly)`
          + `\nThere are 3️⃣ main things to avoid. An hour-hand clock moves up once, a minute-hand moves up twice, a second-hand moves up three times every turn.`
          + `\nIf your position matches with any of the clock at the end of the turn, you will die 💀.`
          + `\nBefore the clock moves, you get to choose either to move up ☝️ or down 👇, and either by once 1️⃣ or twice 2️⃣ every turn.`
          + `\nTip on how to survive 💁 : you would need to be aware of where the clock hands are, and your current position.`
          + `\nTo help you with survival, you are given 5 flashlights 🔦.`
          + `\nYou get to use flashlight to check your surroundings.`
          + `\nThe surroundings could either show a clock-hand or animals.`
          + `\nAll animals 🐖 have different abilities and tell youg different things. They are there to either help you or harm you. You find out which one is the bad one! 😉`
          + `\nLastly, when you walk around, you might step on something 🤔.`
          + `\nIt could be another flashlight or a snake🐍 !`
          + `\nYou probably don't want to get bit by a snake because they are painful! 😥`
          + `\nThis game will test your decision making and how smart you are 🧠.`
          + `\nIf you think you are brave enough to test your knowledge, let's try it 🤩 !!!`
          + `\nType anything to start.`
          + "\n`-This game will shut down in 5 minutes if you don't respond-`")

          message.channel.awaitMessages(filt, opts2)
          .then(col => {
            if (val1){
              setUp(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
            }
            else {
              setUp(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
            }
          }).catch(err => {
                message.channel.send("🤖: 'You took too long! The game has ended 😥'");
            })
        }
        else if (val2){
          setUp(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
        }
      })
      .catch(err => {
        message.channel.send("🤖: 'You took too long! The game has ended 😥'");
      })
  }

  function setUp(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
    const filt = (msg) => (msg.author.id === message.author.id) && ["1","2"].includes(msg.content);
    const opts = { maxMatches: 1, time: 60000, errors: [ 'time' ] }

    //Decides the difficulty
    message.channel.send("🤖: 'Please select the difficulty. " + "\n1: Easy👶[5 Levels, Shows your starting position, +2000 EXP]" + "\n2: Hard👹[10 Levels, Does not show your starting position, +7000 EXP]" +  "\n`You have a minute to decide`");

    message.channel.awaitMessages(filt, opts)
    .then(col => {
      const m = col.first().content
      const val1 = m === "1";
      const val2 = m === "2";
      if(val1) {
        message.channel.send("🤖: 'You have selected an easy difficulty👶'" + `\n🤖: 'You have spawned on position ${playerPosition}'`);
        difficulty = 1;
        if (playerPosition == hourPosition || playerPosition == minPosition || secPosition == hourPosition || playerPosition-1 == hourPosition || playerPosition-1 == minPosition || playerPosition-1 == secPosition || playerPosition+1 == hourPosition || playerPosition+1 == minPosition || playerPosition+1 == secPosition){
          message.channel.send(`🤖: ⚠️!!! WARNING!!!⚠️` + `\n'Watch out! There is something near you'`);
          message.channel.send(`😣: I can hear the clock... but I can't tell if it's coming from above, below, or here because of echo...'`);
        }
        else{
          message.channel.send(`🤖: 'It seems like there isn't anything near you yet'`);
        }

      }
      else {
        message.channel.send("🤖: 'You have selected a hard difficulty👹'" + `\n🤖: 'No extra hints will be given'`);
        difficulty = 2;
      }
      check(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
    })
    .catch(err => {
      message.channel.send("🤖: 'You took too long! The game has ended 😥'");
    })
  }

  //Generates random values from 1~12
  function random() {
    return Math.floor(Math.random() * 11)+1
  }
  function random3() {
    return Math.floor(Math.random() * 2)+1
  }

  function quote1(bot1) {
    if (bot1>0){
      message.channel.send("🐮: 'Now I'm ANGRY!'" + "\n😨: 'Okay... Chill there big cow'");
    }
    else {
      message.channel.send("😱: 'I see a dead Alistar over there...'");
    }
  }
  function quote2(bot2, hourPosition, minPosition, secPosition) {
    if (bot2>0){
      if (bot2+1 == hourPosition ||bot2+1 == minPosition || bot2+1 == secPosition){
        message.channel.send("🐵: 'Been waiting for this!'" + "\n🐵: 'I will tell you that something is right above me!'" + "\n😁: 'OMG Thank you Wukong!'");
      }

      else if (bot2-1 == hourPosition ||bot2-1 == minPosition || bot2-1 == secPosition){
        message.channel.send("🐵: 'Been waiting for this!'" + "\n🐵: 'I will tell you that something is right below me!'" + "\n😁: 'OMG Thank you Wukong!'");
      }

      else {
        message.channel.send("🐵: 'Hey there! I will tell you that nothing has passed me recently'" + "\n😁: 'OMG Thank you Wukong!'");
      }
    }
    else {
      message.channel.send("😱: 'I see a dead Wukong over there...'");
    }
  }
  function quote3(bot3) {
    if (bot3>0){
      message.channel.send("🧟: 'Mundo!'" + "\n😌: 'Oh it's just Mundo..'");
    }
    else {
      message.channel.send("😱: 'I see a dead Mundo over there...'" + "\n🧟: 'MUNDO TOO STRONG FOR YOU!'" + "\n😮: 'Dr.Mundo revived...'");
      bot3 = random();
    }
  }
  function quote4(bot4, hourPosition, minPosition, secPosition) {
    if (bot4>0){
      let highest = 0;
      if (hourPosition > minPosition && hourPosition > secPosition){
        highest = hourPosition;
      }
      if (minPosition > hourPosition && minPosition > secPosition){
        highest = minPosition;
      }
      if (secPosition > minPosition && secPosition > hourPosition){
        highest = secPosition;
      }
      message.channel.send("👁️: 'What do you see up there?'" + `\n🦅: 'I will tell you what's at the highest.' + '\n I see something at ${highest}'` + "\n😍: 'Sweet! Thanks Quinn!'");
    }
    else {
      message.channel.send("😱: 'I see a dead Quinn over there...'");
    }
  }
  function quote5(bot5) {
    if (bot5>0){
      message.channel.send("🐀: 'It's me! Hahahahaa!!'" + "\n🤢: 'YIKES!!! Not good... I got poisoned...'");
    }
    else {
      message.channel.send("😱: 'I see a dead Twitch over there...'");
    }
  }
  //Use flashlight to check the surrounding this phase
  function check(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
    const filt = (msg) => (msg.author.id === message.author.id) && ["1","2","3","4"].includes(msg.content);
    const opts = { maxMatches: 1, time: 60000, errors: [ 'time' ] }

    if (flashlight > 0){
      message.channel.send(`🤖: 'Do you wish to check your surrounding? You have ${flashlight} flashlight(s)'` + "\n1: Upper Floor" + "\n2: Current Floor" + "\n3: Lower Floor" + "\n4: No"+  "\n`You have a minute to decide`");
    }

    message.channel.awaitMessages(filt, opts)
    .then(col => {
      const m = col.first().content
      const val1 = m === "1";
      const val2 = m === "2";
      const val3 = m === "3";
      const val4 = m === "4";
      //const val = m === "1" ? true : false
      if(val1) {
        flashlight--;
        message.channel.send("🤖: 'You checked above...'");
        if (playerPosition+1 == hourPosition || playerPosition+1 == minPosition || playerPosition+1 == secPosition){
          message.channel.send("😬: 'I see a clock-hand right up there... But can't tell which hand it is...'");
        }
        else if (playerPosition == bot1){
          quote1(bot1);
        }
        else if (playerPosition == bot2){
          quote2(bot2, hourPosition, minPosition, secPosition);
        }
        else if (playerPosition == bot3){
          quote3(bot3);
        }
        else if (playerPosition == bot4){
          quote4(bot4, hourPosition, minPosition, secPosition);
        }
        else if (playerPosition == bot5){
          quote5(bot5);
          life--;
        }
        else {
          message.channel.send("😯: 'There isn't anything there...'");
        }
      }
      else if(val2) {
        flashlight--;
        message.channel.send("🤖: 'You checked around...'");
        if (playerPosition+1 == hourPosition || playerPosition+1 == minPosition || playerPosition+1 == secPosition){
          message.channel.send("😬: 'I see a clock-hand right here... But can't tell which hand it is...'");
        }
        else if (playerPosition == bot1){
          quote1(bot1);
        }
        else if (playerPosition == bot2){
          quote2(bot2, hourPosition, minPosition, secPosition);
        }
        else if (playerPosition == bot3){
          quote3(bot3);
        }
        else if (playerPosition == bot4){
          quote4(bot4, secPosition);
        }
        else if (playerPosition == bot5){
          quote5(bot5);
          life--;
        }
        else {
          message.channel.send("😯: 'There isn't anything there...'");
        }
      }
      else if(val3) {
        flashlight--;
        message.channel.send("🤖: 'You checked below...'");
        if (playerPosition-1 == hourPosition || playerPosition-1 == minPosition || playerPosition-1 == secPosition){
          message.channel.send("😬: 'I see a clock-hand right down there... But can't tell which hand it is...'");
        }
        else if (playerPosition == bot1){
          quote1(bot1);
        }
        else if (playerPosition == bot2){
          quote2(bot2, hourPosition, minPosition, secPosition);
        }
        else if (playerPosition == bot3){
          quote3(bot3);
        }
        else if (playerPosition == bot4){
          quote4(bot4, secPosition);
        }
        else if (playerPosition == bot5){
          quote5(bot5);
          life--;
        }
        else {
          message.channel.send("😯: 'There isn't anything there...'");
        }
      }
      else if(val4){
        message.channel.send("😅: 'I guess I will save it for later...'");
      }
      else{
        message.channel.send("🙄: 'That is a wrong choice, please select again...'");
        check(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
      }
      game(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
    })
    .catch(err => {
      message.channel.send("🤖: 'You took too long! The game has ended 😥'");
    })
  }

  //Decides to move up/down to avoid clock hands
  function game(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
      //Decides how many space to Move
      const filt = (msg) => (msg.author.id === message.author.id) && ["1","2"].includes(msg.content);
      const opts = { maxMatches: 1, time: 60000, errors: [ 'time' ] }

      if (life == 2){
        message.channel.send("🤖: 'Please select your action. 1: Move Once 2: Move Twice'" + "\n`You have a minute to decide`");
        message.channel.awaitMessages(filt, opts)
        .then(col => {
          const m = col.first().content
          const val = m === "1" ? true : false
          if(val) {
            //Decides the direction
            message.channel.send("🤖: 'You have moved once'" + "\n🤖: 'Please select the direction to move. 1: Move Up 2: Move Down'" + "\n`You have a minute to decide`");
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
              move(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
            })
            .catch(err => {
              message.channel.send("🤖: 'You took too long! The game has ended 😥'");
            })
          }
          else{
            message.channel.send("🤖: 'You have moved twice'" + "\n🤖: 'Please select the direction to move. 1: Move Up 2: Move Down'" + "\n`You have a minute to decide`");
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
              move(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
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
      else if (life == 1){
        //Decides the direction when injured
        message.channel.send("🤖: 'You can only move once since you are injured by a snake" + "\n🤖: 'Please select the direction to move. 1: Move Up 2: Move Down'" + "\n`You have a minute to decide`");
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
          move(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
        })
        .catch(err => {
          message.channel.send("🤖: 'You took too long! The game has ended 😥'");
        })
      }
    }

  //Clock&User moves according to the pattern and choice this phase
  function move(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
    hourPosition = hourPosition + 1;
    minPosition = minPosition + 2;
    secPosition = secPosition + 3;

    if (playerPosition == 13){
      playerPosition = 1;
    } if (playerPosition == 14) {
      playerPosition = 2;
    } if (playerPosition == -1){
      playerPosition = 12;
    } if (playerPosition == -2){
      playerPosition = 11;
    }

    if (hourPosition > 12){
      hourPosition = 1;
    } if (minPosition == 13){
      minPosition = 1;
    } if (minPosition == 14){
      minPosition = 2;
    } if (secPosition == 13){
      secPosition = 1;
    } if (secPosition == 14){
      secPosition = 2;
    } if (secPosition == 15){
      secPosition = 3;
    }

    fate1(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition)
  }

  //Chekcs if you picked up any items
  function fate1(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
    if (playerPosition == snake1 || playerPosition == snake2 || playerPosition == flash){
      const filt = (msg) => (msg.author.id === message.author.id) && ["1","2"].includes(msg.content);
      const opts = { maxMatches: 1, time: 60000, errors: [ 'time' ] }
      message.channel.send(`🤔: 'Hmmm..? I stepped on something...'` + `\n🤖: 'Do you wish to pick it up?'` + "\n1: Yes 2: No");
      message.channel.awaitMessages(filt, opts)
      .then(col => {
        const m = col.first().content
        const val1 = m === "1";
        const val2 = m === "2";
        //const val = m === "1" ? true : false
        if(val1) {
          message.channel.send("🤖: 'You decided to pick it up'");
          if (playerPosition == flash) {
            message.channel.send(`😍: Nice!!!` + `\n You picked up a flashlight!🔦` + `\n'You now have an additional flashlight'`);
            flashlight ++;
            flash = -1;
            Fate2(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition)
          }
          else if ((playerPosition == snake1 && life == 2) || (playerPosition == snake2 && life == 2)){
            message.channel.send(`😭: Ouch!!!` + `\n You accidentally picked up a snake and got bit!🐍` + `\n'If you get bit again, you will die'`);
            life --;
            Fate2(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition)
          }
          else if ((playerPosition == snake1 && life == 1) || (playerPosition == snake2 && life == 1)){
            message.channel.send(`You got poisoned again!🐍` + `\n'Sorry you died from poisoning💀💀💀'`);
            life = 0;
            closing(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition)
          }
        }
        else {
          message.channel.send("🤖: 'You decided not to pick it up'");
          Fate2(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition)
        }

      })
      .catch(err => {
        message.channel.send("🤖: 'You took too long! The game has ended 😥'");
      })
    }
    else {
      Fate2(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition)
    }

  }

  //Checks for death
  function Fate2(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){

    setTimeout(function(){
          message.channel.send(`🤖: -------Dead or Alive Report-------`);
          let death = 0;

          if (bot1 == hourPosition){
            message.channel.send(`🤖: 'Alistar🐮 head butted an hour-hand backward...'`);
            hourPosition--;
          }
          if (bot1 == minPosition){
            message.channel.send(`🤖: 'Alistar🐮 head butted a min-hand backward...'`);
            minPosition--;
          }
          if (bot1 == secPosition){
            message.channel.send(`🤖: 'Alistar🐮 head butted a sec-hand backward...'`);
            secPosition--;
          }

          if (bot2 == hourPosition || bot2 == minPosition || bot2 == secPosition ){
            message.channel.send(`🤖: 'Wukong🐵 died at position ${bot2}'`);
            bot2 = -1;
            death++;
          }

          if (bot3 == hourPosition || bot3 == minPosition || bot3 == secPosition ){
            message.channel.send(`🤖: 'Mundo🧟 died at position ${bot3}'`);
            bot3 = -1;
            death++;
          }

          if (bot4 == hourPosition || bot4 == minPosition || bot4 == secPosition ){
            message.channel.send(`🤖: 'Quinn🦅 died at position ${bot4}'`);
            bot4 = -1;
            death++;
          }

          if (bot5 == hourPosition || bot5 == minPosition || bot5 == secPosition ){
            message.channel.send(`🤖: 'Twitch🐀 died at position ${bot5}'`);
            bot5 = -1;
            death++;
          }

          if (playerPosition == hourPosition){
            message.channel.send("🤖: 'Oops! Sorry you couldn't escape the death from time'" + `\n🤖: 'You got caught by an hr-clock-hand at position ${playerPosition}'`);
            life = 0;
            death++;
          }
          else if (playerPosition == minPosition){
            message.channel.send("🤖: 'Oops! Sorry you couldn't escape the death from time'" + `\n🤖: 'You got caught by a minute-clock-hand at position ${playerPosition}'`);
            life = 0;
            death++;
          }
          else if (playerPosition == secPosition){
            message.channel.send("🤖: 'Oops! Sorry you couldn't escape the death from time'" + `\n🤖: 'You got caught by a second-clock-hand at position ${playerPosition}'`);
            life = 0;
            death++;
          }

          if (death==0) {
            message.channel.send(`🤖: 'Woohoo! No one died at level ${level}'`);
          }

          message.channel.send(`🤖: ---------End of the Report---------`);
          closing(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
        }, 2000);
    //message.channel.send(`🤖: -------Dead or Alive Report-------`);
  }



  //If not dead or finished the level, move on to next level
  function closing(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
      level ++;
      if (life > 0 && difficulty == 1 && level >5){
        message.channel.send(`🤖: 'Congratulations~🎉!!! you have finished an easy mode!'` + `\n 🤖: 'You have earned 2000 EXP!'`);
      }

      else if (life > 0 && difficulty == 2 && level >10){
        message.channel.send(`🤖: 'Congratulations~🎉🎉🎉!!! you have finished a hard mode!👑'` + `\n 🤖: 'You have earned 7000 EXP!'`);
      }

      else if (life == 0){
        message.reply(`🤖: 'Game Over'`);
      }

      else if (life > 0){
        message.channel.send(`🤖: 'Congratulations you survived level ${level-1}! You will now move on to level ${level}🔥'`);
        setTimeout(function(){
            message.reply(`🌟🌟🌟Welcome to level ${level}🌟🌟🌟`);
            check(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
        }, 3000);

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
