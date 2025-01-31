'use strict'

let broadcaster = window.location.href.split('?')[1];
let userList = [];
let palabraMagica = '';

const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true
  },
  channels: [broadcaster]
});

$(document).ready(async function () {
  if (broadcaster && broadcaster.length > 0) { //Confirma si existe un broadcaster

    TwitchBOT(broadcaster); //Inicia el Bot de twitch
    ElementosBasicos(broadcaster) //Genera elementos con la info basica del Broadcaster

  } else {
    appconsole(`x <div class="rojo">No se encontró</div> el parámetro 'username' en la URL.`);
    console.log("No se encontró el parámetro 'username' en la URL.");
  }
});

async function ElementosBasicos(broadcaster) {
  const iframeSrc = `https://www.twitch.tv/embed/${broadcaster}/chat?darkpopout&parent=${window.location.hostname}`;
  document.getElementById("chat_embed").src = iframeSrc;

  let avatar = await GetTwitchInfo('avatar', broadcaster); //Obttiene la imangen de perfil
  let game = await GetTwitchInfo('game', broadcaster) //Obtiene juego en infoextra
  $('.head-user img').attr("src", avatar.replace('300x300', '70x70'));
  $('.head-info-nick').text(broadcaster);
  $('.head-info-extra').text(game);

  $('button.app-start').click(function (e) { //Comienza a registrar usuarios con PalabraMagica
    e.preventDefault();
    IniciarRecoleccion(); //Funcion que comienza el registro
  });
}

async function IniciarRecoleccion() {
  palabraMagica = $('#head-comando').val(); //Obtiene PalabraMagica del input

  if (palabraMagica && palabraMagica.length > 0) { //Verifica si existe una PalabraMagica en input
    appconsole(`+ <div class="verde">Iniciando</div> recoleccion de participantes [${palabraMagica}]`)
    client.on('message', twitchChat); //Inicia el registro del chat usando el Bot
    $('button.app-start').hide();
    //GENERA BOTONES
    let limpiar_btn = $(`<button class="app-clear">Limpiar</button>`);
    limpiar_btn.appendTo('.app-opciones').hide().slideDown(1000);

    let seleccionar_btn = $(`<button class="app-select">Seleccionar</button>`);
    seleccionar_btn.appendTo('.app-opciones').hide().slideDown(1000);

    let detener_btn = $(`<button class="app-stop">Detener</button>`);
    detener_btn.appendTo('.app-opciones').hide().slideDown(1000);

    let reiniciar_btn = $(`<button class="app-restart">Reiniciar</button>`);
    reiniciar_btn.appendTo('.app-opciones').hide().slideDown(1000);
    //GENERA ACCIONES DE BOTONES
    $('button.app-clear').click(function (e) {
      e.preventDefault();
      $('.app-cards').empty();
      appconsole(`+ Se limpiaron los usuarios seleccionados`)
    });
    $('button.app-select').click(function (e) {
      e.preventDefault();
      SeleccionarParticipantes();
      client.removeListener('message', twitchChat); //Detiene al Bot de seguir recolectando mensajes
    });
    $('button.app-stop').click(function (e) {
      e.preventDefault();
      client.removeListener('message', twitchChat); //Detiene al Bot de seguir recolectando mensajes
      appconsole(`- Deteniendo recoleccion de participantes`)
    });
    $('button.app-restart').click(function (e) {
      e.preventDefault();
      client.on('message', twitchChat); //Inicia el registro del chat usando el Bot
      userList = [];
      $('.app-cards').empty();
      appconsole(`+ <div class="verde">Se reinicio la lista de participantes.</div>`)
    });
  } else {
    appconsole(`<div class='naranja'>x No se a ingresado ningun comando para los usuarios.`);
  }
}

