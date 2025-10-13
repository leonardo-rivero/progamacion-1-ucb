
const filas = 10;
const columnas = 10;
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
const cellSize = canvas.width / columnas;

// 🖌️ Función general para dibujar la matriz con colores y números
function dibujarMatriz(matriz) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const valor = matriz[i][j];

      // 🎨 Color según el valor
      if (valor === 0) ctx.fillStyle = "rgba(23, 126, 26, 1)";
      else if (valor === 1) ctx.fillStyle = "#ff0000ff";  
      else if (valor === 2) ctx.fillStyle = "#eeff00ff";
      else ctx.fillStyle = "#000000";

      // 🟩 Dibuja el rectángulo
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);

      // 🔢 Dibuja el número en el centro
      ctx.fillStyle = "#000000";
      ctx.font = `${cellSize / 2}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(valor, j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
    }
  }
}

// Crea matriz vacía
function crearMatriz(valor = 0) {
  const matriz = [];
  for (let i = 0; i < filas; i++) {
    matriz.push(new Array(columnas).fill(valor));
  }
  return matriz;
}

//1
function ejercicio1() {
  const matriz = crearMatriz(1);
  dibujarMatriz(matriz);
}

//2
function ejercicio2() {
  const matriz = crearMatriz(1);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (i === 0 || i === filas - 1 || j === 0 || j === columnas - 1) matriz[i][j] = 0;
    }
  }
  dibujarMatriz(matriz);
}

// 3
function ejercicio3() {
  const matriz = crearMatriz(0);
  const mid = Math.floor(filas / 2);
  for (let i = 0; i < filas; i++) {
    matriz[mid][i] = 1;
    matriz[i][mid] = 1;
  }
  dibujarMatriz(matriz);
}

// 4
function ejercicio4() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (i === 0 || j === 0 || i === filas - 1 || j === columnas - 1) matriz[i][j] = 1;
      if (i === j || i + j === filas - 1) matriz[i][j] = 2;
    }
  }
  dibujarMatriz(matriz);
}

// 5
function ejercicio5() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    if (i < 3) matriz[i].fill(1);
    else if (i < 6) matriz[i].fill(2);
    else matriz[i].fill(0);
  }
  dibujarMatriz(matriz);
}

// 6
function ejercicio6() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    matriz[i].fill(i % 2 === 0 ? 1 : 0);
  }
  dibujarMatriz(matriz);
}

// 7. 
function ejercicio7() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    matriz[i][i] = 1;
  }
  dibujarMatriz(matriz);
}

// 8. 
function ejercicio8() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    matriz[0][i] = 1;
    matriz[filas - 1][i] = 1;
    matriz[i][0] = 1;
    matriz[i][columnas - 1] = 1;
  }
  for (let i = 1; i < filas - 1; i++) {
    matriz[2][i] = 1;
    matriz[4][i] = 1;
    matriz[6][i] = 1;
  }
  dibujarMatriz(matriz);
}

// 9. 
function ejercicio9() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j <= i; j++) {
      matriz[i][j] = 1;
    }
  }
  dibujarMatriz(matriz);
}

// 10. 
function ejercicio10() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    for (let j = columnas - 1; j >= columnas - 1 - i; j--) {
      matriz[i][j] = 1;
    }
  }
  dibujarMatriz(matriz);
}

// 11. 
function ejercicio11() {
  const matriz = crearMatriz(0);
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (i % 2 === 0 || j % 2 === 0) matriz[i][j] = 1;
    }
  }
  dibujarMatriz(matriz);
}

 
function limpiarMatriz() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
