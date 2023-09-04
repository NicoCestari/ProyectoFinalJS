//Programa interactivo Distribuidora Silva.

alert("Bienvenido A Distribuidora Silva. Para comenzar con el Bot, le pedimos unos datos: ");

function solicitarNombre() {
    let nombreIngresado = prompt("Ingrese su nombre y apellido");
    alert("El Usuario ingresado es: " + nombreIngresado);
}
solicitarNombre();

class Producto {
    constructor(id, nombre, precio, stock, oferta) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.oferta = oferta;
    }
};

const productos = [
    {
        id: 1,
        nombre: "Royal Canin",
        precio: 3000,
        stock: 30,
        oferta: false
    },
    {
        id: 2,
        nombre: "Proplan",
        precio: 2750,
        stock: 15,
        oferta: true
    },
    {
        id: 3,
        nombre: "Eukanuba",
        precio: 2600,
        stock: 0,
        oferta: false
    },
    {
        id: 4,
        nombre: "Old Prince",
        precio: 2650,
        stock: 50,
        oferta: true
    },
];

function mensajeGeneral(array) {
    let mensaje = "";
    array.forEach((el) => mensaje += `
    ${el.id}) ${el.nombre} - Precio: $${el.precio}
    `);

    return (mensaje);
}

function nuestrosProductos() {
    let mensajeProductos = mensajeGeneral(productos);
    alert(mensajeProductos);
};

function productosEnStock() {
    let productosEnStock = productos.filter((el) => el.stock > 1);

    let mensajeStock = mensajeGeneral(productosEnStock);
    alert(mensajeStock);

};

function productosEnOferta() {

    let productosEnOferta = productos.filter((el) => el.oferta);

    let mensajeOfertas = mensajeGeneral(productosEnOferta);
    alert(mensajeOfertas);
};

function agregarUnProducto() {
    let id = parseInt(prompt("Ingrese el Id del producto: "));
    let nombre = prompt("Ingrese nombre del producto a agregar: ");
    let precio = parseInt(prompt("Ingrese precio del producto: "));
    let stock = parseInt(prompt("Ingrese stock del producto: "));

    if (productos.some(el => el.id === id)) {
        alert("Ya existe! genere otro ID por favor: ");
    } else {
        if (nombre !== "" && precio > 0 && stock > 0) {
            let nuevoProducto = new Producto(id, nombre, precio, stock, false);

            productos.push(nuevoProducto);

        } else {
            alert("Datos Incorrectos.");
        }
    }
};

function eliminarProducto(id) {
    const indice = productos.findIndex((el) => el.id === id);

    if (indice >= 0) {
        productos.splice(indice, 1);
        alert(`Producto con ID ${id} eliminado.`);
    } else {
        alert(`No se encontró ningún producto con ID ${id}.`);
    }
}


let opcion;

do {

    opcion = (prompt("Para ver nuestro menu, ingrese una opción:\n\n1. Nuestros Productos.\n2. Ver los producto en stock.\n3. Ver productos en ofertas.\n4. Para agregar un producto.\n5. Elimina un producto.\n\n6. Para finalizar programa 0."));

    switch (opcion) {
        case "0":
            alert("Muchas gracias por interactuar con nosotros! que tengas buen dia.")
            break;
        case "1":
            nuestrosProductos();
            break;
        case "2":
            productosEnStock();
            break;
        case "3":
            productosEnOferta();
            break;
        case "4":
            agregarUnProducto();
            break;
        case "5":
            const idAEliminar = parseInt(prompt("Ingrese el ID del producto que desea eliminar: "));
            eliminarProducto(idAEliminar);
            break;

        default:
            alert("Opcion incorrecta, ingrese una opcion valida por favor.")
            break;
    }

} while (opcion !== "0");