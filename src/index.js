const lista = [];

function myOnLoad() {
    const productos = ["naranja", "banana", "coca-cola", "leche", "agua"];
    const supermercados = ['Dia', 'Vea', 'Comodin', 'Carrefour'];
    productos.sort();
    addOptions("producto", productos);
    addOptions2('supermercado', supermercados);
}

function addOptions(domElement, array) {
    let select = document.getElementsByName(domElement)[0];
    for (value in array) {
        let option = document.createElement("option");
        option.text = array[value];
        select.add(option);
    }
}
function addOptions2(domElement, array) {
    let select = document.getElementsByName(domElement)[0];
    for (value in array) {
        let option = document.createElement("option");
        option.text = array[value];
        select.add(option);
    }
}

function agregar() {
    let nombreProducto = document.getElementById('listaProductos').value
    let precioProducto = document.getElementById('precioProd').value
    let nombreComercio = document.getElementById('listaComercios').value
    if (nombreProducto != '' && precioProducto != '' && nombreComercio != '') {
        let producto = { nombreProducto, precioProducto, nombreComercio }
    lista.push(producto)
    document.getElementById('listaProductos').value = null
    document.getElementById('precioProd').value = null
    document.getElementById('listaComercios').value = null
    mostrarTabla()
    mostrarTablaFiltrada()
    }else{
        console.log('faltan completar campos')
    }
}

function mostrarTabla() {
    if (document.getElementById('listado')) {
        let p = document.getElementById('tablaProductos')
        let child = document.getElementById('listado')
        p.removeChild(child)
    }
    let contenedorTabla = document.getElementById('tablaProductos')
    let tabla = document.createElement('table')
    let cuerpoTabla = document.createElement('tbody')
    let encabezado = ['producto', 'precio', 'comercio']
    tabla.className = 'table table-success'
    tabla.id = 'listado'
    tabla.appendChild(cuerpoTabla)

    let tr = document.createElement('tr')
    cuerpoTabla.appendChild(tr);
    for (let i = 0; i < encabezado.length; i++) {
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(encabezado[i]))
        tr.appendChild(th)
    }
    for (let i = 0; i < lista.length; i++) {
        let tr = document.createElement('tr')

        let producto = document.createElement('td')
        producto.appendChild(document.createTextNode(lista[i].nombreProducto))
        tr.appendChild(producto)

        let precio = document.createElement('td')
        precio.appendChild(document.createTextNode(lista[i].precioProducto))
        tr.appendChild(precio)

        let comercio = document.createElement('td')
        comercio.appendChild(document.createTextNode(lista[i].nombreComercio))
        tr.appendChild(comercio)

        cuerpoTabla.appendChild(tr)

    }

    contenedorTabla.appendChild(tabla)
}

function mostrarTablaFiltrada() {
    let filtrada = filtrarTabla()
    if (document.getElementById('filtrada')) {
        let p = document.getElementById('tablaFiltrada')
        let child = document.getElementById('filtrada')
        p.removeChild(child)
    }
    let contenedorTabla = document.getElementById('tablaFiltrada')
    let tabla = document.createElement('table')
    let cuerpoTabla = document.createElement('tbody')
    let encabezado = ['producto', 'precio', 'comercio']
    tabla.className = 'table table-dark'
    tabla.id = 'filtrada'
    tabla.appendChild(cuerpoTabla)

    let tr = document.createElement('tr')
    cuerpoTabla.appendChild(tr);
    for (let i = 0; i < encabezado.length; i++) {
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(encabezado[i]))
        tr.appendChild(th)
    }

    for (let i = 0; i < filtrada.length; i++) {
        let tr = document.createElement('tr')

        let producto = document.createElement('td')
        producto.appendChild(document.createTextNode(filtrada[i].nombreProducto))
        tr.appendChild(producto)

        let precio = document.createElement('td')
        precio.appendChild(document.createTextNode(filtrada[i].precioProducto))
        tr.appendChild(precio)

        let comercio = document.createElement('td')
        comercio.appendChild(document.createTextNode(filtrada[i].nombreComercio))
        tr.appendChild(comercio)

        cuerpoTabla.appendChild(tr)

    }

    contenedorTabla.appendChild(tabla)
}

function quitarRepetidos(){
    let productos = lista.map((item) =>[item.nombreProducto, item])
    let productosPares = new Map(productos);
    let listaUnicos = [...productosPares.values()]
    return listaUnicos
}

function filtrarTabla() {
    let listaFiltrada = quitarRepetidos()
    for (let i = 0; i < listaFiltrada.length; i++) {
        for (let j = 0; j < lista.length; j++) {
            if (listaFiltrada[i].nombreProducto == lista[j].nombreProducto && listaFiltrada[i].precioProducto >= lista[j].precioProducto) {
                    listaFiltrada[i] = lista[j]
            }
        }        
    }
    return listaFiltrada
}