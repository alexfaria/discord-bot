const request = require('request');
const cheerio = require('cheerio');

exports.run = (client, message, args) => {
    return;
    channel.startTyping();
    request('http://insultgenerator.org/', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const insult = cheerio.load(body)('div.wrap').text();
            if (params[0] === 'me') msg.reply(insult);
            if (msg.mentions.users.first()) channel.sendMessage(msg.mentions.users.first() + insult);
            else channel.sendMessage(insult).then(channel.stopTyping());
        }
    });
}

exports.help = "(Deprecated, dont use this) Returns an insult.";
