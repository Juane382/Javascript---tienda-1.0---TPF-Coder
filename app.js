

const listaProd = [];

class Producto  {
    constructor(nombre,precio,descripcion,img){
        this.id = listaProd.length
        this.nombre = nombre
        this.precio= precio
        this.descripcion = descripcion
        this.cantidad = 1
        this.img = img
    }
    detalle(){
        return `El producto es: ${this.nombre} y tiene un valor de $ ${this.precio} `
    }
    
}

class Carrito {
    constructor(elemento=[]){
    this.elemento = elemento
    }
    agregarProductoCarro(producto){
        this.elemento = this.elemento.concat(producto)
    }
    mostrarProductos(){
        return this.elemento
    }
    calculaTotalCarro(){
    let suma = 0
        for(let i of this.elemento){
            suma = suma+(i.precio*i.cantidad)
        }
        return suma
    }
    clearCarrito(){
        this.elemento=[]
    }
    lengthCarrito(){
        return this.elemento.length
    }

}

listaProd.push(new Producto("Bicicleta MTB Specialized", 150000, "Blanca - talle S","0"))
listaProd.push(new Producto("Bicicleta MTB Venzo", 270000, "Roja - talle M","1"))
listaProd.push(new Producto("Bicicleta MTB Merida", 245000, "Negra - talle L","2"))
listaProd.push(new Producto("Bicicleta MTB BMC", 220000, "Gris - talle L","3"))
listaProd.push(new Producto("Bicicleta MTB Trek", 80000, "Negra - talle L","4"))
listaProd.push(new Producto("Bicicleta MTB GT", 75000, "Roja - talle S","5"))
listaProd.push(new Producto("Bicicleta MTB Volta", 224000, "Negra - talle M","6"))
listaProd.push(new Producto("Bicicleta MTB Giant", 110000, "Blanca - talle L","7"))
listaProd.push(new Producto("Bicicleta MTB Orbea", 115000, "Verde - talle L","8"))


const carrito1 = new Carrito ()

//mostrarCarrito()

//DOM
let mostrarProductosHTML = document.getElementById('mostrarProductos')
let btnMostrarProd = document.getElementById('btnMostrar')
let agregaCarro = document.getElementsByClassName('btnAgregarCarro')
let mostrarCarritoHTML = document.getElementById('mostrarCarrito')
let btnMostrarCarro = document.getElementsByClassName('btnMostrarCarro')
let totalCarroHTML = document.getElementById("totalCarro")
let btnDeleteItem = document.getElementsByClassName("delete btn  btn-danger")
let btnSelectorCantidad = document.getElementsByClassName("btnSelectorCantidad")
let climaHTML = document.getElementById('clima')
let btnComprar = document.getElementsByClassName('btn btn-success')
//Eventos

btnMostrarProd.addEventListener('click', btnMostrarProductos)
for(let i of btnComprar){
    i.addEventListener('click',comprar)
}

for(let i of btnMostrarCarro) {
    i.addEventListener('click', mostrarCarrito)
    
  }

btnMostrarProductos()
getCarro()
climaActual()
//////Funciones///////
function comprar(){
    swal({
        title: "Gracias por su compra",
        icon: "success",
        button: "Ok",
      });
}

// muetra carrito en browser
function mostrarCarrito(){
    let total = carrito1.calculaTotalCarro()
    mostrarCarritoHTML.innerHTML = ``
    const lista = carrito1.mostrarProductos()
    let n = 1
    let b = 0
    for(let i of lista){
        
        mostrarCarritoHTML.innerHTML += `
        <tr class="trCarrito">
        <th scope="row">${n++}</th>
                    <td class="table__productos">
                        <img src="./img/${i.img}.jpg" alt="">
                        <h6 class="tittle">${i.nombre}</h6>
                    </td>
                    <td class="table__precio"><p>$${i.precio}</p></td>
                    <td class="table__cantidad">
                        <input type="number" min="1" value="${i.cantidad}" class="btnSelectorCantidad">
                        <button class="delete btn  btn-danger" value="${b++}">X</button>
                    </td>
        </tr>`
        
   
        
    }
    btnDeleteItem = document.getElementsByClassName("delete btn  btn-danger")
    btnSelectorCantidad = document.getElementsByClassName("btnSelectorCantidad")
    for(let i of btnDeleteItem){
        i.addEventListener('click',deleteItem)

    }
    for(let i of btnSelectorCantidad){
        i.addEventListener('change',selectorCantidad)

    }
    
    totalCarroHTML.innerHTML= `<h3>Total: $ ${total}</h3>`
}

//selector cantidad desde carrito 
function selectorCantidad(e){
    const sumaImput = e.target
    const tr = sumaImput.closest('.trCarrito')
    const tittle = tr.querySelector('.tittle').textContent

    for(let i of carrito1.elemento){
        
        if(i.nombre===tittle){
            sumaImput.value<1? (sumaImput.value=1):sumaImput.value
            i.cantidad=Number(sumaImput.value)
        }
    }
    setStorage()
    carrito1.clearCarrito()
    getCarro()    
  
}

