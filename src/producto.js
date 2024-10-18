const producto = document.getElementById("producto");
const productoImagen = producto.querySelector(".producto__imagen");
const thumbs = producto.querySelector(".producto__thumbs");
//color
const propiedadColor = producto.querySelector(`#propiedad-color`);
//cantidad
const btnDCantidad = producto.querySelector(`#disminuir-cantidad`);
const btnICantidad = producto.querySelector(`#incrementar-cantidad`);
const inputCantidad = producto.querySelector(`#cantidad`);
//funcionalidad de las thumbnails
thumbs.addEventListener(`click`, (e) => {
	if (e.target.tagName == "IMG") {
		const imagenSrc = e.target.src; //localiza la ubicacion de la imagen
		const lastindex = imagenSrc.lastIndexOf("/"); //se quita la ruta que no ocupamos
		const nombreimagen = imagenSrc.substring(lastindex + 1); // se extraen los caracteres y se guardan en en nombre como un string*/
		productoImagen.src = `./img/tennis/${nombreimagen}`; //se remplaza la ruta de producto imagen que se obtuvo al inicio del java class
		console.log(e.target.value);
	}
});
//funcionalidad de colores
propiedadColor.addEventListener(`click`, (e) => {
	if (e.target.tagName == "INPUT") {
		productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
		//CONDICIONAL PARA QUE SOLO FUNCIONEN LOS 3 BOOTONES Y NO EL CONTENEDOR
		console.log(e.target.value);
	}
});
//funcionalidades cantidades
btnICantidad.addEventListener(`click`, (e) => {
	inputCantidad.value = parseInt(inputCantidad.value) + 1;
});

btnDCantidad.addEventListener(`click`, (e) => {
	if (parseInt(inputCantidad.value) > 1) {
		inputCantidad.value = parseInt(inputCantidad.value) - 1;
	} else {
		alert("no puedes agregar una cantidad nula ni negativa al carrito");
	}
});
