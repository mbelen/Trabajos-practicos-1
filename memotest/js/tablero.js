
function isUserExists() {

    const userName = localStorage.getItem('name');

    if (!userName) {
        go("./index.html");
        return;
    }
}

//cartas boca abajo
var fichas = [
    {img:"img/1.jpg", id:"carta_0"},

    {img:"img/2.jpg", id:"carta_1"},
    
    {img:"img/3.jpg", id:"carta_2"},

    {img:"img/4.jpg", id:"carta_3"},

    {img:"img/5.gif", id:"carta_4"},

    {img:"img/6.png", id:"carta_5"},
];


isUserExists();