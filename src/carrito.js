import productos from "./data/productos";
import data from "./data/productos";
const btsAbCar = document.querySelectorAll('[data-accion="abrir-carrito"]');
const btsCeCar = document.querySelectorAll('[data-accion="cerrar-carrito"]');
//btnagregar al carrito
const btnAdCar = document.getElementById(`agregar-al-carrito`);
const producto = document.getElementById(`producto`);

const ventcar = document.getElementById(`carrito`);
let carrito = [];
const formatearMoneda = new Intl.NumberFormat(`es-MX`, {
	style: `currency`,
	currency: `MXM`,
});
const notificacion = document.getElementById(`notificacion`);
//funcion render
const renderCar = () => {
	ventcar.classList.add(`carrito--active`);

	const prodAnt = ventcar.querySelectorAll(`.carrito__producto`);
	prodAnt.forEach((producto) => producto.remove());

	let total = 0;
	if (carrito.length < 1) {
		ventcar.classList.add(`carrito--vacio`);
	} else {
		//
		ventcar.classList.remove(`carrito--vacio`);
		carrito.forEach((productoCarrito) => {
			//se obtiene el precio del producto desde la base de datos ./data/productos.js
			data.productos.forEach((productoBaseDatos) => {
				if (productoBaseDatos.id === productoCarrito.id) {
					//	console.log(productoBaseDatos.precio);
					productoCarrito.precio = productoBaseDatos.precio;
					total += productoBaseDatos.precio * productoCarrito.cantidad;
				}
			});
			//

			//Creamos una plantilla del codigo de html
			const plantillaProducto = `
        <div class="carrito__producto-info">
								<img src="./img/thumbs/${
									productoCarrito.color
								}.jpg" alt="" class="carrito__thumb" />
								<div>
									<p class="carrito__producto-nombre">
										<span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${
				productoCarrito.nombre
			}
									</p>
									<p class="carrito__producto-propiedades">
										Talla:<span>${productoCarrito.tamaño}</span> Color:<span>${
				productoCarrito.color
			}</span>
									</p>
								</div>
							</div>
							<div class="carrito__producto-contenedor-precio">
								<button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path
											d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
										/>
									</svg>
								</button>
								<p class="carrito__producto-precio">${formatearMoneda.format(
									productoCarrito.precio * productoCarrito.cantidad
								)}</p>
							</div>
        `; //creamos un div
			const itemcar = document.createElement(`div`);
			itemcar.classList.add(`carrito__producto`);

			itemcar.innerHTML = plantillaProducto;
			ventcar.querySelector(`.carrito__body`).appendChild(itemcar);
		});
		ventcar.querySelector(`.carrito__total`).innerText =
			formatearMoneda.format(total);
	}
};

//ejecutar el render
btsAbCar.forEach((boton) => {
	boton.addEventListener(`click`, (e) => {
		renderCar();
	});
});

//cerrar carrito
btsCeCar.forEach((boton) => {
	boton.addEventListener(`click`, (e) => {
		ventcar.classList.remove(`carrito--active`);
	});
});
let band = true;
btnAdCar.addEventListener(`click`, (e) => {
	const id = producto.dataset.productoId;
	const nombre = producto.querySelector(`.producto__nombre`).innerText;
	const cantidad = parseInt(producto.querySelector(`#cantidad`).value);
	const color = producto.querySelector(`#propiedad-color input:checked`).value;
	if (cantidad > 0) {
		const tamaño = producto.querySelector(
			`#propiedad-tamaño input:checked`
		).value;
		//console.log(id, nombre, cantidad, color, tamaño);
		if (carrito.length > 0) {
			let prodencar = false;
			carrito.forEach((item) => {
				if (item.id === id && item.tamaño === tamaño && item.color === color) {
					item.cantidad += cantidad;
					prodencar = true;
				}
			});
			if (!prodencar) {
				carrito.push({
					id: id,
					nombre: nombre,
					cantidad: cantidad,
					color: color,
					tamaño: tamaño,
				});
			}
		} else {
			carrito.push({
				id: id,
				nombre: nombre,
				cantidad: cantidad,
				color: color,
				tamaño: tamaño,
			});
		}
		let thumSrc = producto.querySelectorAll(`.producto__thumb-img`)[0].src;
		if (color === "blanco") {
			thumSrc = "./img/thumbs/blanco.jpg";
		} else if (color === "azul") {
			thumSrc = "./img/thumbs/azul.jpg";
		} else if (color === "negro") {
			thumSrc = "./img/thumbs/negro.jpg";
		}
		notificacion.querySelector(`img`).src = thumSrc;
		notificacion.classList.add(`notificacion--active`);
		setTimeout(() => {
			notificacion.classList.remove(`notificacion--active`);
		}, 2000);
	} else {
		alert("NO PUEDES AGREGAR VALORES NEGATIVOS NI NULOS POR FAVOR");
	}
});

//click para borrar productos

ventcar.addEventListener(`click`, (e) => {
	if (e.target.closest("button")?.dataset.accion === `eliminar-item-carrito`) {
		const producto = e.target.closest(`.carrito__producto`);
		const indexproducto = [
			...ventcar.querySelectorAll(`.carrito__producto`),
		].indexOf(producto);
		carrito = carrito.filter((item, index) => {
			if (index !== indexproducto) {
				return item;
			}
		});
		return renderCar();
	}
});

ventcar.querySelector(`#carrito__btn-comprar`).addEventListener(`click`, () => {
	let tot = 0;
	carrito.forEach((productoCarrito) => {
		data.productos.forEach((productoBaseDatos) => {
			if (productoBaseDatos.id === productoCarrito.id) {
				console.log(productoBaseDatos.precio);
				productoCarrito.precio = productoBaseDatos.precio;
				tot += productoBaseDatos.precio * productoCarrito.cantidad;
			}
		});
		let ids = productoCarrito.id;
		let nombres = productoCarrito.nombre;
		let productos = productoCarrito.cantidad;
		let colores = productoCarrito.color;
		let tamaños = productoCarrito.tamaño;
		console.log(ids, nombres, productos, colores, tamaños);
	});
	console.log(`el precio total es ${tot}`);
	window.location.href = "pago.html";
});
