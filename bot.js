'use strict'

const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true
  },
  channels: ['soypan', 'elmariana']
});

client.connect().catch(console.error);

client.on('connected', connection);
client.on('message', chat_messages);

async function connection(addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
  $('.consola-title div:eq(1)').html(`• ${addr}:${port} •`)
  $('.consola-content div').append(`<p class="consola-msg">+ Conectado con twitch en: ${addr}:${port} *</p>`)
}

function chat_messages(chs, usr, msg, self) {
  // $('.consola-content div').prepend(`<p class="consola-msg">+ ${usr.username}: ${msg}</p>`)
}



/*===== extra =====*/

function removeExedent(clase, num) {
  const elements = document.getElementsByClassName(clase);
  if (elements.length >= num) {
    elements[num - 1].parentNode.removeChild(elements[num - 1]);
  }
}