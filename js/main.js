// Archivo principal: main.js

// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para renderizar productos
function renderizarProductos() {
    const productos = [
        {
            titulo: 'Improtado 1',
            descripcion: 'Descripción ampliada del Producto 1',
            imagen: '/images/products/imac-2568270_1280.jpg',
            precio: 100,
        },
        {
            titulo: 'Improtado  2',
            descripcion: 'Descripción ampliada del Producto 2',
            imagen: '/images/products/real-estate-6893060_1280.jpg',
            precio: 150,
        },
        {
            titulo: 'Improtado 3',
            descripcion: 'Descripción ampliada del Producto 3',
            imagen: '/images/products/Gemini_Generated_Image_gn3kg1gn3kg1gn3k.jpg',
            precio: 200,
        },
    ];

    const container = document.getElementById('product-lists');
    if (!container) {
        console.error('No se encontró el contenedor para los productos. Verifica el ID del elemento.');
        return;
    }

    container.innerHTML = '';

    productos.forEach((producto) => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
        <div class="card h-100">
            <img src="${producto.imagen}" class="card-img-top imgProduct" alt="${producto.titulo}">
            <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="description d-none">${producto.descripcion}</p>
                <h6 class="price">$${producto.precio}</h6>
            </div>
            <div class="card-footer d-flex justify-content-center gap-3 mt-3">
                <button class="btn btn-primary btnCart">Agregar al Carrito</button>
                <button class="btn btn-secondary btnMoreInfo">Más Información</button>
            </div>
        </div>
    `;
        container.appendChild(card);
    });

    registrarEventosProductos();
}

// Función para registrar eventos en productos
function registrarEventosProductos() {
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

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  const productoExistente = carrito.find((item) => item.titulo === producto.titulo);
  if (productoExistente) {
      productoExistente.cantidad += 1;
  } else {
      carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCarrito();
  mostrarOffcanvas(); // Muestra el offcanvas correctamente
}

// Función para renderizar el carrito en el offcanvas
function renderizarCarrito() {
  const listaCarrito = document.getElementById('offcanvas-lista-carrito');
  const subtotalElemento = document.getElementById('offcanvas-subtotal');
  const totalElemento = document.getElementById('offcanvas-total');

  let subtotal = 0;
  listaCarrito.innerHTML = '';

  carrito.forEach((producto) => {
      const item = document.createElement('li');
      item.classList.add('list-group-item');
      item.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
              <img src="${producto.imagen}" alt="${producto.titulo}" width="50" height="50">
              <strong>${producto.titulo}</strong>
              <span>$${producto.precio.toFixed(2)} x ${producto.cantidad}</span>
          </div>
      `;
      listaCarrito.appendChild(item);
      subtotal += producto.precio * producto.cantidad;
  });

  subtotalElemento.innerText = subtotal.toFixed(2);
  totalElemento.innerText = (subtotal * 1.21).toFixed(2); // Incluye IVA
}

// Función para mostrar descripción en modal
function mostrarDescripcionEnModal(producto) {
  const modalTitle = document.getElementById('product-modal-label');
  const modalDescription = document.getElementById('product-modal-description');
  const modalImage = document.getElementById('product-modal-image');

  modalTitle.textContent = producto.titulo;
  modalDescription.textContent = producto.descripcion;
  modalImage.src = producto.imagen;

  try {
      const modalInstance = new bootstrap.Modal(document.getElementById('product-modal'));
      modalInstance.show();
  } catch (error) {
      console.error('Error al mostrar el modal:', error);
  }
}

// Función para mostrar el offcanvas
function mostrarOffcanvas() {
  try {
      const offcanvasElement = document.getElementById('offcanvasCart');
      const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
      offcanvasInstance.show();
  } catch (error) {
      console.error('Error al mostrar el offcanvas:', error);
  }
}

// Limpieza y registro de eventos
function registrarEventosProductos() {
  document.querySelectorAll('.btnCart').forEach((button) => {
      button.onclick = () => {
          const card = button.closest('.card');
          const producto = {
              titulo: card.querySelector('.card-title').innerText,
              precio: parseFloat(card.querySelector('.price').innerText.replace('$', '').trim()),
              descripcion: card.querySelector('.description').innerText,
              imagen: card.querySelector('.card-img-top').src,
              cantidad: 1,
          };
          agregarAlCarrito(producto);
      };
  });

  document.querySelectorAll('.btnMoreInfo').forEach((button) => {
      button.onclick = () => {
          const card = button.closest('.card');
          const producto = {
              titulo: card.querySelector('.card-title').innerText,
              descripcion: card.querySelector('.description').innerText,
              imagen: card.querySelector('.card-img-top').src,
          };
          mostrarDescripcionEnModal(producto);
      };
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();
  renderizarCarrito();
});
