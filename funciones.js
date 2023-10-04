function ocultarCarrito() {
    carritoEnDOM.innerHTML = "";
};

function vaciarCarrito() {
  Swal.fire({
    title: 'Quiere eliminar los elementos del carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Mantener'
}).then((result) => {

    if (result.isConfirmed) {
      carrito = [];
      localStorage.setItem("carrito",(JSON.stringify(carrito)))
      mostrarCarrito();
          Swal.fire({
              title: 'Borrado!',
              icon: 'success',
              text: 'Carrito vacio'
          })
      };
})

};

function agregarAlCarrito(id) {

    let objetoParaCarrito = {
        ...componentes[id],
        cantidad: 1,
    };
    

    if (carrito.some((el) => el.id == objetoParaCarrito.id)) {
        let indice = carrito.findIndex(el => el.modelo === objetoParaCarrito.modelo);
        carrito[indice].cantidad += 1;
    } 
    else {   
        carrito.push(objetoParaCarrito);
    }

    localStorage.setItem("carrito",(JSON.stringify(carrito)))

    //

    mostrarCarrito();
};

function mostrarCarrito() {

    if (carrito.length === 0) {
        carritoEnDOM.innerHTML = "<p>Carrito vacío</p>"
    } else {
        let mostrarCarritoEnDOM = "";
        carrito.forEach((el) => {
            mostrarCarritoEnDOM += `
            <div class="card">
                <img src=${el.imagen} class="img-carrito w-25" />
                <h4>${el.modelo}</h4>
                <h5>Precio: U$D${el.precio}</h5>
                <h5>Cantidad: ${el.cantidad}</h5>
            </div>
            `
        });

        let resultado = 0;
        carrito.forEach((el) => {
            resultado += el.precio * el.cantidad
        });

        mostrarCarritoEnDOM += `
        <p class="texto-total">Total: U$D ${resultado}</p>
        `

        carritoEnDOM.innerHTML = mostrarCarritoEnDOM;
    };
};

function filtrarComponentes(tipo) {
    const componentesFiltrados = componentes.filter(el => el.tipo === tipo);
    mostrarResultadosFiltro(componentesFiltrados);
}
  
  
function mostrarResultadosFiltro(componentesFiltrados) {
    const resultadosFiltro = document.getElementById('resultadosFiltro');
    let mensajeComponentesFiltrados = '';
  
    if (componentesFiltrados.length === 0) {
        mensajeComponentesFiltrados = 'No se encontraron componentes de ese tipo.';
    } else {
        componentesFiltrados.forEach(el => {
          if (!el.enStock ) {
            mensajeComponentesFiltrados += `
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
              <button class="btn-style" onclick="agregarAlCarritoYMostrar(${el.id})">Agregar al carrito</button>
            </div>
            `
        
        } else {
            mensajeComponentesFiltrados += `
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
            <button class="btn-style" onclick="agregarAlCarritoYMostrar(${el.id})">Agregar al carrito</button>
          </div>
            `
        };
        });
    }
  
    resultadosFiltro.innerHTML = mensajeComponentesFiltrados;
}
  

  
// este se usa para el apartado de categorias
function agregarAlCarritoYMostrar(componenteId) {
    const componente = componentes.find(el => el.id === componenteId);
  
    
    const carritoExistente = carrito.find(el => el.id === componente.id);
  
    if (carritoExistente) {
      
      carritoExistente.cantidad += 1;
    } else {
      
      carrito.push({
        id: componente.id,
        modelo: componente.modelo,
        precio: componente.precio,
        cantidad: 1,
        imagen: componente.imagen,
      });
    }
  
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
   
    mostrarCarrito();
}

function notificacionConLibreria(){
  Toastify({
      text: "Se ha agregado al carrito",
      duration: 3000,
      style: {
          background: 'beige',
          color: "black"
      }
  }).showToast();
};





