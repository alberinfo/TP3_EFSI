const respuestas = document.getElementsByTagName('tbody')[0]; //tenemos un solo tbody
//const botonAplicarFiltros = document.getElementById('aplicarFiltros');
const inputName = document.getElementById('filtroNombre');
const categorias = document.getElementById('categorias');
const verMasInfo  = document.getElementById('btn-VerMasInfo');
// Insertar elementos en el html
function placeElementos(elementos) {
    respuestas.innerHTML = "";
    elementos.data.products.forEach((element, index) => {
        let nuevaRow = document.createElement('tr');
        //nuevaRow.innerHTML = `<th scope="row">${index+1}</th>\n<td><img class="w-25 h-25" src=${element.thumbnail}></td>\n<td>${element.title}</td>\n<td>${element.rating}</td>\n<td>${element.price}</td>\n<td><button type="button" onclick="()" class="btn btn-info">Ver Mas Info</button></td>`;
        nuevaRow.innerHTML = `
        <th scope="row">${index+1}</th>
        \n<td><img class="w-25 h-25" src=${element.thumbnail}></td>
        \n<td>${element.title}</td>
        \n<td>${element.rating}</td>
        \n<td>${element.price}</td>
        \n<td><button type="button" onclick="cargarModal('${element.id}')" class="btn btn-info">Ver Mas Info</button></td>`;
        respuestas.appendChild(nuevaRow);
    });
}

function cargarElementos(){
    axios.get('https://dummyjson.com/products')
        .then((response) => {
            placeElementos(response);
        });
    cargarCategorias();
}

// Make a request for a user with a given ID
inputName.onkeyup = (nombre) => {
    if(inputName.value.length < 3) cargarElementos();
    setTimeout(() => {}, 500);
    axios.get('https://dummyjson.com/products/search?q=' + inputName.value)
        .then((response) => {
            placeElementos(response);
        });
}

function cargarCategorias() {
    axios.get('https://dummyjson.com/products/categories')
        .then((response) => {   
            response.data.forEach((element) => {
                let newCategory = document.createElement('a');
                newCategory.classList.add('dropdown-item');
                newCategory.innerText = element;
                categorias.appendChild(newCategory);
            });
        })
}

function filtrarCategoria(){
    axios.get('https://dummyjson.com/products/category/' + inputName.value)
        .then((response) => {
            placeElementos(response);
        })
}

function cargarModal(id){
    axios.get('https://dummyjson.com/products/' + id)
        .then((response) => {
            let modalTitle = document.getElementById('modal-title');
            modalTitle.innerText = response.data.title;
            let modalBody = document.getElementById('modal-body');
            modalBody.innerHTML = `
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block w-100" src="${response.data.thumbnail}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src="${response.value.images[1]}" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src="..." alt="Third slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            `
            $("#modalInfo").show(); 
        })
}
