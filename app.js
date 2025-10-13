
const canvas = document.getElementById('matrixCanvas');
const fillButton = document.getElementById('fillBtn');
const clearButton = document.getElementById('clearBtn');

// Contexto de dibujo
const context = canvas.getContext('2d');

// --- Matrix instance ---
// Antes tu código declaraba `const matrix = new Matrix(5,5,0);`
// Aquí usamos `let` para poder reinicializarla a 10x10 cuando ejecutemos ejercicios.
let matrix = new Matrix(10, 10, 0);

// --- Helpers para interoperar con la clase Matrix (robustos) ---
/**
 * Establece el valor en la matriz intentando varios nombres de métodos/propiedades.
 */
function setCell(r, c, val) {
  try {
    // si existe un método setValue o set
    if (typeof matrix.setValue === 'function') {
      matrix.setValue(r, c, val);
      return;
    }
    if (typeof matrix.set === 'function') {
      matrix.set(r, c, val);
      return;
    }
    // si existe propiedad data (array bidimensional)
    if (matrix.data && Array.isArray(matrix.data) && matrix.data[r]) {
      matrix.data[r][c] = val;
      return;
    }
    // fallback: intentar asignar en internal (por si tiene _data)
    if (matrix._data && Array.isArray(matrix._data) && matrix._data[r]) {
      matrix._data[r][c] = val;
      return;
    }
    // última opción: crear método temporal
    console.warn('No se encontró método conocido para setCell; intentando matrix[r][c]');
    matrix[r] = matrix[r] || [];
    matrix[r][c] = val;
  } catch (e) {
    console.error('setCell error', e);
  }
}

/**
 * Obtiene el valor de la celda manejando varios nombres.
 */
function getCell(r, c) {
  try {
    if (typeof matrix.getValue === 'function') return matrix.getValue(r, c);
    if (typeof matrix.get === 'function') return matrix.get(r, c);
    if (matrix.data && Array.isArray(matrix.data) && matrix.data[r]) return matrix.data[r][c];
    if (matrix._data && Array.isArray(matrix._data) && matrix._data[r]) return matrix._data[r][c];
    if (matrix[r] && Array.isArray(matrix[r])) return matrix[r][c];
  } catch (e) {
    console.error('getCell error', e);
  }
  return 0;
}

/**
 * Asegura que matrix sea de filas x cols. Intenta reconstruir con constructor
 * new Matrix(rows, cols, initialValue) si es posible; si no, rellena/ajusta data.
 */
function ensureMatrixSize(rows = 10, cols = 10, initialValue = 0) {
  try {
    // si la instancia actual tiene las dimensiones esperadas, no hacemos nada
    if (matrix.rows === rows && matrix.cols === cols) {
      // opcion: rellenar con initialValue
      if (typeof matrix.fill === 'function') {
        matrix.fill(initialValue);
      } else if (typeof matrix.fillRandom === 'function') {
        // no hacemos fillRandom; simplemente sobreescribimos
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) setCell(r, c, initialValue);
        }
      } else {
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) setCell(r, c, initialValue);
      }
      return;
    }

    // intentar crear nueva instancia (si constructor disponible)
    const tryNew = new Matrix(rows, cols, initialValue);
    matrix = tryNew;
  } catch (e) {
    // si no se puede re-instanciar, intentar ajustar propiedades internas
    console.warn('No se pudo crear nueva Matrix con constructor; ajustando internamente.', e);
    matrix.rows = rows;
    matrix.cols = cols;
    // crear/ajustar data
    matrix.data = [];
    for (let r = 0; r < rows; r++) {
      matrix.data[r] = [];
      for (let c = 0; c < cols; c++) matrix.data[r][c] = initialValue;
    }
  }
}

