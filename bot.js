const Discord = require('discord.js');
const PREFIX = "askbot: ";
const PREFIX2 = "gamebot: ";
const bot = new Discord.Client();
const botconfig = require("./botconfig.json");
const fs = require("fs");
bot.commands = new Discord.Collection();
let xp = JSON.parse(fs.readFileSync("./xp.json", "utf8"));

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on('message', message => {
    if (message.content === 'ping') {
    	message.channel.send('PONG!');
  	}
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("games all day everyday", {type: "PLAYING"});

});

bot.on("message", function(message){

  if (message.author.equals(bot.user)) return;
  if (message.content == "Hello".toLowerCase() || message.content == "Hi".toLowerCase()) {
    message.channel.send("Hey I am also a bot! xD")};
  if (message.content == "How are you".toLowerCase() || message.content == "how are u".toLowerCase()) {
    message.channel.send("I am in a mood for gaming! :)")};

  var interval = setInterval (function () {
      var keys = Object.keys(xp);
      var memberXp = new Array();
      for(var i = 0; i < keys.length;i++){
          member = (xp[keys[i]])
          memberXp.push(member.xp);
      }

      var keys = Object.keys(xp);
      var memberXp = new Array();
      var memberName = new Array();
      for(var i = 0; i < keys.length;i++){
          member = (xp[keys[i]])
          memberXp.push(member.xp)
          memberName.push(keys[i]);
      }

      findLargest3();
      function findLargest3(){
          memberXp.sort(function(a,b) {
              if (a < b) { return 1; }
              else if (a == b) { return 0; }
              else { return -1; }
          });

          var high1exp = memberXp[0];
          var high2exp = memberXp[1];
          var high3exp = memberXp[2];
          var name = memberName;

          for (var i = 0; i < keys.length; i++) {
                  if (xp[keys[i]].xp === high1exp) {
                      var high1name = keys[i];
                      var high1level = xp[keys[i]].level;
                  }
              }
          for (var i = 0; i < keys.length; i++) {
                  if (xp[keys[i]].xp === high2exp) {
                      var high2name = keys[i];
                      var high2level = xp[keys[i]].level;
                  }
              }
          for (var i = 0; i < keys.length; i++) {
                  if (xp[keys[i]].xp === high3exp) {
                      var high3name = keys[i];
                      var high3level = xp[keys[i]].level;
                  }
              }

          let user1 = bot.users.get(high1name);
          let uName1 = user1.username;
          let user2 = bot.users.get(high2name);
          let uName2 = user2.username;
          let user3 = bot.users.get(high3name);
          let uName3 = user3.username;

          let leaderB = message.guild.channels.find(`name`, "leaderboards");
          if (!leaderB) return message.channel.send("Couldn't find report channel.")

          let leaderEmbed = new Discord.RichEmbed()
          .setField("Updated Leaderboard")
          .setColor("#4169E1")
          .addBlankField()
          .addField("1st Place:first_place:", uName1)
          .addField("User's Level", high1level)
          .addField("User's EXP", high1exp)
          .addField("2nd Place:second_place:", uName2)
          .addField("User's Level", high2level)
          .addField("User's EXP", high2exp)
          .addField("3rd Place:third_place:", uName3)
          .addField("User's Level", high3level)
          .addField("User's EXP", high3exp)
          .addFooter("Updated Time", message.createdAt)

          message.delete().catch(O_o =>{});
          leaderB.send(leaderEmbed);
        }
    }, 86400000);

//-------------------------------------EXP---------------------------------------------------
    let xpAdd = Math.floor(Math.random() * 7) + 3;
      console.log(xpAdd);

    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * curlvl * 200;
    xp[message.author.id].xp =  curxp + xpAdd;

    if(nxtLvl <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;
        let lvlup = new Discord.RichEmbed()
        .setTitle("Congratulations! You Leveled Up!")
        .setColor("#82ecff")
        .addField("New Level", curlvl + 1);
        message.channel.send(lvlup).then(msg => {msg.delete(10000)});
      }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });
  
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args0 = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args0);

  //↓↓↓↓↓↓↓VERY DANGEROUS. THIS HAS TO BE HERE!
  if (!message.content.startsWith(PREFIX) && !message.content.startsWith(PREFIX2)) return;
  var args1 = message.content.substring(PREFIX.length).split(" ");
  var args2 = message.content.substring(PREFIX2.length).split(" ");

  switch (args1[0].toLowerCase()) {
    case "noticeme":
          message.channel.send(message.author.toString() + " I missed you too buddy!");
          break;
    case "exp":
          message.channel.send("Hey! I can explain this for you since I know more about this than Choco Bot! First type `!level` to check your current exp!" + 
                              " What is exp? Well exp is a unit of measurement used in games. You can earn exp through almost anything! Chatting, sharing pictures, playing games, joining events." +
                              " Once you reach certain amount of point, you will level up! What is the point of leveling up? Once you reach" +
                              "Level 10, you have a choice to become a VIP! More details on VIP will be explained later but it will be worth it!" +
                              " Also compete for Top 3 Spot on Leaderboard! Leaderboard gets updated every day with displaying only Top 3 most active user" +
                              "Sounds exciting right? Now hopefully I explained most of it! Well then let's get started!").then(msg => {msg.delete(60000)});
          break;
  }
  switch (args2[0].toLowerCase()) {
          case "info":
                message.channel.send("Yo! I'm the second bot programmed by Chocolate Rose").then(msg => {msg.delete(60000)});
                message.channel.send("Here are useful functions you can ask me").then(msg => {msg.delete(60000)});
                var embed = new Discord.RichEmbed()
                  .addField("gamebot: info", "Shows all the games I can play!", true)
                  .addField("!rps: `enter either rock, paper or scissors`", "I will play rock-paper-scissor game with you!", true)
                  .setColor(0xff00dc)
                  .setFooter("Was this message helpful?")
                  .setThumbnail(message.author.avatarURL)
                message.channel.send().then(msg => {msg.delete(60000)});
                break;
  }
});

bot.login(process.env.BOT_TOKEN);
