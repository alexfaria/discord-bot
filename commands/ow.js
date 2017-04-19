const owjs = require('overwatch-js');

exports.run = (client, message, arg) => {
    if (!args || args.length < 1) return message.channel.sendMessage(`Must provide a username.`);
    owjs.getAll('pc', 'eu', args[0])
        .then((data) => {
            console.dir(data);
        })
}

exports.help = "Get overwatch data.";
