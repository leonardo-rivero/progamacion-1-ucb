 function mostrarNombre() {
  const nombre = document.getElementById("nombres").value;
  const resultado = document.getElementById("resultado");
  if (nombre.trim() === "") {
    resultado.textContent = "Por favor, escribe tu nombre.";
  } else {
    resultado.textContent = "Hola, " + nombre + " que haces aqui?";
  }
}
var lista = [];
function InsertarLista() {
  //const nombre = document.getElementById("nombres").value;
  var valorAleatorio = Math.floor(Math.random() * 10);
  const resultado = document.getElementById("resultado");
  lista.push(valorAleatorio);
  // Crear nuevo botón
  const nuevoBoton = document.createElement("button");
  nuevoBoton.classList.add("star-number");
  nuevoBoton.textContent = valorAleatorio;
  // Agregar al contenedor
  resultado.appendChild(nuevoBoton);
  // Forzar animación CSS con un pequeño retraso       
    setTimeout(() => {
    nuevoBoton.classList.add("visible");
  }, 10);
}
function EliminarLista() {
  const resultado = document.getElementById("resultado");
  const valorEliminar = prompt("Escribe el valor que quieres eliminar:");
  if (valorEliminar === null || valorEliminar.trim() === "") {
    alert("No se ingresó ningún valor.");
    return;
  }
  const valorNum = Number(valorEliminar);
  if (isNaN(valorNum)) {
    alert("Por favor, ingresa un número válido.");
    return;
  }
  // Filtrar la lista para eliminar todas las ocurrencias del valor
  const originalLength = lista.length;
  lista = lista.filter(item => item !== valorNum);
    if (lista.length === originalLength) {
    alert("No se encontró el valor en la lista.");
    return;
  }
  // Limpiar el contenedor de botones
  resultado.innerHTML = "";
  // Volver a crear los botones con los valores restantes
  lista.forEach(valor => {
    const nuevoBoton = document.createElement("button");
    nuevoBoton.classList.add("boton-lista", "visible");
    nuevoBoton.textContent = valor;
    resultado.appendChild(nuevoBoton);
  });
}