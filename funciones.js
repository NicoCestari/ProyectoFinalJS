function agregarAlCarrito(id) {
    if (carrito.some((el) => el.id === id)) {
        let index = carrito.findIndex(el => el.id === id);
        carrito[index].cantidad += 1;
    } else {
        let agregarProducto = productos.find((el) => el.id === id);
        carrito.push({
            ...agregarProducto,
            cantidad: 1,
        });
    }

    localStorage.setItem("carrito", (JSON.stringify(carrito)));

    mostraCarrito();
};

function mostraCarrito() {
    let divCarrito = document.getElementById("cart");

    divCarrito.innerHTML = "";

    carrito.forEach((el, index) => {
        let card = document.createElement("div");
        card.className = "carrito-card";

        let title = document.createElement("h3");
        title.innerText = `Nombre: ${el.nombre}`;

        card.appendChild(title);

        let price = document.createElement("p");
        price.innerText = `Precio: $${el.precio}`;

        card.appendChild(price);

        let divCantidad = document.createElement("div");
        divCantidad.className = "div-cantidad"

        let btnMinus = document.createElement("button");
        btnMinus.innerText = "-";
        btnMinus.onclick = () => modificarCarrito(index, "-");

        let quantity = document.createElement("p");
        quantity.innerText = `Cantidad: ${el.cantidad}`;

        let btnPlus = document.createElement("button");
        btnPlus.onclick = () => modificarCarrito(index, "+");
        btnPlus.innerText = "+";

        divCantidad.appendChild(btnMinus);
        divCantidad.appendChild(quantity);
        divCantidad.appendChild(btnPlus);

        card.appendChild(divCantidad);
        divCarrito.appendChild(card);

        let btnDelete = document.createElement("button");
        btnDelete.onclick = () => eliminarProducto(index);
        btnDelete.innerText = "Borrar";

        card.appendChild(btnDelete);

    });

};

function modificarCarrito(index, op) {
    if (op === "-") {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1
        } else {
            carrito.splice(index, 1)
        }

    } else {
        carrito[index].cantidad += 1
    };

    localStorage.setItem("carrito", (JSON.stringify(carrito)));

    mostraCarrito();

};

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", (JSON.stringify(carrito)));
    mostraCarrito();
};