// --- DIBUJADO en canvas (usa getCell) ---
function drawMatrix() {
  const rows = matrix.rows || 10;
  const cols = matrix.cols || 10;

  const width = canvas.width = canvas.clientWidth;
  const height = canvas.height = canvas.clientHeight;

  const cellWidth = width / cols;
  const cellHeight = height / rows;

  context.clearRect(0, 0, width, height);
  context.font = `${Math.floor(Math.min(cellWidth, cellHeight) / 2)}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellWidth;
      const y = r * cellHeight;
      const value = getCell(r, c) || 0;

      // fondo opcional según valor (si quieres más visual)
      if (value === 1) {
        context.fillStyle = '#000000';
        context.fillText('1', x + cellWidth / 2, y + cellHeight / 2);
      } else if (value === 2) {
        context.fillStyle = '#666666';
        context.fillText('2', x + cellWidth / 2, y + cellHeight / 2);
      } else {
        context.fillStyle = '#000000';
        // dibujamos 0 si lo deseas, o dejar vacío:
        context.fillText('0', x + cellWidth / 2, y + cellHeight / 2);
      }

      context.strokeStyle = '#cccccc';
      context.strokeRect(x, y, cellWidth, cellHeight);
    }
  }
}

// --- LIMPIAR matriz a 0 ---
function clearMatrix() {
  ensureMatrixSize(10, 10, 0);
  drawMatrix();
}

// --- FUNCIONES PARA EJERCICIOS 1..11 ---
// Todas asumen matriz 10x10 y usan valores 0,1,2 según el enunciado.

function exercise1() {
  // Ejercicio 1: Cuadrado Relleno (todo 1)
  ensureMatrixSize(10, 10, 0);
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 10; c++)
      setCell(r, c, 1);
  drawMatrix();
}

function exercise2() {
  // Ejercicio 2: Marco Interno (bordes 0, interior 1) -> bordes 0, interior 1
  ensureMatrixSize(10, 10, 0);
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (r === 0 || r === 9 || c === 0 || c === 9) setCell(r, c, 0);
      else setCell(r, c, 1);
    }
  }
  drawMatrix();
}

function exercise3() {
  // Ejercicio 3: Cruces (fila y columna centrales con 1, resto 0)
  // Para tamaño 10, la fila central la tomamos en r=5 (índice 4 o 5?). En el ejemplo la fila 5 (índice 4) estaba llena.
  // El enunciado y el ejemplo: la fila central (fila índice 4) se usó en un matriz 10 -> fila 5 (índice 4)
  // Para replicar ejemplo: usar row = 4 (la quinta fila) y col = 4 (la quinta columna).
  ensureMatrixSize(10, 10, 0);
  const mid = 4; // índice 4 corresponde a la quinta fila/columna (según ejemplo)
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (r === mid || c === mid) setCell(r, c, 1);
      else setCell(r, c, 0);
    }
  }
  drawMatrix();
}

function exercise4() {
  // Ejercicio 4: Bordes y Diagonales
  ensureMatrixSize(10, 10, 0);
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      // bordes = 1
      if (r === 0 || r === 9 || c === 0 || c === 9) {
        setCell(r, c, 1);
        continue;
      }
      // diagonales con 2: principal y secundaria
      if (r === c || r + c === 9) {
        setCell(r, c, 2);
        continue;
      }
      setCell(r, c, 0);
    }
  }
  drawMatrix();
}

function exercise5() {
  // Ejercicio 5: Bandera (3 franjas horizontales iguales: 1,2,0)
  ensureMatrixSize(10, 10, 0);
  const block = Math.floor(10 / 3); // 3 filas cada
  for (let r = 0; r < 10; r++) {
    const value = r < block ? 1 : (r < block * 2 ? 2 : 0);
    for (let c = 0; c < 10; c++) setCell(r, c, value);
  }
  drawMatrix();
}

function exercise6() {
  // Ejercicio 6: Relleno Alterno (alternar filas entre 1 y 0; fila 0 = 1)
  ensureMatrixSize(10, 10, 0);
  for (let r = 0; r < 10; r++) {
    const value = (r % 2 === 0) ? 1 : 0;
    for (let c = 0; c < 10; c++) setCell(r, c, value);
  }
  drawMatrix();
}

function exercise7() {
  // Ejercicio 7: Zig-Zag Horizontal (línea tipo "escalera"): 1 en (0,0),(1,1),...,(9,9)
  ensureMatrixSize(10, 10, 0);
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) setCell(r, c, 0);
  }
  for (let i = 0; i < 10; i++) setCell(i, i, 1);
  drawMatrix();
}

function exercise8() {
  // Ejercicio 8: Relleno en Espiral con 1 (empezando en esquina superior izquierda)
  ensureMatrixSize(10, 10, 0);

  // inicializar todo a 0
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) setCell(r, c, 0);

  let top = 0, bottom = 9, left = 0, right = 9;
  while (left <= right && top <= bottom) {
    // top row left->right
    for (let c = left; c <= right; c++) setCell(top, c, 1);
    top++;
    // right col top->bottom
    for (let r = top; r <= bottom; r++) setCell(r, right, 1);
    right--;
    if (top <= bottom) {
      // bottom row right->left
      for (let c = right; c >= left; c--) setCell(bottom, c, 1);
      bottom--;
    }
    if (left <= right) {
      // left col bottom->top
      for (let r = bottom; r >= top; r--) setCell(r, left, 1);
      left++;
    }
  }

  drawMatrix();
}

function exercise9() {
  // Ejercicio 9: Triángulo Superior Izquierdo (mitad superior izquierda con 1)
  ensureMatrixSize(10, 10, 0);
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      // condición: c <= r' ??? Observa ejemplo:
      // Fila 0: 1 0 0 0...
      // Fila 1: 1 1 0 ...
      // => en la fila r hay 1 en columnas 0..r
      if (c <= r) setCell(r, c, 1);
      else setCell(r, c, 0);
    }
  }
  drawMatrix();
}

function exercise10() {
  // Ejercicio 10: Triángulo Inferior Derecho (rellenar mitad inferior derecha con 1)
  ensureMatrixSize(10, 10, 0);
  // Según ejemplo: fila 0: ...0000000001 (solo última columna), fila 1: ...0000000011 => en fila r hay 1 en columnas >= 9 - r
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if (c >= 9 - r) setCell(r, c, 1);
      else setCell(r, c, 0);
    }
  }
  drawMatrix();
}

function exercise11() {
  // Ejercicio 11: Cuadrícula (alternar filas y columnas con 1)
  // Según el ejemplo:
  // Filas pares (0,2,4,...) => llenas de 1
  // Filas impares => 1 sólo en columna 0 y columna 9 (primera y última)
  ensureMatrixSize(10, 10, 0);
  for (let r = 0; r < 10; r++) {
    if (r % 2 === 0) {
      // fila llena
      for (let c = 0; c < 10; c++) setCell(r, c, 1);
    } else {
      // solo bordes en 1
      for (let c = 0; c < 10; c++) setCell(r, c, (c === 0 || c === 9) ? 1 : 0);
    }
  }
  drawMatrix();
}

// --- Ejecutar ejercicio por número (1..11) ---
function runExercise(n) {
  switch (n) {
    case 1: exercise1(); break;
    case 2: exercise2(); break;
    case 3: exercise3(); break;
    case 4: exercise4(); break;
    case 5: exercise5(); break;
    case 6: exercise6(); break;
    case 7: exercise7(); break;
    case 8: exercise8(); break;
    case 9: exercise9(); break;
    case 10: exercise10(); break;
    case 11: exercise11(); break;
    default:
      console.warn('Ejercicio no implementado o fuera de rango (1..11).');
  }
}

// --- Inicialización básica y eventos ---
function initializeCanvas() {
  drawMatrix();
  window.addEventListener('resize', drawMatrix);
  if (fillButton) fillButton.addEventListener('click', () => { matrix.fillRandom ? matrix.fillRandom(0,9) : clearMatrix(); drawMatrix(); });
  if (clearButton) clearButton.addEventListener('click', clearMatrix);
}

// Si quieres ejecutar un ejercicio automáticamente al cargar, llama runExercise(n)
// Ejemplo: runExercise(1);
initializeCanvas();

// Exportar runExercise para poder invocarlo desde consola o botones en HTML
window.runExercise = runExercise;
window.clearMatrix = clearMatrix;
window.drawMatrix = drawMatrix;
