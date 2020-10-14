/**
 * MAIDBOT
 * My Discord bot
 */


/**
 * Package imports
 */

import fs from 'fs';
import r2 from 'r2';
import Discord, { Channel, DMChannel, GuildChannel, TextChannel, User } from 'discord.js';

import salutations from './salutations.js';


/**
 * Essential stuff
 * Discord bot token should be in the project's root folder `.env` file
 * ./src/config.json should contain `prefix[es]` and `name` e.g.
 * {
 *   "prefix": "!MAIDBOT ",
 *   "prefixes": ["!MAIDBOT "],
 *   "name": "MAIDBOT"
 * }
 */

const TOKEN_LENGTH = 19;
const TOKEN: string = fs.readFileSync('./.env', 'utf8').slice(TOKEN_LENGTH).trim();

const MAIDBOT_CONFIG = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));

const BOTNAME: string = `+${MAIDBOT_CONFIG.name}`;
const BOTPREFIX: string = MAIDBOT_CONFIG.prefixes[0];

const CLIENT: Discord.Client = new Discord.Client();

/**
 * Other stuff
 */

let isLogging: boolean = false;

const MAIN_CHANNEL_ID: string = ''; // E.g. #general , wherever members join the server
const BOSS_ID: string = ''; // Bot maker or whoever has access to important functions

// Pausing bot
let active: boolean = true;
let shooer: string = '';

const MAX_GREETS: number = 8;
let usersToGreet: string[] = [...salutations.usersToGreet];
let specialGreets: boolean = true;
let msgRot: number = rand(0, MAX_GREETS);
let oldMsgRot: number = msgRot;

const votesFilename: string = './src/votes.json';
let votesJSON = {"votes":{}};
if (fs.existsSync(votesFilename)) { votesJSON = JSON.parse(fs.readFileSync(votesFilename, 'utf8')); }
else { fs.writeFileSync(votesFilename, JSON.stringify(votesJSON), 'utf8'); }
let votes = votesJSON.votes;


/**
 * Helper functions
 */

function reset() {
  active = true;
  shooer = '';

  usersToGreet = salutations.usersToGreet.slice(0);
  specialGreets = true;

  votesJSON = JSON.parse(fs.readFileSync(votesFilename, 'utf8'));
  votes = votesJSON.votes;
}

function test(msg) {
  // const user = msg.author;
  // const member = msg.member;
  // if (user.id != MASTER_ID) { return; }
  // if (user.bot) { return; }
}

function logError(...args) {
  console.error(new Date());
  console.error(...args);
  // console.error.apply(this, arguments);
}

// Acceptable message command string
function msgTxtFilter(keywords: string): string { return keywords ? keywords.replace(/\W+/gi, '+') : ""; }

// Type guards
function isTextCh(arg: any): arg is TextChannel { return arg && arg.type && arg.type === "text"; }
function isDMCh(arg: any): arg is DMChannel { return arg && arg.type && arg.type === "dm"; }

function rand(min: number, max: number): number { return Math.floor(Math.random() * (max - min +1)) + min; }

function startsWithAny(s: string, a: Array<any>): boolean { return a.some((e) => s.startsWith(e)); }

function wait(ms: number): Promise<number> { return new Promise(resolve => setTimeout(resolve, ms)); }

async function rickRoll(channel) {
  try {
    channel.send('Never gonna give you up');
    await wait(1500);
    channel.send('Never gonna let you down');
    await wait(1500);
    channel.send('Never gonna run around and');
    await wait(1500);
    channel.send('Desert you!');
  } catch (err) {
    logError(`Could not rickroll that user in ${channel}. (´。＿。｀)`);
  }
}

async function req(url): Promise<string> {
  let html = "";
  try {
    html = await r2(url).text;
  } catch (err) {
    logError(`Request error (╯°□°）╯︵ ┻━┻ "${url}"`);
  } finally {
    return html;
  }
}


/**
 * Main functions
 */