//borrar item de carrito
function deleteItem(e){
    let valueDelete = Number(e.target.value)
    let nMaxStorage = localStorage.length-1
    let difer = nMaxStorage-valueDelete
    for(let i = 1; i<=difer;i++){

        let indx = valueDelete+i
        console.log("indx: "+indx)
        let recuper = localStorage.getItem(indx)
        localStorage.setItem(`${valueDelete}`,recuper) 
    }
    
    localStorage.removeItem(`${nMaxStorage}`)
    carrito1.clearCarrito()
    getCarro()
    swal({
        title: "Producto removido",
        icon: "warning",
        button: "Continuar",
      });
      
}

//Vaciar carrito

function btnVaciar(e){
    e.preventDefault()
    localStorage.clear()
    carrito1.clearCarrito()

}

// guarda carrito en local storege
function setStorage(){

    const setLocal = (clave,valor)=>{localStorage.setItem(clave,valor)}
    let n = 0
    for(const i of carrito1.elemento){
        setLocal(n,JSON.stringify(i))
        n++
    }
}

// toma carrito del local storage
function getCarro(){
    
    for(let i=0; i < localStorage.length;i++){
        let recuper = localStorage.getItem(i)
        recuper = JSON.parse(recuper)
        carrito1.agregarProductoCarro(recuper)   
    }
    mostrarCarrito()
    
}

//Agrega producto seleccionado al carrito 
function agregaAlCarrito(e){ 
    let b = 0
    let valueBtn = Number( e.target.value)
    let listaCarrito = carrito1.mostrarProductos()

        for(let i of listaCarrito){
            if(i.id === listaProd[valueBtn].id&&b==0){ 
            i.cantidad++
            console.log(i.cantidad)
            console.log("id: "+i.id)
            b=1}
            }
        
           if(b==0){
           carrito1.agregarProductoCarro(listaProd[valueBtn])
        }

    setStorage ()
    swal({
        title: "Producto agregado",
        icon: "success",
        button: "Continuar comprando",
      });
      mostrarCarrito()
}

// muestra productos de la lista en el browser

function btnMostrarProductos(){
    
    mostrarProductosHTML.innerHTML = `` 
    let b = 0
    for(let i of listaProd){
        mostrarProductosHTML.innerHTML += `
        <div class="col d-flex justify-content-center-mb-4">
                <div class="card shadow mb-1 bg-dark rounded" style="width: 18rem;">
                    <h5 class="card-title text-primary">${i.nombre}</h5>
                    <img src="./img/${i.img}.jpg" class="card-img-top" alt="...">  
                    <div class="card-body">                  
                    <p class="card-text">${i.descripcion}.</p>
                    <h5 class="text-primary">Precio: $${i.precio}</h5>
                    <button type="button" class="btnAgregarCarro btn btn-primary button" value="${b}">Añadir a Carrito</button>
                    </div>
                </div>
            </div>`
            
            b++
        }
        agregaCarro = document.getElementsByClassName('btnAgregarCarro')

        for(let i of agregaCarro) {
            i.addEventListener('click', agregaAlCarrito)
            
        }
    }

    //Toma latitud y longitud del dispositivo 
function climaActual(){
    let lat
    let lon
    let temperatura
    let desClima 
    let imgClima
    let ciudad
    let img
    navigator.geolocation.getCurrentPosition(posicion => {
        lat =posicion.coords.latitude
        lon = posicion.coords.longitude
        
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=a6175641545f2301f0331aea7c22aeda&units=metric`
        
        fetch(url)
                    .then( response => { return response.json()})
                    .then( data => {
                        temperatura = data.main.temp
                        desClima = data.weather[0].description
                        imgClima = data.weather[0].main
                        ciudad =  data.name
                        switch (data.weather[0].main) {
                            case 'Thunderstorm':
                              img='imgclima/thunder.svg'
                              break;
                            case 'Drizzle':
                              img='imgclima/rainy-2.svg'
                              break;
                            case 'Rain':
                              img='imgclima/rainy-7.svg'
                              break;
                            case 'Snow':
                              img='imgclima/snowy-6.svg'
                              break;                        
                            case 'Clear':
                                img='imgclima/day.svg'
                              break;
                            case 'Atmosphere':
                              img='imgclima/weather.svg'
                                break;  
                            case 'Clouds':
                                img='imgclima/cloudy-day-1.svg'
                                break;  
                            default:
                              img='imgclima/cloudy-day-1.svg'
                          }
                        climaHTML.innerHTML =`
                        <img src="${img}" alt="">
                        <p>${temperatura}°C  </p>
                        <p>${desClima}   ,</p>
                        <p>${ciudad}  ,</p>
                        `
                        
                    })
                    .catch( error => {
                        console.log(error)
                    })
    })
    
}
