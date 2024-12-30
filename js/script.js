// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.titulo === producto.titulo);
  if (productoExistente) {
      productoExistente.cantidad += 1;
  } else {
      carrito.push(producto);
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Renderizar el offcanvas
  renderizarOffcanvasCarrito();
}

// Función para renderizar el contenido del carrito en el offcanvas
function renderizarOffcanvasCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const listaCarrito = document.getElementById('offcanvas-lista-carrito');
  const subtotalElemento = document.getElementById('offcanvas-subtotal');
  const totalElemento = document.getElementById('offcanvas-total');
  let subtotal = 0;

  listaCarrito.innerHTML = '';

  carrito.forEach((producto) => {
      const item = document.createElement('li');
      item.classList.add('list-group-item');
      item.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.titulo}" width="50" height="50">
          <strong>${producto.titulo}</strong> - $${producto.precio.toFixed(2)} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toFixed(2)}
      `;
      listaCarrito.appendChild(item);

      subtotal += producto.precio * producto.cantidad;
  });

  subtotalElemento.innerText = subtotal.toFixed(2);
  totalElemento.innerText = (subtotal * 1.21).toFixed(2); // Incluye IVA
}

// Registrar eventos en los botones de "Agregar"
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btnCart').forEach((button) => {
      button.addEventListener('click', () => {
          const card = button.closest('.card');
          const producto = {
              titulo: card.querySelector('.card-title').innerText,
              precio: parseFloat(card.querySelector('.price').innerText.replace('$', '').trim()),
              descripcion: card.querySelector('.description').innerText,
              imagen: card.querySelector('.imgProduct').src,
              cantidad: 1,
          };

          agregarAlCarrito(producto);
          new bootstrap.Offcanvas(document.getElementById('offcanvasCart')).show();
      });
  });
});
