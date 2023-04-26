const respuestas = document.getElementsByTagName('tbody')[0]; //tenemos un solo tbody
//const botonAplicarFiltros = document.getElementById('aplicarFiltros');
const inputName = document.getElementById('filtroNombre');
const categorias = document.getElementById('categorias');

// Insertar elementos en el html
function placeElementos(elementos) {
    respuestas.innerHTML = "";
    elementos.data.products.forEach((element, index) => {
        let nuevaRow = document.createElement('tr');
        nuevaRow.innerHTML = `<th scope="row">${index+1}</th>\n<td><img class="w-25 h-25" src=${element.thumbnail}></td>\n<td>${element.title}</td>\n<td>${element.rating}</td>\n<td>${element.price}</td>`;
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
    axios.get('https://dummyjson.com/products/categories').then((response) => {
        response.forEach((element) => {
            let newCategory = document.createElement('a');
            newCategory.classList.add('dropdown-item');
            newCategory.innerText = element;
            categorias.appendChild(newCategory);
        });
    })
}