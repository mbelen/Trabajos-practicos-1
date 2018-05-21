class Carta {
    constructor(x, y, cara) {
        this.x = x;
        this.y = y;
        this.id = `${x}${y}`
        this.mascara = 'img/mano.jpg';
        this.cara = cara;

        $('.cartas').append(`
            <div class="carta">
                <img src=${this.mascara} alt="mascara ${x}-${y}" id=${this.id} >
            </div>
        `);
    }

    voltear() {
        $(`#${this.id}`).attr('src', this.cara);
    }

    esconder() {
        $(`#${this.id}`).attr('src', this.mascara);
    }
}

// 1. constantes
const COLUMNAS  = 4;
const FILAS     = 3;
const cartas    = [];
let INTENTOS    = 14;
let PUNTOS      = 0;

// 2. Asigna cartas aleatoreas
const caras    = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.gif',
    './img/6.png'
];
const desordenador = [];

for (let i = 0; i < 6; i++) {

    // Escoger aleatoriamente uno del arreglo de caras
    const randomIndice = dameUnRandom(0, caras.length);
    const cara = caras[randomIndice];
    desordenador.push(cara);
    desordenador.push(cara);

    // Retirar del arreglo "caras" para que no lo volvamos a escoger
    caras.splice(randomIndice, 1);
}

// 3. desordenar los seleccionados
desordenador.sort(function () {
    return 1 - dameUnRandom(0, 6);
});


// 4. asignar caras
function start() {
    for (let i = 0; i < FILAS; i++) {
        for (let j = 0; j < COLUMNAS; j++) {
            cartas.push(new Carta(i, j, desordenador.pop()));
        }
    }
}

start();



// 5.1. cartas methods
let seleccionados = [];

function obtenerCarta(id) {
    // filtra elementos de un array si es que la condicion se cumple
    return cartas.find(function(item){
        return item.id === id;
    });
    
}

function restart() {
    INTENTOS--;
    PUNTOS = 0;
    $('.infoTablero>p').text(`Intentos: ${INTENTOS}`)
    if(INTENTOS == 0) return go('./error.html');
    seleccionados = [];
    setTimeout( function(){
        cartas.forEach(item => item.esconder());
    }, 750);
}

function verificadorDeCartas(carta) {
    // find() -> busca si existe algun elemento en ese array
    const isSelected = seleccionados.find(x => x.id === carta.id);
    if(isSelected) return alert('esta carta ya la seleccionaste homero!');

    seleccionados.push(carta);
    let match = seleccionados.find(x => x.cara === carta.cara);
    if(seleccionados.length > 1) {
        // console.log(match, 'MATCH')
        // if(match.length > 1) {
        //     console.log('hell yeah')
        //     return PUNTOS++;
        // }
        
        return restart();        

    }

    return;

}

// 5.2. evento click de cada carta
$('.carta').on('click', function(event) {
    const carta = obtenerCarta(event.target.id);
    carta.voltear();
    verificadorDeCartas(carta);
});


function dameUnRandom(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}