CLIENT.on('ready', () => {
  console.log(`${CLIENT.user!.tag} at your service!`);
  console.log(`It is currently: ${new Date()}`);
  console.log(`Bot has started, with ${CLIENT.users.cache.size} users, in ${CLIENT.channels.cache.size} channels of ${CLIENT.guilds.cache.size} guilds.`);
  CLIENT.user!.setActivity(Math.random() >= 0.5 ? 'Maid Bot Simulator' : 'MaaS: Maid as a Service');
  setInterval(() => {
    CLIENT.user!.setActivity(Math.random() >= 0.5 ? 'Maid Bot Simulator' : 'MaaS: Maid as a Service');
  }, 300000);
});


// This event triggers when the bot joins a guild.
CLIENT.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});


// This event triggers when the bot is removed from a guild.
CLIENT.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


CLIENT.on('guildMemberAdd', member => {
  console.log(`>>> ${member.displayName} has joined the server!`);
  if (member.user && member.user.bot) { console.log('\tand it is a bot!'); }
  else if (((arg: any): arg is User => arg)(member) && member.bot) { console.log('\tand it is a bot!'); }

  const channel = member.guild.channels.cache.get(MAIN_CHANNEL_ID);

  // Welcome new member, rotate greeting and react to their join
  if (channel && isTextCh(channel)) {
    channel.messages.fetch({ limit: 1 }).then(messages => {
      channel.send(salutations.welcome(msgRot, member));

      msgRot = rand(0, MAX_GREETS);
      for (let i = 0; msgRot == oldMsgRot && i < MAX_GREETS; i++) { msgRot = rand(0, MAX_GREETS); } // Few attempts to avoid repeating same greeting
      oldMsgRot = msgRot;
      
      const lastMessage = messages.first();
      if (lastMessage && lastMessage.system) {
        lastMessage.react('😀');
        lastMessage.react('😎');
      }
    }).catch(logError);
  }
});


