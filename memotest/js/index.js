const container = document.getElementsByClassName("user");
function go(ruta) {
    window.location.href = ruta;
}//me dirije a la sig pág luego de completar el campo

function saveName() {

    const input = document.getElementById('name');
    const name = input.value;

    if(!name) {
        $(".user").append("<p id ='noName'>¡Hey, escribe tu nombre!</p>");
        return;
    }

    localStorage.setItem('name', name);

    go("./tablero.html");
}