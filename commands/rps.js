
const Discord = require("discord.js");
const botconfig = require("../botconfig");

module.exports.run = async (bot, message, args) => {

  let rpschoice = [
    "ROCK",
    "PAPER",
    "SCISSORS"
  ]
  let winresponse = [
    "...I guess you win", "DAMMIT! YOU WIN!", "I HATE YOU!", "Good job! You won!", "YOU WON!", "UGH! LET'S PLAY AGAIN!", "HA! wait.. I lost..", "NOOO! How did I lose?!", "I need to win, let's go again!", "I will win next time for sure!"
  ]
  let loseresponse = [
    "YAY! I WON!", "HA! LOSERRR!", "WANT TO PLAY AGAIN? :)", "I WIN!", "Oh no... you lost", "VICTORY IS MINEEE", "WAIT! I WIN!", "EYY LET'S GO AGAIN!", "WOOHOO!", "I WON!!!", "OMG I WIN!", "I wonder if I can win again :)", "I'll take it"
  ]
  let computerChoice = (rpschoice[Math.floor(Math.random() * rpschoice.length)]);

  let target = message.member || message.guild.members.get(args[0]);
  let play = (args.join()).toLowerCase();
  let rule = "Hey! If you want to play a r-p-s game with me, you have to tell me" +
" what you are going to play. For example try typing, `!rps rock`";
  if(!play) return message.channel.send(rule).then(msg => {msg.delete(5000)});
  let compare = function(choice1,choice2){

  if(choice1===choice2.toLowerCase()){
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
  else if(choice1==="scissors" || choice1==="scissor"){
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
  compare(play,computerChoice);
}

module.exports.help = {
  name: "rps"
}
