exports.run = (client, message, args) => {
    let messagescount = 4;
    if (args || args.length >= 1) messagecount = parseInt(args[0]);
    // get the channel logs
    message.channel.fetchMessages({
            limit: 100
        })
        .then(messages => {
            let msg_array = messages.array();
            // filter the message to only your own
            msg_array = msg_array.filter(m => m.author.id === client.user.id);
            // limit to the requested number + 1 for the command message
            msg_array.length = messagecount;
            // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
            msg_array.map(m => m.delete().catch(console.error));
        });
}

exports.help = "Delete bot messages.";