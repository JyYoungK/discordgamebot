const Discord = require('discord.js');
const PREFIX = "askbot: ";
const PREFIX2 = "gamebot: ";
const bot = new Discord.Client();
const botconfig = require("./botconfig.json");
const fs = require("fs");
bot.commands = new Discord.Collection();

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

bot.on("ready", function() {
   console.log("Ready");
});

bot.on("message", function(message){


  if (message.author.equals(bot.user)) return;
  if (message.content == "Hello" || message.content == "hi" || message.content == "hello" || message.content == "Hi") {
    message.channel.send("Hello!!! I am also a bot! xD")};

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
  }
  switch (args2[0].toLowerCase()) {
          case "info":
                message.channel.send("Yo! I'm the second bot programmed by Chocolate Rose");
                message.channel.send("Here are useful functions you can ask me");
                var embed = new Discord.RichEmbed()
                  .addField("gamebot: info", "Shows all the games I can play!", true)
                  .addField("!rps:`enter either rock, paper or scissors`", "I will play rock-paper-scissor game with you!", true)
                  .setColor(0x00FFFF)
                  .setFooter("Was this message helpful?")
                  .setThumbnail(message.author.avatarURL)
                message.channel.sendEmbed(embed);
                break;
  }
});

client.login(process.env.BOT_TOKEN);
