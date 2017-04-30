const fs = require('fs');

exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.reply(`Must provide a new prefix.`);
    client.config.prefix = args[0];
    // Now we have to save the file.
    message.reply(`The prefix has now been changed to ${args[0]}`);
    fs.writeFile('./config.json', JSON.stringify(client.config, null, 2), (err) => {
        if (err) console.error(err)
    });
}

exports.help = "Change the bot's prefix.";