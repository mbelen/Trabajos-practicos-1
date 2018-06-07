
function setLevel(level) {

    let intentos;

    switch (level) {

        case "facil":
            intentos=18; 
            localStorage.setItem('nivel', intentos);
            go("./tablero.html");
        break;

        case "intermedio":
            console.log("INTERMEDIO")
            intentos=12;
            localStorage.setItem('nivel', intentos);
            go("./tablero.html");
        break;

        case "dificil":
            console.log("DIFICIL")
            intentos=8;
            localStorage.setItem('nivel', intentos);
            go("./tablero.html");        
        break;
    
        default: 
            console.log("necesitas seleccionar una dificultad");
            
            break;
    }
}