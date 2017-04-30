exports.run = (client, message, args) => {
  let n = parseInt(args[0], 10);
  if (isNaN(n)) n = 4;
  /*
  channel.fetchMessages({ limit: n + 1 })
    .then(msgs => channel.bulkDelete(msgs))
    .catch(console.log);
  */
  message.channel.fetchMessages({
      limit: n + 1
    })
    .then(msgs => msgs.forEach(deleteMsg))
    .catch(console.log);
}

function deleteMsg(msgValue, msgKey, map) {
  msgValue.delete()
    .catch(console.log);
}

exports.help = "Delete an amount of messages. Default: 5";