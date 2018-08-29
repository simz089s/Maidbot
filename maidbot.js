const config = require('./config.json');
let maidbot = config;
const token = process.env.DISCORD_BOT_SECRET;

const dataJSON = './data.json';
let data = require(dataJSON);

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
// let msgCollectors = {};

const name = `!MAID`;
let active = true;
let waiting = false;
let master = '';
let greetedUsers = new Array();
let votes = {};

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  console.log(`${client.user.tag} at your service!`);
  client.user.setActivity('maid bot simulator');
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // This event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('guildMemberAdd', member => {
  // On arrival of new server member greet
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (channel) { channel.send(`Welcome to the server, ${member}.`); }
});

client.on('message', async message => {
  // Log all messages
  console.log(message.content);

  // Prevent answering bots and self
  if (message.author.bot) { return; }
  if (message.author.id == client.user.id) { return; }

  // Standard first time greet
  if (!greetedUsers.includes(message.author.tag)) {
    greetedUsers.push(message.author.tag);
    message.reply("welcome back.");
  }

  // Parsing/tokenizing
  const msg = message.content.trim().toUpperCase(); // Full msg str trimmed all caps
  if (!msg.startsWith(maidbot.prefix)) {
    if (message.isMentioned(client.user)) { message.reply('Yes?'); } // Check if mentioned
    // if (msg.includes('<@>')) { message.channel.send('Did someone mention my master?'); }
    return;
  }
  const cmd = msg.slice(maidbot.prefix.length).trim(); // Message without prefix
  let args = cmd.split(/ +/g).filter(arg => arg !== ''); // Tokenized w/o prefix
  const argsNC = message.content.slice(maidbot.prefix.length).match(/\S+/g); // Args w/o all caps
  const cmdNC = argsNC.join(" "); // Command without all caps

  // Check if waiting
  if (waiting) {
    if (cmd.startsWith('COME BACK')) {
      if (master === '' || message.author.id === master) {
        waiting = false;
        message.channel.send('I am back. What would you like, <@'+master+'>?');
        master = '';
      }
    }
    else if (args[0] === 'WAIT') { message.reply('I am sorry, but I am already waiting for master <@'+master+'>.'); }
    // else if (cmd.startsWith(`I, YOUR TRUE MASTER, SUMMON THEE`) && message.author.id === '') {
    //   waiting = false;
    //   message.reply('I am ready to serve you.');
    //   master = '';
    // }
    else { return; }
  }
  else if (args[0] === 'WAIT') {
    waiting = true;
    if (args[1] === 'FOR') {
      master = args[2].match(/(?<=<@!?)\d+(?=>)/g)[0]; // Matches user id
      if (args[2] === 'ME') { message.reply('Understood. I will wait for you.'); }
      else {                  message.reply('Understood. I will wait for <@'+master+'>.'); }
    }
    else {                    message.reply('Understood. I am waiting.'); }
    return;
  }

  else if (cmd.startsWith('KAWAI') || cmd === 'MOE' || cmd === 'GOOD GIRL'
           || cmd.startsWith('CUTE') || cmd === '♥️' || cmd === '❤') {
    message.channel.send(':heart_exclamation:');
    return;
  }
  else if (cmd.startsWith('THANK')) {
    message.reply('It is my pleasure.');
    return;
  }
  else if (cmd === 'BAD') {
    message.reply(':cry:');
    return;
  }

  else if (args[0] === 'PING') {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    // const m = await message.channel.send("Ping?");
    const m = await message.reply('Calculating...');
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms.`);
  }
  else if (args[0] === 'VOTE' && args[1]) {
    if (cmd === 'VOTE COUNT') {
      let show = "";
      for (let v in votes) { show += '"' + v + '"' + " : " + votes[v].length + "\n"; }
      message.channel.send(show)
        .catch(() => {
          message.reply("I am afraid there are no votes to list.")
        });
    }
    else if (cmd === "VOTE SHOW") {
      message.channel.send(JSON.stringify(votes).slice(1, -1).replace(/("):(\[.+?\],?)/g, "$1 : $2\n"))
        .catch(() => {
          message.reply("I am afraid there are no votes to list. Or something went wrong...")
        });
      data.votes = votes;
      fs.writeFile(dataJSON, JSON.stringify(data), "utf8", err => {
        if (err) { return console.log(err); }
        else { console.log("Votes saved."); }
      });
    }
    else if (args[1] === "REMOVE" && args[2]) {
      let entrant = args.slice(2).join(" ")
      if (Object.keys(votes).includes(entrant) && votes[entrant].includes("@"+message.author.tag)) {
        votes[entrant].splice(votes[entrant].indexOf("@"+message.author.tag), 1);
        if (votes[entrant].length === 0) {
          delete votes[entrant];
          message.reply(entrant + " removed.");
        }
        else {
          message.reply(entrant + " : " + votes[entrant]);
        }
        console.log(votes);
      }
    }
    else if (cmd === 'VOTE RESET') {
      votes = {};
      message.channel.send('@here , votes were reset.');
    }
    else {
      if (args[1] === 'FOR') { args.shift(); }
      if (args[1]) {} else { return; }
      args.shift();
      let entrant = args.join(" ");
      if (!votes[entrant]) { votes[entrant] = new Array("@"+message.author.tag); }
      else { votes[entrant].push("@"+message.author.tag); }
      message.reply('はい。 :heavy_plus_sign: :one: for "' + entrant + '".');
    }
  }
  else if (args[0].startsWith('HELLO') || args[0].startsWith('HI')
           || (args[0] === 'SAY' && (args[1].startsWith('HELLO') || args[1].startsWith('HI')))) {
    message.reply('hello!');
  }
  else if (args[0].includes('BYE') || (args[1] && args[1].includes('BYE'))
           || (args[0] === 'SAY' && (args[1].includes('BYE') || (args[2] && args[2].includes('BYE'))))) {
    message.reply('Farewell!');
  }
  else if ((args[0] === 'MARRY' || args[0] === 'LOVE') && args[1]) {
    message.reply(':cupid: :blush:');
  }
  else if (args[0] === 'MOE' && args[1] === 'MOE' && args[2] === 'KYUN') {
    if (args[3] && /(?<=<[@]!?)\d+(?=>)/.test(args[3])) {
      client.fetchUser(args[3].match(/(?<=<[@]!?)\d+(?=>)/)[0]).then(async dest => {
        dest.createDM().then(async () => {
          dest.dmChannel.send('Nyan nyan,');
          await wait(1500);
          dest.dmChannel.send('Pyon pyon,');
          await wait(1500);
          dest.dmChannel.send('Fuwa fuwa,');
          await wait(1500);
          dest.dmChannel.send('Moe moe _**KYUN**_ !');
        }).catch(console.error);
      }).catch(console.error);
    }
    else {
      message.channel.send('Nyan nyan,');
      await wait(1000);
      message.channel.send('Pyon pyon,');
      await wait(1000);
      message.channel.send('Fuwa fuwa,');
      await wait(1000);
      message.channel.send('Moe moe _**KYUN**_ !');
    }
  }
  else if (args[0].startsWith('TUTTURU') || args[0].startsWith('TUTURU')) {
    message.reply('Tutturu~!');
  }
  else if ((args[0] === 'WELCOME' || args[0] === 'GREET') && args[1] && /(?<=<@!?)\d+(?=>)/g.test(args[1])) {
    message.channel.send('Welcome back, master '+args[1]+'. Please enjoy your stay.');
  }
  else if (cmd.startsWith('WHO ARE YOU')) {
    switch (Math.floor(Math.random() * Math.floor(5))) {
      case 0:
        message.reply('https://www.youtube.com/watch?v=mVTjqVLIMl4');
        break;
      case 1:
        message.reply('https://www.youtube.com/watch?v=_tc5popX3_A');
        break;
      case 2:
        message.reply('Forgive the dub :wink: https://www.youtube.com/watch?v=vasV19xJyGg');
        break;
      case 3:
      case 4:
      default:
        message.reply('我々は戦闘メイドであります！');
        break;
    }
  }
  else if (message.author.id === '394993333539307524' && args[0] === 'DELETEMSG' && args[1]) {
    try {
      let m = await message.channel.fetchMessage(args[1]);
      m.delete();
    }
    catch {
      message.reply('I am sorry, but I could not find that message.');
    }
  }
  else if (message.author.id === '394993333539307524' && args[0] === 'DELALL') {
    for (let m of message.channel.messages) {
      if (m[1].author.id === client.user.id) {
        m[1].delete().catch(console.error);
        console.log("DELETED " + m);
      }
    }
  }
  // else if (message.author.id === '' && args[0] === 'SAY' && args[1]) {
  //   let text = cmdNC.slice(4).match(/"(.*?)"\s+<#!?(\d+)>/);
  //   if (text) {
  //     client.channels.find(ch => ch.id === text[2]).send(text[1])
  //       .catch(() => message.reply('I am sorry but I could not send that message.'));
  //   }
  // }
  else if (args[0] === 'YOUTUBE' && args[1]) {
    argsNC.shift();
    let query = argsNC.join(" ").match(/\w+/g).join("+");
    message.channel.send("https://www.youtube.com/results?search_query=" + query);
  }
  else if (args[0] === 'GOOGLE' && args[1]) {
    argsNC.shift();
    let query = argsNC.join(" ").match(/\w+/g).join("+");
    message.channel.send("https://www.google.ca/search?q=" + query);
  }
  else if (args[0] === '!YOUTUBE' && args[1]) {
    // Horrible, horrible way of getting videos, should use the YouTube API
    if (/^\d+$/.test(args[1]) && args[2]) {
      if (/^\d$/.test(args[1]) && args[1] !== "0") {
        let query = message.content.match(/\S+/g).slice(4).join("+").match(/\w+|\+/g).join("");
        try {
          await rp('https://www.youtube.com/results?search_query=' + query, (err, response, html) => {
            if (!err && response.statusCode == 200) {
              html.then(src => {
                message.channel.send("https://www.youtube.com/watch?v=" + src.match(/(?<=href="\/watch\?v=)\w+(?=")/g)[2*(args[1]-1)])
              });
            } else if (err) {
              throw err;
            }
          });
        } catch (err) {
          console.log("Request error");
          console.error();
        }
      }
      else {
        message.channel.send("Only first to ninth video ください。");
      }
    }
    else {
      let query = message.content.match(/\S+/g).slice(3).join("+").match(/\w+|\+/g).join("");
      message.channel.send("https://www.youtube.com/results?search_query=" + query);
    }
  }
});

// Really sorry for doing this for now
client.login(fs.readFileSync('./.env', 'utf8').slice("DISCORD_BOT_SECRET=".length).trim())
// client.login(token)
  .then(() => console.log("All good!"))
  .catch(console.error);
