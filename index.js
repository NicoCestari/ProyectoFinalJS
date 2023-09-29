let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let carrito2 = document.getElementById("card");
const producto = document.querySelector("#contenedor");

let productoContenedor = document.getElementById("contenedor");


fetch('./productos.json')
    .then((response) => response.json())
    .then((data) => {


        data.forEach((el) => {
            let card = document.createElement("div");
            card.className = "product-card";

            let img = document.createElement("img");
            img.src = el.imagen;

            card.appendChild(img);

            let title = document.createElement("h3");
            title.innerText = `Nombre: ${el.nombre}`;

            card.appendChild(title);

            let price = document.createElement("p");
            price.innerText = `Precio: $${el.precio}`;

            card.appendChild(price);

            let buttonAdd = document.createElement("button");
            buttonAdd.innerText = `Agregar`;
            buttonAdd.className = "button";

            buttonAdd.onclick = () => agregarAlCarrito(el.id);

            card.appendChild(buttonAdd);

            productoContenedor.appendChild(card);

        });

    })


let btnShowCart = document.getElementById("show-cart");
btnShowCart.onclick = mostraCarrito;
