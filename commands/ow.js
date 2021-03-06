const owjs = require('overwatch-js');

exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.channel.send(`Must provide a username.`);
    owjs.search('SadMoustache-2212')
        .then((data) => {
            console.dir(data, {
                depth: 2,
                colors: true
            });
            message.channel.send(data)
        })
}

exports.help = "Get overwatch data.";