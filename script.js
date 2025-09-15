//Aqui creo un NodeList
let casilla = document.querySelectorAll(".tablero__casilla");
const refresh = document.getElementById("reset");
let turnoTexto = document.getElementById("turno");

let turno = "X";

const combo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameOver = false; //Hay que crearla para poder acabar el juego.

// Recorro cada casilla y la dejo vacía con el botón.
refresh.addEventListener("click", function () {
  casilla.forEach((casilla) => (casilla.textContent = ""));
  //Reinicio siempre el juego con X.
  turno = "X";
  turnoTexto.textContent = "Turno del jugador X";
  gameOver = false;
});

casilla.forEach((c) => {
  c.addEventListener("click", function () {
    //Si es true el juego para automáticamente.
    if (gameOver === true) {
      return;
    }

    if (c.textContent === "") {
      // Pinto la ficha en la casilla
      c.textContent = turno;

      // Aplico la clase según el turno actual
      if (turno === "X") {
        c.classList.add("jugador-x");
        turnoTexto.textContent = "Turno del jugador O";
        turnoTexto.className = "turno-o";
        turno = "O"; // cambio el turno al siguiente
      } else {
        c.classList.add("jugador-o");
        turnoTexto.textContent = "Turno del jugador X";
        turnoTexto.className = "turno-x";
        turno = "X"; // cambio el turno al siguiente
      }
    }

    // Creo un array con el contenido actual de cada casilla (X, O o vacío).
    // Lo convierto en un array para aplicarle el map.
    // map en JavaScript recorre un array elemento por elemento y
    // devuelve un nuevo array de la misma longitud con el resultado de aplicar una función a cada elemento.
    let lecturaTablero = Array.from(casilla).map((c) => c.textContent);
    // Creo de nuevo el array para tener la foto actual del tablero
    revisarGanador(lecturaTablero);
  });
});

// Recorro cada combinación posible (linea) y
// con sus 3 posiciones miro en el array lecturaTablero
// si esas casillas tienen el mismo valor.
function revisarGanador(lecturaTablero) {
  // Recorre cada combinación posible de victoria (filas, columnas, diagonales).
  for (const linea of combo) {
    // Guarda en 'a', 'b' y 'c' las casillas del tablero que forman esa línea
    let a = lecturaTablero[linea[0]];
    let b = lecturaTablero[linea[1]];
    let c = lecturaTablero[linea[2]];

    if (a === b && b === c && a != "") {
      if (a === "X") {
        turnoTexto.textContent = "¡Ha ganado el jugador X!";
        turnoTexto.className = "turno-x";
        gameOver = true;
      } else {
        turnoTexto.textContent = "¡Ha ganado el jugador O!";
        turnoTexto.className = "turno-o";
        gameOver = true;
      }
    }
  }
}
