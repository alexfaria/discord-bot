const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");
client.config = config;
client.queue = {};

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);
  // The list of if/else is replaced with those simple 2 lines:

  try {
    let commandFile = require(`./commands/${command}.js`);
    console.log(`[command]: '${command}' - ${message.author.username}`);
    commandFile.run(client, message, args);
  } catch (err) {
    if (err == 'ProcessExit') process.exit();
    console.error(err);
  }
});

client.login(config.token);

// client.on('error', (e) => console.error(e));
// client.on('warn', (e) => console.warn(e));
// client.on('debug', (e) => console.info(e));

// let events = Object.values(require('discord.js/src/util/Constants.js').Events);
// events.splice(events.indexOf('debug'),1 );
// events.splice(events.indexOf('ready'),1 );

// for(let event of events)
//   client.on(event, () => console.log(`[event]: ${event}`));

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});