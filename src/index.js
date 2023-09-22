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
    array.forEach((p) => {
        let option = document.createElement("option");
        option.text = p;
        select.add(option)
    })
}
function addOptions2(domElement, array) {
    let select = document.getElementsByName(domElement)[0];
    array.forEach((p) => {
        let option = document.createElement("option");
        option.text = p;
        select.add(option)
    })
}

function agregar() {
    let nombreProducto = document.getElementById('listaProductos').value
    let precioProducto = document.getElementById('precioProd').value
    let nombreComercio = document.getElementById('listaComercios').value
    if (nombreProducto != '' && precioProducto != '' && nombreComercio != '') {
        let producto = {nombreProducto, precioProducto, nombreComercio}
        lista.push(producto)
        document.getElementById('listaProductos').value = null
        document.getElementById('precioProd').value = null
        document.getElementById('listaComercios').value = null
        mostrarTabla()
        mostrarTablaFiltrada()
    } else {
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
    encabezado.forEach((element) => {
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(element))
        tr.appendChild(th)
    })
    lista.forEach((p) => {
        let tr = document.createElement('tr')
        let producto = document.createElement('td')
        producto.appendChild(document.createTextNode(p.nombreProducto))
        tr.appendChild(producto)
        let precio = document.createElement('td')
        precio.appendChild(document.createTextNode(p.precioProducto))
        tr.appendChild(precio)
        let comercio = document.createElement('td')
        comercio.appendChild(document.createTextNode(p.nombreComercio))
        tr.appendChild(comercio)
        cuerpoTabla.appendChild(tr)
    })
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
    encabezado.forEach((element) => {
        let th = document.createElement('th')
        th.appendChild(document.createTextNode(element))
        tr.appendChild(th)
    })
    filtrada.forEach((p) => {
        let tr = document.createElement('tr')
        let producto = document.createElement('td')
        producto.appendChild(document.createTextNode(p.nombreProducto))
        tr.appendChild(producto)
        let precio = document.createElement('td')
        precio.appendChild(document.createTextNode(p.precioProducto))
        tr.appendChild(precio)
        let comercio = document.createElement('td')
        comercio.appendChild(document.createTextNode(p.nombreComercio))
        tr.appendChild(comercio)
        cuerpoTabla.appendChild(tr)
    })
    contenedorTabla.appendChild(tabla)
}

function filtrarTabla() {
    let productos = lista.map((item) => [item.nombreProducto, item])
    let productosPares = new Map(productos);
    let listaUnicos = [...productosPares.values()]
    let filtrada = []
    listaUnicos.forEach((elemento, index) => {
        lista.forEach((e, i) => {
            if (elemento.nombreProducto == e.nombreProducto) {
                if (elemento.precioProducto >= e.precioProducto) {
                    filtrada[index] = lista[i]
                }
            }
        })
    })
    return filtrada
}