CLIENT.on('message', async message => {
  test(message);

  if (!message.guild?.me?.permissions || !message.guild?.me?.hasPermission("SEND_MESSAGES")) { return; };
  // if (!isTextCh(message.channel)) { return; }
  const msgCh: TextChannel = message.channel as TextChannel;
  const msgMember: Discord.GuildMember | null = message.member;
  const msgMemberId: string | undefined = msgMember?.id;
  const msgUser: Discord.User = message.author;
  const msgUserId: string = msgUser.id;

  let msg = message.content.trim().toUpperCase();

  // Logs
  if (isLogging) {
    const source = isDMCh(message.channel) ? "" : message.channel.name;
    console.log(`${message.createdAt.toLocaleTimeString('en-US')}[${source}:${msgMember?.displayName || message.author.username}] ${message.content}`);
  }

  // Special "important" commands reserved for bot maker
  if (message.author.id === BOSS_ID) {
    // Kill bot
    if (msg === `${BOTNAME} KILL -9`) {
      message.channel.send("Adieu!")
        .catch(logError)
        .finally(() => {
          CLIENT.destroy();
          console.log("X_X");
          process.exit();
        });
    } else if (msg === `${BOTNAME} REBOOT`) {
      console.log("Rebooting...");
      message.channel.send("Rebooting, please be patient...")
        .then(m => CLIENT.destroy())
        .then(() => {
          CLIENT.login(TOKEN)
            .then(() => {
              console.log("Reboot successful.");
              reset();
              message.channel.send("(≧∇≦)ﾉ").catch(logError);
            }).catch(logError);
        }).catch(logError);
    }

    // Toggle logs
    if (msg === `${BOTNAME} LOG OFF`) {
      isLogging = false;
      console.log("STOPPED LOGGING.");
    }
    else if (msg === `${BOTNAME} LOG ON`) {
      isLogging = true;
      console.log("STARTED LOGGING.");
    }

    // Toggle special greetings
    if (specialGreets && msg === `${BOTNAME} SHUSH`) { specialGreets = false; }
  }

  // TODO: Pausing Botchan
  if (!active) {
    if (msg.startsWith(`${BOTNAME} PLEASE COME BACK`)) {
      if (shooer === '' || `<@${message.author.id}>` === shooer) {
        active = true;
        message.channel.send(`I am back. What would you like, ${shooer}?`);
        shooer = '';
      }
    }
    else if (msg.startsWith(`${BOTNAME}, I SUMMON THEE`) && message.author.id === BOSS_ID) {
      active = true;
      message.reply('I am ready to help you!');
      shooer = '';
    }
    else if (msg.startsWith(`${BOTNAME} PLEASE WAIT`)) {
      message.reply(`I am sorry, but I am already waiting for ${shooer}.`);
    }
    else { return; }
  }
  else if (msg.startsWith(`${BOTNAME} PLEASE WAIT`)) {
    const tmp = msg.split(" ");
    const args = new Array();
    for (let i = 0; i < tmp.length; i++) { if (tmp[i] !== '') { args.push(tmp[i]); } }
    if (args[3] === 'FOR') {
      if (args[4].startsWith('<@!')) { shooer = `<@${args[4].slice(3)}`; }
      else if (args[4].startsWith('<@')) { shooer = args[4]; }
      else if (args[4] === 'ME') { shooer = `<@${message.author.id}>`; }
    }
    active = false;
    if (shooer !== '') {
      if (args[4] === 'ME') {
        message.reply(`Understood! I will wait for you.`);
      }
      else {
        message.reply(`Understood! I will wait for ${shooer}.`);
      }
    }
    else {
      message.reply(`Understood! I will wait.`);
    }
    return;
  }

  if (message.author.bot) { return; }

  // if (message.channel.name !== 'bot-test') { return; }
  // if (!message.author.id === BOSS_ID) {
  //   if (!greetedUsers.includes(message.author.tag)) {
  //     message.reply('I am sorry I cannot talk to you at this moment!');
  //     greetedUsers.push(message.author.tag);
  //   }
  //   return;
  // }

  // (Custom) one-time greetings
  if (specialGreets && usersToGreet.includes(message.author.id)) {
    const greet = salutations.greet(message.author.id);
    if (greet) {
      message.channel.send(greet);
      usersToGreet.splice(usersToGreet.indexOf(message.author.id), 1);
    }
  }

  // if (msg.indexOf(CONFIG.prefix) !== 0) { return; }
  if (message.mentions.has(CLIENT.user!)) {
    switch (rand(0, 3)) {
      case 0:
        message.reply('( ´･･)ﾉ(._.`)');
        break;
      case 1:
        message.reply('Maidbot, at your service! o(*￣▽￣*)ブ');
        break;
      case 2:
        message.reply('I am here!');
        break;
      default:
        message.reply('OK.');
    }
    return;
  }

  // For stuff without "please"
  if (msg.startsWith(BOTNAME)) {
    const tmp = msg.slice(BOTNAME.length+1);
    if (["❤", "♥️", "GOOD BOT"].includes(tmp) || tmp.startsWith("NICE")) {
      message.channel.send(':flushed: :sparkling_heart:');
      return;
    }
    else if (tmp.startsWith(`THANK`)) {
      message.reply(`My pleasure!`);
      return;
    }
    else if (tmp === 'BAD') {
      message.reply(':cry:');
      return;
    }
    else if (tmp.startsWith("HI") || tmp.startsWith("HELLO")) {
      message.reply("howdy!");
      return;
    }
  }

  /**
   * Actual commands
   */

  if (!msg.startsWith(BOTPREFIX)) { return; }

  // TODO: Use proper parsing library?
  // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  // const command = args.shift().toLowerCase();
  msg = msg.slice(BOTPREFIX.length);
  const tmpArgs = msg.split(" ");
  if (tmpArgs.length === 0) { return; }
  let args = new Array();
  for (let i = 0; i < tmpArgs.length; i++) { if (tmpArgs[i] !== '') { args.push(tmpArgs[i]); } }

  if (message.author.id !== BOSS_ID && args.includes(`<@${BOSS_ID}>`)) { message.channel.send('Manager has been called!'); }

  if (args[0] === 'PING') {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.reply('calculating　であります～。。。');
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms であります～。 API Latency is ${Math.round(CLIENT.ws.ping)}ms であります～。`);
  }
  else if (args[0] === 'VOTE' && args[1]) {
    /**
     * Voting system
     * TODO: Improve
     */
    if (args[1] === 'FOR') {
      if (args[2]) { args.shift(); }
      else { return; }
    }
    args.shift();
    const entry = args.join(" ");
    const entrants = args.join(" ").split(";").filter(entrant => entrant !== "").map(entrant => entrant.trim());
    if (entry === 'COUNT') {
      let show = "";
      for (let v in votes) {
        show += '"' + v + '"' + " : " + votes[v].length + "\n";
      }
      message.channel.send(show)
        .catch(() => {
          message.reply("I am afraid there are no votes to list.")
        });
    }
    else if (entry === "SHOW") {
      message.channel.send(JSON.stringify(votes).slice(1, -1).replace(new RegExp(/("):(\[.+?\],?)/, 'g'), "$1 : $2\n"))
        .catch(() => {
          message.reply("I am afraid there are no votes to list.")
        });
    }
    else if (entry.startsWith("REMOVE ")) {
      entrants[0] = entrants[0].slice(7);
      for (let entrant of entrants) {
        console.log(entrants);
        // votes[entrant].splice(votes[entrant].indexOf("<@"+message.author.id+">"),1);
        votes[entrant].splice(votes[entrant].indexOf(message.author.tag),1);
        if (votes[entrant].length === 0) {
          delete votes[entrant];
        }
        message.reply(entrant+" : "+votes[entrant]);
      }
      votesJSON.votes = votes;
      fs.writeFile(votesFilename, JSON.stringify(votesJSON), "utf8", err => {
        if (err) { return console.log(err); }
        else { console.log("Votes saved."); }
      });
    }
    else if (entry === 'RESET') {
      votes = {};
      message.reply('votes were reset.');
      votesJSON.votes = votes;
      fs.writeFile(votesFilename, JSON.stringify(votesJSON), "utf8", err => {
        if (err) { return console.log(err); }
        else { console.log("Votes saved."); }
      });
    }
    else if (entry.startsWith('RESET UPDATE ') && message.author.id === BOSS_ID) {
      try {
        votes = JSON.parse(entry.slice('RESET UPDATE '.length));
        message.reply('votes were updated.');
        votesJSON.votes = votes;
        fs.writeFile(votesFilename, JSON.stringify(votesJSON), "utf8", err => {
          if (err) { return console.log(err); }
          else { console.log("Votes saved."); }
        });
      } catch (err) {
        message.reply('error.');
      }
    }
    else {
      for (let entrant of entrants) {
        // if (!votes[entrant]) { votes[entrant] = new Array("<@"+message.author.id+">"); }
        // else { votes[entrant].push("<@"+message.author.id+">"); }
        if (!votes[entrant]) { votes[entrant] = new Array(message.author.tag); }
        else { votes[entrant].push(message.author.tag); }
      }
      message.reply(`はい。 :heavy_plus_sign: :one: for ${entrants}`);
      votesJSON.votes = votes;
      fs.writeFile(votesFilename, JSON.stringify(votesJSON), "utf8", err => {
        if (err) { return console.log(err); }
        else { console.log("Votes saved."); }
      });
    }
  }
  else if (args[0].startsWith('HELLO') || args[0].startsWith('HI')) {
    message.reply('hello!');
  }
  else if (args[0].includes('BYE') || (args[1] && args[1].includes('BYE'))
           || (args[0] === 'SAY' && (args[1].includes('BYE') || (args[2] && args[2].includes('BYE'))))) {
    message.reply('Thank you for coming!');
  }
  else if (args[0] === 'RICK' || args[0] === 'RICKROLL') {
    // Send rickroll to channel or DM
    if (/(?<=<[@]!?)\d+(?=>)/.test(args[3])) {
      // If to send to specific user DM
      CLIENT.users.fetch(args[3].match(/(?<=<[@]!?)\d+(?=>)/)[0]).then(async dest => {
        dest.createDM().then(async () => {
          rickRoll(dest.dmChannel).catch(logError);
        }).catch(logError);
      }).catch(logError);
    } else { rickRoll(message.channel).catch(logError); } // Otherwise just send to received command's channel
  }
  else if (args[0].startsWith('TUTTURU') || args[0].startsWith('TUTURU')) {
    message.reply('Tutturu~!');
  }
  else if (['WELCOME', 'GREET'].includes(args[0]) && args[1] && args[1].startsWith('<@')) {
    message.channel.send(salutations.welcome(rand(0, MAX_GREETS), args.slice(1).join(", ")));
  }
  else if (message.author.id === BOSS_ID && args[0].startsWith('DELETE') && args[1]) {
    /**
     * Message deletion commands
     */
    if (args[1] && args[0].endsWith('MSG')) {
      // Deletes a message made by this bot by the ID [and channel]
      let targetChannel = message.channel; // Channel of the command by default
      if (args[2] && /<#([0-9]+)>/.test(args[2])) {
        // If channel tag supplied as argument then attempt to get it
        const targetChannelID: string = args[2].match(/<#([0-9]+)>/)[1];
        let targetChannelTmp = CLIENT.channels.cache.get(targetChannelID);
        if (isTextCh(targetChannelTmp)) { targetChannel = targetChannelTmp; }
      }
      targetChannel.messages.fetch(args[1])
        .then(m => m.delete())
        .catch((error) => {
          logError(error);
          message.reply('I am sorry. My attempt to locate the message has failed.')
        });
    } else if (args[1] && args[0].endsWith('MSGS')) {
      // Deletes up to $LIMIT latest messages
      const LIMIT = Math.min(20, parseInt(args[1])+1);
      message.channel.messages.fetch({ limit: LIMIT })
        .then(msgs => {
          // If user ID supplied after target them otherwise target this bot's own messages
          const targetID = (args[2] && /<@([0-9]+)>/.test(args[2]))
                          ? args[2].match(/<@([0-9]+)>/)[1]
                          : CLIENT.user!.id;
          // If instead of user ID, "ALL" is given, then delete $LIMIT latest messages not matter the user
          msgs = (args[2] && args[2] === 'ALL')
                  ? msgs
                  : msgs.filter(m => m.author.id === targetID);
          msgCh.bulkDelete(msgs)
            .then(ms => console.log(`Extermination complete. ${ms.size-1}+1 messages were decimated.`))
            .catch(logError);
        })
        .catch((error) => {
          logError(error);
          message.reply('I am sorry, something went wrong while deleting a message. Please make sure you have given a number and/or a real user.')
        });
    }
    else if (args[1] && args[1] === 'ME') {
      message.reply("( ´･･)ﾉ(._.`) It's gonna be okay!");
    }
  }
  else if (message.author.id === BOSS_ID && args[0] === 'SAY' && args[1]) {
    // TODO:
    if (args[1].startsWith('"')) {
      const what = message.content.slice(BOTPREFIX.length+4);
      if (/"(.*?)"/.test(what)) {
        const text = what.match(/"(.*?)"/)![1];
        const where = what.slice(text.length+2).match(/(?<=<#!?)\d+(?=>)/);
        if (where) {
          // CLIENT.channels.find(ch => ch.id === where[0]).send(text)
          (CLIENT.channels.cache.get(where[0]) as TextChannel).send(text)
            .catch(() => message.reply('I am sorry but I could not send that message.'));
        }
      }
    }
  }
  else if (args[0] === 'YOUTUBE' && args[1]) {
    args.shift();
    const origMsg = message.content.trim();
    const query = msgTxtFilter(origMsg.slice(BOTPREFIX.length + args[0].length, origMsg.length));
    message.channel.send(`https://www.youtube.com/results?search_query=${query}`);
  }
  else if (args[0] === 'GOOGLE' && args[1]) {
    args.shift();
    const origMsg = message.content.trim();
    const query = msgTxtFilter(origMsg.slice(BOTPREFIX.length + args[0].length - 1, origMsg.length));
    message.channel.send(`https://www.google.ca/search?q=${query}`);
  }
});


CLIENT.login(TOKEN)
  .then(() => { console.log("Logged in."); })
  .catch(logError);
