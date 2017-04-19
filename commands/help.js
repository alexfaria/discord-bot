const fs = require('fs');

exports.run = (client, message, args) => {
  let string = 'Help';

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let help = 'Missing help info.';
      try {
        help = require(`../commands/${file}`).help;
      } catch (e) {
        console.log(e);
      }
      string += "\n**" + client.config.prefix + file.slice(0,-3) + "** :" +  help;
    });
    // message.channel.sendMessage("Sent you a DM with the help page :clipboard:");
    message.channel.sendMessage(string).then();
  });
}

exports.help = "Returns the list of commands.";