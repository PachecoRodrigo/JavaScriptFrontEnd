# Proyecto: Carrito de Compras Dinámico

Este proyecto es una implementación de un carrito de compras dinámico utilizando HTML, CSS, JavaScript y Bootstrap. Ofrece una experiencia interactiva para navegar por productos, agregar al carrito y gestionar la compra.

## Características Principales

### 1. Renderización Dinámica de Productos
- Los productos se renderizan dinámicamente desde un array en JavaScript.
- Cada producto incluye:
  - Imagen
  - Título
  - Precio
  - Botones:
    - **Agregar al Carrito**
    - **Más Información**

### 2. Modal de Descripción Ampliada
- Al hacer clic en **Más Información**, se abre un modal con:
  - Imagen del producto
  - Título
  - Descripción ampliada
  - Botón para agregar directamente al carrito desde el modal.

### 3. Carrito de Compras en Offcanvas
- El carrito se muestra como un **offcanvas** que incluye:
  - Lista de productos añadidos.
  - Subtotal, descuento e IVA calculados automáticamente.
  - Botón para navegar a la página de carrito completo.

### 4. Página de Carrito
- Lista detallada de productos en el carrito.
- Funciones disponibles:
  - Cambiar la cantidad de productos.
  - Eliminar productos.
  - Aplicar cupones de descuento.
  - Vaciar el carrito.
  - Proceder al checkout.

### 5. Checkout
- Un resumen de la compra se muestra en un modal:
  - Subtotal
  - Descuento
  - IVA
  - Total a pagar
- Botones para confirmar o cancelar la compra.

## Tecnologías Utilizadas
- **HTML5** y **CSS3** para la estructura y estilos.
- **Bootstrap 5** para modales, offcanvas y estilos generales.
- **JavaScript** para la lógica del carrito y las interacciones dinámicas.
- **LocalStorage** para guardar el estado del carrito.
