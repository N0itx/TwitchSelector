const input = document.getElementById('broadcaster');
const palabras = ['SoyPan', 'elded', 'JuanSGuarnizo', 'ElMariana', 'AldoGeo', 'BarcaGamer', 'NataliaMX'];
let palabraActual = 0; // Índice de la palabra actual
let letraActual = 0;  // Índice de la letra actual

function escribirLetra() {
  if (palabraActual < palabras.length) {
    const palabra = palabras[palabraActual];
    if (letraActual < palabra.length) {
      const letra = palabra.charAt(letraActual);
      input.placeholder += letra;
      letraActual++;
      setTimeout(escribirLetra, 50); // 100 milisegundos de retraso entre letras
    } else {
      setTimeout(borrarPalabra, 1000); // 1 segundo de retraso antes de borrar la palabra
    }
  } else {
    // Una vez que se completan todas las palabras, reinicia el proceso
    palabraActual = 0;
    letraActual = 0;
    setTimeout(escribirLetra, 1000); // 1 segundo de retraso antes de comenzar de nuevo
  }
}

function borrarPalabra() {
  const palabra = palabras[palabraActual];
  let placeholder = input.placeholder;
  if (palabra.length > 0 && placeholder.length > 0) {
    placeholder = placeholder.slice(0, -1); // Elimina la última letra del placeholder
    input.placeholder = placeholder;
    setTimeout(borrarPalabra, 50); // 100 milisegundos de retraso antes de borrar la siguiente letra
  } else {
    palabraActual++;
    letraActual = 0;
    setTimeout(escribirLetra, 1000); // 1 segundo de retraso antes de escribir la siguiente palabra
  }
}

escribirLetra(); // Comienza a escribir la primera palabra letra por letra