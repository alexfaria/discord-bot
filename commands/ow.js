const owjs = require('overwatch-js');

exports.run = (client, message, arg) => {
    if (!args || args.length < 1) return message.channel.sendMessage(`Must provide a username.`);
    owjs.getAll('pc', 'eu', args[0])
        .then((data) => {
            console.dir(data);
        })
    owjs.search('SadMoustache-2212')
        .then((data) => console.dir(data, {
            depth: 2,
            colors: true
        }));
}

exports.help = "Get overwatch data.";