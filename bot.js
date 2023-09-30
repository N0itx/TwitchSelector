'use strict'

let broadcaster = window.location.href.split('?')[1];

if (broadcaster && broadcaster.length > 0) {
  console.log(broadcaster)
  const iframeSrc = `https://www.twitch.tv/embed/${broadcaster}/chat?darkpopout&parent=n0itx.github.io`;
  document.getElementById("chat_embed").src = iframeSrc;

  const client = new tmi.Client({
    connection: {
      reconnect: true,
      secure: true
    },
    channels: [broadcaster, 'elspreen']
  });

  client.connect().catch(console.error);

  client.on('connected', connection);
  // client.on('message', chat_messages);

  async function connection(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
    $('.consola-title div:eq(1)').html(`• ${addr}:${port} •`)
    $('.console-container').append(`<div class="console-line cvr">+ Conectado con twitch en: ${addr}:${port} *</div>`)
  }

  function chat_messages(chs, usr, msg, self) {
    $('.console-container').prepend(`<div class="console-line">+ ${usr.username}: ${msg}</div>`)
  }
} else {
  // alert("No se encontró el parámetro 'username' en la URL.");
  console.log("No se encontró el parámetro 'username' en la URL.");
}


//<div class="console-line">${}</div>
/*===== extra =====*/

function removeExedent(clase, num) {
  const elements = document.getElementsByClassName(clase);
  if (elements.length >= num) {
    elements[num - 1].parentNode.removeChild(elements[num - 1]);
  }
}