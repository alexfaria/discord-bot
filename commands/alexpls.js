const request = require('request');

exports.run = (client, message, args) => {
    message.channel.startTyping();
    request('http://live-ur-best-life.herokuapp.com/api/quotes', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            const n = Math.floor(Math.random() * result.length);
            const quote = result[n].quote_content;
            message.channel.send(quote);
            message.channel.stopTyping();
        }
    });
}

exports.help = "Return a DJ Khaled quote";