async function SeleccionarParticipantes() {
  let participantes_num = $('.dropdown').find('input').val(); //Obtiene la cantidad a seleccionar

  // Verifica que haya al menos 2 usuarios en la lista.
  if (userList.length <= participantes_num) {
    appconsole('- No hay suficientes usuarios en la lista para seleccionar.');
  } else {
    // Función para seleccionar usuarios al azar.
    function seleccionarUsuariosAlAzar(userList, cantidad) {
      const usuariosSeleccionados = [];

      while (usuariosSeleccionados.length < cantidad) {
        const indiceAleatorio = Math.floor(Math.random() * userList.length);
        const usuarioAleatorio = userList[indiceAleatorio];

        // Verifica que el usuario no esté duplicado.
        if (!usuariosSeleccionados.includes(usuarioAleatorio)) {
          usuariosSeleccionados.push(usuarioAleatorio);
        }
      }
      return usuariosSeleccionados;
    }
    // Selecciona 9 usuarios al azar.
    const usuariosSeleccionados = await seleccionarUsuariosAlAzar(userList, participantes_num);

    // Imprime los usuarios seleccionados.
    appconsole(`+ <div class="verde">Se han seleccionado los participantes.</div>`)
    usuariosSeleccionados.forEach((usuario, index) => {
      // appconsole(`+ ${index + 1}: ${usuario.username}`);
      GeneraUserCard(usuario.username)
    });
  }
}

async function GeneraUserCard(username) {

  let avatar = await GetTwitchInfo('avatar', username);

  let user_card = $(`
    <div class="app-user-card">
      <i class="card-suscriptor fa-user" title="usuario mafufo"></i>
      <img
        src="https://static-cdn.jtvnw.net/jtv_user_pictures/ac27d9ec-e281-477d-b940-d634963da59b-profile_banner-480.png"
        alt="" class="card-img-background">
      <img src="${avatar.replace('300x300', '70x70')}" alt="${username}-avatar" class="card-img">
      <div class="card-user-info">
        <div class="card-nick" title="${username}">${username}</div>
        <div class="card-nametag" title="Copiar nickname">name#tag</div>
      </div>
      <i class="card-reroll fa fa-retweet" title="Reroll user"></i>
    </div>
  `);
  user_card.appendTo('.app-cards').hide().slideDown(1000);
}

function TwitchBOT(broadcaster) {

  client.connect().catch(console.error);
  client.on('connected', connection);

  async function connection(addr, port) {
    console.log(`* Connected to ${addr}:${port}`)
    appconsole(`+ Conectado con twitch en:<div class="verde"> ${addr}:${port} </div>[modo anonimo]*`)
  }
}

async function twitchChat(channel, userstate, message, self) {
  // if (message === palabraMagica) {
  if (message.includes(palabraMagica)) {

    if (userstate.username == 'streamelements' || userstate.username == 'nightbot') return;
    // if (!userstate.subscriber) return;
    // if (!userstate.mod) return;

    // console.log(userstate)

    const userIndex = userList.findIndex((u) => u.username === userstate.username);

    if (userIndex === -1) {
      userList.push({
        username: userstate.username,
        sub: userstate.subscriber,
        mod: userstate.mod,
        id: userstate['user-id'],
        badges: userstate['badge-info'],
      });

      appconsole(`+ <div class="azul">${userstate.username}</div> se ha agregado a la lista!`);
    } else {
      // appconsole(`- <b>${userstate.username}</b> ya está en la lista.`);
    }
  }
}

//<div class="console-line">${}</div>
//$('.console-container').prepend(`<div class="console-line">+ </div>`)
/*===== extra =====*/

function removeExedent(clase, num) {
  const elements = document.getElementsByClassName(clase);
  if (elements.length >= num) {
    elements[num - 1].parentNode.removeChild(elements[num - 1]);
  }
}

function appconsole(texto) {
  let nuevoElemento = $(`<div class="console-line">${texto}</div>`);
  nuevoElemento.hide();
  nuevoElemento.prependTo('.console-container').slideDown(500);
}

function GetTwitchInfo(type, username) {
  return new Promise(resolve => {
    $.ajax({
      url: `http://127.0.0.1:1458/get?url=${encodeURIComponent(`https://decapi.me/twitch/${type}/${username}`)}`,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        resolve(data.contents)
      }
    });
  });
}