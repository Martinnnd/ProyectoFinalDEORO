const divCategorias = document.getElementById("categorias");

async function categorias() {

    divCategorias.innerHTML = "";

    const response = await fetch("categorias.json");
    const data = await response.json();

    data.forEach((idx) => {
        const boton = document.createElement("button");        
        boton.id=idx
        boton.className="btn btn-primary"
        boton.innerText=idx.nombre
        boton.onclick = () => filtrarComponentes(idx.valor);
        divCategorias.appendChild(boton);
    });

}

categorias();

