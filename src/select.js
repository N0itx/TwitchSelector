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
  
  // Mostrar el valor seleccionado en un mensaje (opcional)
  $('.dropdown-menu li').click(function () {
    const inputValue = $(this).parents('.dropdown').find('input').val();
    // $('.msg').html(`<span class="msg">Valor seleccionado: <strong>${inputValue}</strong></span>`);
    console.log(`Valor seleccionado: ${inputValue}`)
  });