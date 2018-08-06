const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "askbot: ";
const PREFIX2 = "gamebot: ";

client.on('ready', () => {
    console.log('Gamebot is ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.channel.send('PONG!');
  	}
});

var rpschoice = [
  "ROCK",
  "PAPER",
  "SCISSORS"
]
var winresponse = [
  "...I guess you win", "DAMMIT! YOU WIN!", "I HATE YOU!", "Good job! You won!", "YOU WON!", "UGH! LET'S PLAY AGAIN!", "HA! wait.. I lost..", "NOOO! How did I lose?!", "I need to win, let's go again!", "I will win next time for sure!"
]
var loseresponse = [
  "YAY! I WON!", "HA! LOSERRR!", "WANT TO PLAY AGAIN? :)", "I WIN!", "Oh no... you lost", "VICTORY IS MINEEE", "WAIT! I WIN!", "EYY LET'S GO AGAIN!", "WOOHOO!", "I WON!!!", "OMG I WIN!", "I wonder if I can win again :)", "I'll take it"
]

client.on("message", function(message){

  if (message.author.equals(client.user)) return;
  if (message.content == "Hello" || message.content == "hi" || message.content == "hello" || message.content == "Hi") {
    message.channel.send("Hello!!! I am also a bot! xD")};
    //↓↓↓↓↓↓↓VERY DANGEROUS. THIS HAS TO BE HERE!
  if (!message.content.startsWith(PREFIX) && !message.content.startsWith(PREFIX2)) return;
  var args = message.content.substring(PREFIX.length).split(" ");
  var args2 = message.content.substring(PREFIX2.length).split(" ");

  switch (args[0].toLowerCase()) {
    case "noticeme":
          message.channel.send(message.author.toString() + " I missed you too buddy!");
          break;
  }

  switch (args2[0].toLowerCase()) {

          case "rps":
              var computerChoice = (rpschoice[Math.floor(Math.random() * rpschoice.length)]);
              var compare = function(choice1,choice2){
              if(choice1=== undefined){
                    message.channel.send("Hey! If you want to play a r-p-s game with me, you have to tell me" +
                  " what you are going to play. For example try typing, `gamebot: RPS rock`");
              }

              else if(choice1===choice2.toLowerCase()){
                  message.channel.send(computerChoice);
                  message.channel.send("IT'S A TIE!");
              }
              else if(choice1==="rock"){
                  if(choice2==="SCISSORS"){
                      message.channel.send(computerChoice);
                      message.channel.send(winresponse[Math.floor(Math.random() * winresponse.length)]);
                  }
                  else{
                      message.channel.send(computerChoice);
                      message.channel.send(loseresponse[Math.floor(Math.random() * winresponse.length)]);
                  }
              }
              else if(choice1==="paper"){
                  if(choice2==="ROCK"){
                      message.channel.send(computerChoice);
                      message.channel.send(winresponse[Math.floor(Math.random() * winresponse.length)]);
                  }
                  else{
                      message.channel.send(computerChoice);
                      message.channel.send(loseresponse[Math.floor(Math.random() * winresponse.length)]);
                  }
              }
              else if(choice1==="scissors"){
                  if(choice2==="PAPER"){
                      message.channel.send(computerChoice);
                      message.channel.send(winresponse[Math.floor(Math.random() * winresponse.length)]);
                  }
                  else{
                      message.channel.send(computerChoice);
                      message.channel.send(loseresponse[Math.floor(Math.random() * winresponse.length)]);
                  }
              }
              else message.channel.send("Sorry I can't read that, try again :(");
              };
              compare((args2[1]),computerChoice);
              break;

          case "info":
                message.channel.send("Yo! I'm the second bot programmed by Chocolate Rose");
                message.channel.send("Here are useful functions you can ask me");
                var embed = new Discord.RichEmbed()
                  .addField("gamebot: info", "Shows all the games I can play!", true)
                  .addField("gamebot: RPS", "I will play rock-paper-scissor game with you!", true)
                  .setColor(0x00FFFF)
                  .setFooter("Was this message helpful?")
                  .setThumbnail(message.author.avatarURL)
                message.channel.sendEmbed(embed);
                break;
  }
});

client.login(process.env.BOT_TOKEN);
