// VERIFICAION Y VALIDACION DEL FORMULARIO

// Codigo para deshabilitar el envío de formularios si hay campos no válidos
(() => {
  'use strict'

  // Obtener todos los formularios a los que queremos aplicar estilos de validación
  const forms = document.querySelectorAll('.needs-validation')

  // Bucle y evitar la presentación
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()