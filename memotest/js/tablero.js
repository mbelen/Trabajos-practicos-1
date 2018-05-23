class Carta {
    constructor(x, y, cara) {
        this.x = x;
        this.y = y;
        this.id = `${x}${y}`;
        this.mascara = 'img/mano.jpg';
        this.cara = cara;

        $('.cartas').append(`
            <div class="carta" id="${this.id}-carta">
                <img src=${this.mascara} alt="mascara ${x}-${y}" id=${this.id} >
            </div>
        `);
    }

    mostrar() {
        $(`#${this.id}-carta > img`).attr('src', this.cara);
        $(`#${this.id}-carta`).toggleClass('rotate-card');
    }

    esconder() {
      $(`#${this.id}-carta > img`).attr('src', this.mascara);
      $(`#${this.id}-carta`).toggleClass('rotate-card');
    }
}

// 1. global vars
const COLUMNAS   = 4;
const FILAS      = 3;
const cartas     = [];
let INTENTOS     = 12;
let errorAudio   = new Audio ();
errorAudio.src   = 'audios/matanga.mp3';
let successAudio = new Audio ();

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

// start the game
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
let matchs = [];
function obtenerCarta(id) {
    // find() es un method en los arrays que "Encuentra" el elemento si la condicion se cumple
    return cartas.find(i => i.id === id);
}

function counter() {
    INTENTOS--;
    $('.infoTablero>p').text(`Intentos: ${INTENTOS}`);
    if(INTENTOS === 0) return go('./error.html');
}

function isSelected(id) {
    const wasSelected = seleccionados.find(x => x.id === id);
    const wasMatched  = matchs.find(x => x.id === id);
    if (wasSelected || wasMatched) {
        return true;
    }
    return false;
}

function playerWon() {
    // bgAudio.pause();
    // bgAudio.currentTime = 0;
    go('./ganador.html');
    return;
}

function verificadorDeCartas(carta) {
    const match = seleccionados.find(item => item.cara === carta.cara);
    seleccionados.push(carta);
    if(match) {
        // sucess match
        errorAudio.play()
        seleccionados.map(x => matchs.push(x));
        seleccionados = [];
        matchs.length === 12 ? playerWon() : null;
    } else if ( seleccionados.length % 2 === 0) {
        // common dude

        seleccionados.map(card => {
            setTimeout(() => {
                card.esconder();
            }, 1000)
        });
        counter();
        seleccionados = [];
    }
    return null;

}

// 5.2. evento click de cada carta
$('.carta').on('click', function(event) {
    const carta = obtenerCarta(event.target.id);
    if(!isSelected(carta.id)){
        carta.mostrar();
        verificadorDeCartas(carta);
    }
    return;
});


function dameUnRandom(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}