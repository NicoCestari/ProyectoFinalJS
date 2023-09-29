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
    
    Toastify({
        text: "Producto agregado con exito!",
        duration: 2000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #354967, #141c29)'
        }
    }).showToast();

    mostraCarrito();
    
}

function mostraCarrito() {
    let divCarrito = document.getElementById("cart");

    divCarrito.innerHTML = "";

    carrito.forEach((el, index) => {
        let card = document.createElement("div");
        card.className = "carrito-card product-card";

        let title = document.createElement("h3");
        title.innerText = `${el.nombre}`;

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

    let total = calcularTotal();
    let totalElemento = document.createElement("h4");
    totalElemento.innerText = `Total: $${total}`;
    divCarrito.appendChild(totalElemento);

}

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

}

function eliminarProducto(index) {

    Swal.fire({
        icon: 'warning',
        title: 'Estás seguro de eliminar el producto?',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {

        if (result.isConfirmed) {
            carrito.splice(index, 1);
            localStorage.setItem("carrito", (JSON.stringify(carrito)));
            Swal.fire({
                title: 'Producto borrado!',
                icon: 'success'
            })
            mostraCarrito();
        }
    });

}

function calcularTotal() {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
    });
    return total;
}

$(window).on('load', function () {
    setTimeout(function () {
  $(".loader-page").css({visibility:"hidden",opacity:"0"})
}, 2000);
   
});
