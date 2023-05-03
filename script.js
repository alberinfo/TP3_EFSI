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
            let newCategory = document.createElement('a');
            newCategory.classList.add('dropdown-item');
            newCategory.innerText = "Eliminar filtros";
            newCategory.onclick = () => {cargarElementos()};
            categorias.appendChild(newCategory);

            response.data.forEach((element) => {
                //Reutilizamos la misma variable, total...
                let newCategory = document.createElement('a');
                newCategory.classList.add('dropdown-item');
                newCategory.innerText = element;
                newCategory.onclick = () => {
                    filtrarCategoria(newCategory.innerText);
                };
                categorias.appendChild(newCategory);
            });
        })
}

function filtrarCategoria(categoria){
    axios.get('https://dummyjson.com/products/category/' + categoria)
        .then((response) => {
            placeElementos(response);
        })
}

function cargarModal(id){
    axios.get('https://dummyjson.com/products/' + id)
        .then((response) => {
            let modalTitle = document.getElementById('modal-title');
            modalTitle.innerText = response.data.title;
            
            const caraouselImg = document.getElementById('carousel-inner');
            caraouselImg.innerHTML = "";
            let firstPassed = false;
            response.data.images.forEach(element => {
                let nuevohtml;
                if(firstPassed === false) nuevohtml = "<div class='carousel-item active'><img class='d-block w-100' src='reemplazame' alt='Second slide'></div>"; 
                else nuevohtml = "<div class='carousel-item'><img class='d-block w-100' src='reemplazame' alt='Second slide'></div>";
                firstPassed = true;
                caraouselImg.innerHTML += nuevohtml.replace("reemplazame", element);
            })

            let modalCuerpo = document.getElementById('modal-cuerpo');
            modalCuerpo.innerHTML = `<p>${response.data.description}</p>
            <p>Precio: ${response.data.price}USD con ${response.data.discountPercentage}% de descuento</p>
            <p>Stock: ${response.data.stock}</p>
            <p>Marca: ${response.data.brand}</p>        
            <p>Rating: ${response.data.rating}/5</p>
            <p>Categoria: ${response.data.category}</p>`;

            $("#modalInfo").modal('show'); 
        })
}
