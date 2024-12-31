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
// Función para mostrar la descripción ampliada
// function mostrarDescripcion(producto) {
//   alert(`Descripción del producto: ${producto.descripcion}`);
// }

// Registrar eventos en los productos para mostrar descripción ampliada
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btnMoreInfo').forEach((button) => {
      button.addEventListener('click', () => {
          const card = button.closest('.card');
          const producto = {
              titulo: card.querySelector('.card-title').innerText,
              descripcion: card.querySelector('.description').innerText,
          };
          mostrarDescripcion(producto);
      });
  });
});

// Función para mostrar el modal con la descripción ampliada
function mostrarDescripcionEnModal(producto) {
  // Actualizar el contenido del modal
  const modalTitle = document.getElementById('product-modal-label');
    const modalDescription = document.getElementById('product-modal-description');
    const modalImage = document.getElementById('product-modal-image');
    const addToCartButton = document.getElementById('product-modal-add-to-cart');


  modalTitle.textContent = producto.titulo; // Asignar el título del producto
  modalDescription.textContent = producto.descripcion; // Asignar la descripción del producto
  modalImage.src = producto.imagen; // Asignar la imagen del producto

  // Asignar acción al botón "Agregar al Carrito"
  addToCartButton.onclick = () => {
      agregarAlCarrito(producto); // Función existente para agregar al carrito
      const modal = bootstrap.Modal.getInstance(document.getElementById('product-modal'));
      modal.hide(); // Cerrar el modal después de agregar al carrito
  };
  addToCartButton.onclick = () => {z
    agregarAlCarrito(producto);
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('product-modal'));
    modalInstance.hide();
  };

  // Mostrar el modal
  const modalInstance = new bootstrap.Modal(document.getElementById('product-modal'));
  modalInstance.show();
}
function registrarEventosProductos() {
  // Registrar eventos para los botones "Agregar al Carrito"
  document.querySelectorAll('.btnCart').forEach((button) => {
      button.addEventListener('click', () => {
          const card = button.closest('.card');
          const producto = {
              titulo: card.querySelector('.card-title').innerText,
              precio: parseFloat(card.querySelector('.price').innerText.replace('$', '').trim()),
              descripcion: card.querySelector('.description').innerText,
              imagen: card.querySelector('.card-img-top').src,
              cantidad: 1,
          };
          agregarAlCarrito(producto);
      });
  });

  // Registrar eventos para los botones "Más Información"
  document.querySelectorAll('.btnMoreInfo').forEach((button) => {
      button.addEventListener('click', () => {
          const card = button.closest('.card');
          const producto = {
              titulo: card.querySelector('.card-title').innerText,
              descripcion: card.querySelector('.description').innerText,
              imagen: card.querySelector('.card-img-top').src,
          };
          mostrarDescripcionEnModal(producto);
      });
  });
}



// Registrar eventos para los botones "Más Información"
function registrarEventosDescripcion() {
  document.querySelectorAll('.btnMoreInfo').forEach((button) => {
      button.addEventListener('click', () => {
          const card = button.closest('.card');
          const producto = {
              titulo: card.querySelector('.card-title').innerText,
              descripcion: card.querySelector('.description').innerText,
              imagen: card.querySelector('.card-img-top').src, // Asegúrate de usar la clase correcta
          };
          mostrarDescripcionEnModal(producto);
      });
  });
}

// Llamar a la función al cargar los productos
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();
  registrarEventosDescripcion();
});

// Llama a registrarEventosProductos después de renderizar
function renderizarProductos() {
  const productos = [
      {
          titulo: 'Producto 1',
          descripcion: 'Descripción ampliada del Producto 1',
          imagen: '/images/product1.jpg',
          precio: 100,
      },
      {
          titulo: 'Producto 2',
          descripcion: 'Descripción ampliada del Producto 2',
          imagen: '/images/product2.jpg',
          precio: 150,
      },
      {
          titulo: 'Producto 3',
          descripcion: 'Descripción ampliada del Producto 3',
          imagen: '/images/product3.jpg',
          precio: 200,
      },
  ];

  const container = document.getElementById('product-list');
  container.innerHTML = '';

  productos.forEach((producto) => {
      const card = document.createElement('div');
      card.classList.add('col-md-4');
      card.innerHTML = `
          <div class="card">
              <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
              <div class="card-body">
                  <h5 class="card-title">${producto.titulo}</h5>
                  <p class="description d-none">${producto.descripcion}</p>
                  <h6 class="price">$${producto.precio}</h6>
                  <div class="d-flex gap-2">
                      <button class="btn btn-primary btnCart">Agregar al Carrito</button>
                      <button class="btn btn-secondary btnMoreInfo">Más Información</button>
                  </div>
              </div>
          </div>
      `;
      container.appendChild(card);
  });

  // Registrar eventos después de renderizar
  registrarEventosProductos();
}
// Renderizar productos y agregar eventos
function renderizarProductos() {
  const productos = [
      {
          titulo: 'Producto 1',
          descripcion: 'Descripción ampliada del Producto 1',
          imagen: '/images/products/imac-2568270_1280.jpg',
          precio: 100,
      },
      {
          titulo: 'Producto 2',
          descripcion: 'Descripción ampliada del Producto 2',
          imagen: '/images/products/real-estate-6893060_1280.jpg',
          precio: 150,
      },
      {
          titulo: 'Producto 3',
          descripcion: "Descripción ampliada del Producto 3",
          imagen: '/images/products/Gemini_Generated_Image_gn3kg1gn3kg1gn3k.jpg',
          precio: 200,
      },
  ];

  const container = document.getElementById('product-lists');
  container.innerHTML = '';

  productos.forEach((producto) => {
      const card = document.createElement('div');
      card.classList.add('col');
      card.innerHTML = `
            <div class="card h-100">
              <img src="${producto.imagen}" class="card-img-top imgProduct" alt="${producto.titulo}">
              <div class="card-body">
                <h3 class="card-title">${producto.titulo}</h3>
                <h4 class="price" id="price">${producto.precio}</h4>
                <p class="description d-none">${producto.descripcion}</p>
              </div>
              <div class="card-footer d-flex justify-content-center gap-3 mt-3">
                <button class="btn btn-primary btnCart">Agregar al Carrito</button>
                <button class="btn btn-secondary btnMoreInfo">Más Información</button>
              </div>
          </div>
      `;
      container.appendChild(card);
  });

  // Registrar eventos en los botones de descripción
  registrarEventosDescripcion();
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', renderizarProductos);
