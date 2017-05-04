const request = require('request');
const url = "http://www.crhallberg.com/cah/json/output.php";

exports.run = (client, message, args) => {
    request.post(url, {
        form: {
            decks: ['Base', 'CAHe1', 'CAHe2', 'CAHe3', 'CAHe4', 'CAHe5', 'CAHe6',
                    'greenbox', '90s', 'Box', 'fantasy', 'food', 'science', 'www',
                    'hillary', 'trumpvote', 'trumpbag', 'xmas2012', 'xmas2013', 'PAXE2013',
                    'PAXP2014', 'PAXE2014', 'PAXP2014', 'PAXEP2014', 'PAXPP2014', 'PAX2015',
                    'HOCAH', 'reject', 'reject2', 'Canadian', 'misprint'],
            type: 'JSON'
        }
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            console.dir(result);
        }
    });
}

exports.help = "Get a random Cards Against Humanity question and answer.";