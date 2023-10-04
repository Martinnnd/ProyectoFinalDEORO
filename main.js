let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let divComponentes = document.getElementById("products-container");
let divComponentesFiltrados = document.getElementById("resultadosFiltro");


let carritoEnDOM = document.getElementById("cart");

let mensajeComponentes = "";

componentes.forEach((el) => {
    if (!el.enStock ) {
        mensajeComponentes += `
          <div class="card no-stock" id=${el.id}>
          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img src=${el.imagen}
              class="w-25" />
            <a href="#!">
              <div class="mask">
                <div class="d-flex justify-content-center align-items-end h-100">
                  <h5><span class="badge bg-danger ms-2">SIN STOCK</span></h5>
                </div>
              </div>
            </a>
          </div>
          <div class="card-body">
            <a href="" class="text-reset">
              <h5 class="card-title mb-3">${el.modelo}</h5>
            </a>
            <h6 class="mb-3">$${el.precio}</h6>
          </div>
          <button id="add-cart" value=${el.id} class="btn-style" disabled>Agregar al carrito</button>
        </div>
        `
    
    } else {
        mensajeComponentes += `
        <div class="card" id=${el.id}>
        <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
          data-mdb-ripple-color="light">
          <img src=${el.imagen}
            class="w-25" />
          <a href="#!">
            ${el.enLiquidacion ? `<div class="mask">
              <div class="d-flex justify-content-center align-items-end h-100 texto-oferta">
                <h5><span class="badge bg-success ms-2">LIQUIDACION</span></h5>
              </div>
            </div>` : "<br><br>"}
          </a>
        </div>
        <div class="card-body">
          <a href="" class="text-reset">
            <h5 class="card-title mb-3">${el.modelo}</h5>
          </a>
          <h6 class="mb-3">$${el.precio}</h6>
        </div>
          <button id="add-cart div-toastify" value=${el.id} class="btn-style">Agregar al carrito</button>
      </div>
        `
    };
});

divComponentes.innerHTML = mensajeComponentes;


let cards = Array.from(document.getElementsByClassName("card"));

cards.forEach((el, idx) => {
  if (el.className === "card") {
    el.onclick = () => {
      agregarAlCarrito(idx);
      notificacionConLibreria();
    };
  };
});



let botonMostrar = document.getElementById("show-cart");
let botonOcultar = document.getElementById("hide-cart");
let botonVaciar = document.getElementById("clean-cart");

botonMostrar.onclick = mostrarCarrito;
botonOcultar.onclick = ocultarCarrito;
botonVaciar.onclick = vaciarCarrito;







