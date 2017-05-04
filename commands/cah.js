const request = require('request');
const url = "http://www.crhallberg.com/cah/json/output.php";

exports.run = (client, message, args) => {
    request.post(url, {
        json: {
            decks: ['Base'],
            type: 'json'
        }
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            console.dir(result);
        }
    });
}

exports.help = "Get a random Cards Against Humanity question and answer.";