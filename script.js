// URL de la API que vamos a consumir
const API_URL = 'https://fakestoreapi.com/products';

// Seleccionamos los elementos del DOM que vamos a manipular
const productosContainer = document.getElementById('productos-container');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

/**
 * Función asíncrona principal que obtiene y muestra los productos
 * Utiliza async/await para manejar promesas de forma más legible
 */
async function cargarProductos() {
    try {
        // Mostramos el mensaje de carga
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        
        // Hacemos la petición a la API usando fetch
        const response = await fetch(API_URL);
        
        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        
        // Convertimos la respuesta a JSON
        const productos = await response.json();
        
        // Mostramos los datos en la consola para verificar (requisito del proyecto)
        console.log('Datos recibidos de la API:', productos);
        
        // Ocultamos el mensaje de carga
        loadingElement.style.display = 'none';
        
        // Llamamos a la función que renderiza los productos
        renderizarProductos(productos);
        
    } catch (error) {
        // Si hay algún error, lo mostramos en consola y en pantalla
        console.error('Error al cargar productos:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
    }
}

/**
 * Función que crea y muestra las tarjetas de productos en el DOM
 * @param {Array} productos - Array con los datos de productos de la API
 */
function renderizarProductos(productos) {
    // Limpiamos el contenedor antes de agregar productos
    productosContainer.innerHTML = '';
    
    // Iteramos sobre cada producto y creamos su tarjeta
    productos.forEach(producto => {
        // Creamos el elemento div para la tarjeta
        const card = document.createElement('div');
        card.className = 'producto-card';
        
        // Limitamos la descripción a 100 caracteres
        const descripcionCorta = producto.description.length > 100 
            ? producto.description.substring(0, 100) + '...' 
            : producto.description;
        
        // Insertamos el HTML de la tarjeta con los datos del producto
        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <span class="categoria">${producto.category}</span>
            <h3>${producto.title}</h3>
            <p>${descripcionCorta}</p>
            <div class="precio">$${producto.price.toFixed(2)}</div>
        `;
        
        // Agregamos la tarjeta al contenedor principal
        productosContainer.appendChild(card);
    });
}

// Ejecutamos la función cuando la página termine de cargar
// Esto asegura que el DOM esté listo antes de manipularlo
document.addEventListener('DOMContentLoaded', cargarProductos);