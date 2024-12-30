function renderizarCarrito() {
	const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	const listaCarrito = document.getElementById('lista-carrito');
	const subtotalElemento = document.getElementById('subtotal-carrito');
	const totalElemento = document.getElementById('total-carrito');
	let subtotal = 0;

	listaCarrito.innerHTML = '';

	carrito.forEach((producto, index) => {
		const item = document.createElement('li');
		item.classList.add('list-group-item');
		item.innerHTML = `
			<div class="d-flex align-items-center justify-content-between">
				<div>
					<img src="${producto.imagen}" alt="${producto.titulo}" width="50" height="50">
					<strong>${producto.titulo}</strong>
				</div>
				<div>
					<button class="btn btn-sm btn-outline-secondary" onclick="disminuirCantidad(${index})">-</button>
					<span class="mx-2">${producto.cantidad}</span>
					<button class="btn btn-sm btn-outline-secondary" onclick="aumentarCantidad(${index})">+</button>
				</div>
				<div>
					$${producto.precio.toFixed(2)} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toFixed(2)}
					<button class="btn btn-danger btn-sm ms-2" onclick="eliminarDelCarrito(${index})">Eliminar</button>
				</div>
			</div>
		`;
		listaCarrito.appendChild(item);

		subtotal += producto.precio * producto.cantidad;
	});

	subtotalElemento.innerText = subtotal.toFixed(2);
	totalElemento.innerText = (subtotal * 1.21).toFixed(2); // Incluye IVA
}

function eliminarDelCarrito(index) {
	let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	carrito.splice(index, 1);
	localStorage.setItem('carrito', JSON.stringify(carrito));
	renderizarCarrito();
}

function vaciarCarrito() {
	localStorage.removeItem('carrito');
	renderizarCarrito();
}

document.addEventListener('DOMContentLoaded', renderizarCarrito);

// Función para aumentar la cantidad de un producto
function aumentarCantidad(index) {
	let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	carrito[index].cantidad += 1; // Incrementamos la cantidad
	localStorage.setItem('carrito', JSON.stringify(carrito));
	renderizarCarrito(); // Actualizamos la vista del carrito
}

// Función para disminuir la cantidad de un producto
function disminuirCantidad(index) {
	let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	if (carrito[index].cantidad > 1) {
		carrito[index].cantidad -= 1; // Reducimos la cantidad si es mayor a 1
	}
	localStorage.setItem('carrito', JSON.stringify(carrito));
	renderizarCarrito(); // Actualizamos la vista del carrito
}

// Función para mostrar el modal de checkout
function mostrarCheckout() {
	const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	if (carrito.length === 0) {
			alert('El carrito está vacío. Agrega productos antes de continuar.');
			return;
	}

	// Calcular los valores
	let subtotal = 0;
	carrito.forEach(producto => {
			subtotal += producto.precio * producto.cantidad;
	});

	const descuento = subtotal > 100 ? subtotal * 0.1 : 0; // 10% de descuento si supera $100
	const iva = (subtotal - descuento) * 0.21; // IVA 21%
	const total = subtotal - descuento + iva;

	// Mostrar valores en el modal
	document.getElementById('modal-subtotal').innerText = subtotal.toFixed(2);
	document.getElementById('modal-descuento').innerText = descuento.toFixed(2);
	document.getElementById('modal-iva').innerText = iva.toFixed(2);
	document.getElementById('modal-total').innerText = total.toFixed(2);

	// Mostrar el modal
	const modal = new bootstrap.Modal(document.getElementById('checkout-modal'));
	modal.show();
}

// Función para realizar la compra
function realizarCompra() {
	alert('¡Gracias por tu compra! El pedido ha sido procesado.');
	localStorage.removeItem('carrito'); // Vaciar el carrito
	location.reload(); // Recargar la página para actualizar la vista
}
// Diccionario de cupones válidos
const cuponesValidos = {
	'DESCUENTO10': 0.1, // 10% de descuento
	'DESCUENTO20': 0.2  // 20% de descuento
};

// Variable global para almacenar el descuento actual
let descuentoGlobal = 0;

// Función para aplicar un cupón
function aplicarCupon() {
	const input = document.getElementById('coupon-input');
	const cupón = input.value.trim().toUpperCase();

	if (cuponesValidos[cupón]) {
			descuentoGlobal = cuponesValidos[cupón];
			alert(`Cupón aplicado: ${cupón} (${descuentoGlobal * 100}% de descuento)`);
			renderizarCarrito(); // Actualiza los valores en pantalla
	} else {
			alert('Cupón inválido. Por favor, verifica e intenta nuevamente.');
			descuentoGlobal = 0;
	}
	input.value = ''; // Limpia el campo
}

// Actualiza renderizarCarrito para incluir el descuento global
function renderizarCarrito() {
	const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	const listaCarrito = document.getElementById('lista-carrito');
	const subtotalElemento = document.getElementById('subtotal-carrito');
	const descuentoElemento = document.getElementById('descuento-carrito');
	const totalElemento = document.getElementById('total-carrito');
	let subtotal = 0;

	listaCarrito.innerHTML = '';

	carrito.forEach((producto, index) => {
			const item = document.createElement('li');
			item.classList.add('list-group-item');
			item.innerHTML = `
					<div class="d-flex align-items-center justify-content-between">
							<div>
									<img src="${producto.imagen}" alt="${producto.titulo}" width="50" height="50">
									<strong>${producto.titulo}</strong>
							</div>
							<div>
									<button class="btn btn-sm btn-outline-secondary" onclick="disminuirCantidad(${index})">-</button>
									<span class="mx-2">${producto.cantidad}</span>
									<button class="btn btn-sm btn-outline-secondary" onclick="aumentarCantidad(${index})">+</button>
							</div>
							<div>
									$${producto.precio.toFixed(2)} x ${producto.cantidad} = $${(producto.precio * producto.cantidad).toFixed(2)}
									<button class="btn btn-danger btn-sm ms-2" onclick="eliminarDelCarrito(${index})">Eliminar</button>
							</div>
					</div>
			`;
			listaCarrito.appendChild(item);

			subtotal += producto.precio * producto.cantidad;
	});

	const descuento = subtotal * descuentoGlobal; // Aplica descuento global
	const iva = (subtotal - descuento) * 0.21; // Calcula IVA
	const total = subtotal - descuento + iva;

	subtotalElemento.innerText = subtotal.toFixed(2);
	descuentoElemento.innerText = descuento.toFixed(2);
	totalElemento.innerText = total.toFixed(2);
}
function mostrarCheckout() {
	const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	if (carrito.length === 0) {
			alert('El carrito está vacío. Agrega productos antes de continuar.');
			return;
	}

	// Calcular los valores
	let subtotal = 0;
	carrito.forEach(producto => {
			subtotal += producto.precio * producto.cantidad;
	});

	const descuento = subtotal * descuentoGlobal; // Usa el descuento global
	const iva = (subtotal - descuento) * 0.21; // IVA 21%
	const total = subtotal - descuento + iva;

	// Mostrar valores en el modal
	document.getElementById('modal-subtotal').innerText = subtotal.toFixed(2);
	document.getElementById('modal-descuento').innerText = descuento.toFixed(2);
	document.getElementById('modal-iva').innerText = iva.toFixed(2);
	document.getElementById('modal-total').innerText = total.toFixed(2);

	// Mostrar el modal
	const modal = new bootstrap.Modal(document.getElementById('checkout-modal'));
	modal.show();
}
