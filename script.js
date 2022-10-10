const imgXUrl = './public/exercise-4/x.png';
const imgChestUrl = './public/exercise-4/chest.png';
const imgSkullUrl = './public/exercise-4/skull.png';
const intentos$$ = document.querySelector('[data-function="attempts"]');
const high$$ = document.querySelector('[data-function="high"]');
const fhigh$$ = document.querySelector('[data-function="fhigh"]');
const chigh$$ = document.querySelector('[data-function="chigh"]');
const tabla$$ = document.querySelector('[data-function="board"]');
let coordenadas = {x : 0 , y : 0};
let gameOver = false;
let filas = 0;
let columnas = 0;
function creaTabla() {
    filas = prompt('Introduzca las filas entre 1 y 100.');
    while (filas < 1 || isNaN(filas) || filas > 100) filas = prompt('Numero erroneo. Introduzca las filas de nuevo');
    columnas = prompt('Introduzca las columnas entre 1 y 100.');
    while (columnas < 1 || isNaN(columnas) || columnas > 100) columnas = prompt('Numero erroneo. Introduzca las columnas de nuevo');
    coordenadas.x = Math.floor (Math.random() * filas + 1);
    coordenadas.y = Math.floor (Math.random() * columnas + 1);
    gameOver = false;
    for (let i = 1 ; i <= filas ; i++) {
        let tr$$ = document.createElement('tr');
        for (let j = 1 ; j <= columnas ; j++) {
            let td$$ = document.createElement('td');
            let imagen$$ = document.createElement('img');
            imagen$$.src = imgXUrl;
            td$$.addEventListener('click', function(event) {compruebaCelda(imagen$$, i, j)});
            td$$.appendChild(imagen$$);
            tr$$.appendChild(td$$);
        }
        tabla$$.appendChild(tr$$);
    }
}
function compruebaCelda(imagen$$, i, j) {
    if(!gameOver) {
        intentos$$.textContent++;
        if((coordenadas.x == i && coordenadas.y == j)) {
            if(high$$.textContent === '-' || high$$.textContent > intentos$$.textContent) {
                high$$.textContent = intentos$$.textContent;
                fhigh$$.textContent = filas;
                chigh$$.textContent = columnas;
            }
            else if ((high$$.textContent === intentos$$.textContent) && (fhigh$$.textContent <= filas && chigh$$.textContent <= columnas)) {
                high$$.textContent = intentos$$.textContent;
                fhigh$$.textContent = filas;
                chigh$$.textContent = columnas;
            }
            imagen$$.src = imgChestUrl;
            setTimeout(() => { 
                alert('Has encontrado el One Piece!');
                gameOver = true;
            }, 100);
        }
        else imagen$$.src = imgSkullUrl;
    }
    else alert('Juego acabado. Genere una nueva tabla.');
}
function reiniciaTabla(){
    let tbody$$ = document.querySelector('[data-function="board"]');
    let tr$$ = tbody$$.lastElementChild;
    while(tr$$) {
        let td$$ = tr$$.lastElementChild;
        while (td$$) {
            tr$$.removeChild(td$$);
            td$$ = tr$$.lastElementChild;
        }
        tbody$$.removeChild(tr$$);
        tr$$ = tbody$$.lastElementChild;
    }
    intentos$$.textContent = 0;
    creaTabla();
}
const boton$$ = document.querySelector('#reset').addEventListener('click', function (event) {reiniciaTabla()});
creaTabla();