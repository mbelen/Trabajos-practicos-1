const container = document.getElementsByClassName("user");
function go(ruta) {
    window.location.href = ruta;
}//me dirije a la sig pág luego de completar el campo

function saveName() {

    const input   = document.getElementById('name');
    const name    = input.value;
    const noNameEl = $('#noName').length;

    if(!name && !noNameEl) {
        $(".user").append("<p id ='noName'>¡Hey, escribe tu nombre!</p>");
        return;
    } else if(!name) {
        return;
    }

    localStorage.setItem('name', name);

    go("./tablero.html");
}

function isUserExists() {

    const userName = localStorage.getItem('name');

    if (!userName) {
        go("./index.html");
        return;
    }
}

function goBack() {
    go('./index.html');
    return;
}

function tryAgain() {
  go('./tablero.html');
  return;
}

function startBG() {
  let bgAudio      = new Audio ();
  bgAudio.src      = 'audios/simpsons-opening.mp3';
  bgAudio.play();
}
isUserExists();