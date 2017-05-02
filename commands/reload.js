exports.run = (client, message, args) => {
  if (!args || args.length < 1) return message.reply(`Must provide a command name to reload.`);
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.channel.send(`The command ${args[0]} has been reloaded`);
};

exports.help = "Reloads a command.";