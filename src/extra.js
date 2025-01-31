const palabras = ['SoyPollus', 'eldick', 'JhonGranizo', 'LaMarina', 'Cokas', 'BarcoRGB', 'Natrolia'];
let palabraActual = 0; // Índice de la palabra actual
let letraActual = 0; // Índice de la letra actual
const input = document.getElementById('broadcaster');

// Comprobar si el input existe
if (input) {
  function escribirLetra() {
    if (palabraActual < palabras.length) {
      const palabra = palabras[palabraActual];
      if (letraActual < palabra.length) {
        const letra = palabra.charAt(letraActual);
        input.placeholder += letra;
        letraActual++;
        setTimeout(escribirLetra, 50); // 100 milisegundos de retraso entre letras
      } else {
        setTimeout(borrarPalabra, 500); // 1 segundo de retraso antes de borrar la palabra
      }
    } else {
      // Una vez que se completan todas las palabras, reinicia el proceso
      palabraActual = 0;
      letraActual = 0;
      setTimeout(escribirLetra, 500); // 1 segundo de retraso antes de comenzar de nuevo
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
      setTimeout(escribirLetra, 500); // 1 segundo de retraso antes de escribir la siguiente palabra
    }
  }

  escribirLetra(); // Comienza a escribir la primera palabra letra por letra
} else {
  console.log("El input 'broadcaster' no existe.");
}


/*===== =====*/


// Mostrar/ocultar el menú desplegable al hacer clic en el elemento .dropdown
$('.dropdown').click(function () {
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});

// Manejar el clic en un elemento de la lista del menú desplegable
$('.dropdown .dropdown-menu li').click(function () {
  const selectedText = $(this).text();
  const selectedValue = parseInt(selectedText, 10); // Convertir el texto en un valor numérico
  $(this).parents('.dropdown').find('span').text(selectedText);
  $(this).parents('.dropdown').find('input').val(selectedValue);
});

/*===== =====*/


document.addEventListener('DOMContentLoaded', function () {
  const inputElement = document.getElementById('head-comando');

  inputElement.addEventListener('input', function (event) {
    // Obtener el valor actual del input sin espacios en blanco
    const valorSinEspacios = event.target.value.replace(/\s/g, '');

    // Si el valor cambió debido a los espacios en blanco, actualiza el valor del input
    if (valorSinEspacios !== event.target.value) {
      event.target.value = valorSinEspacios;
    }
  });
});