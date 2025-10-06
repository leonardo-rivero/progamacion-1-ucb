// 1. Definición de la clase Pasajero
class Pasajero {
    constructor(nombre, edad, genero, tipoBoleto) {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero; // "Femenino" o "Masculino"
        this.tipoBoleto = tipoBoleto; // "1ra Clase", "2da Clase", "3ra Clase"
    }

    // Método para mostrar la información del pasajero en formato legible
    mostrarInfo() {
        return `${this.nombre}, ${this.edad} años, ${this.genero}, ${this.tipoBoleto}`;
    }
}

// 2. Definición de la clase BoteRescate
class BoteRescate {
    constructor(capacidadMaxima, nombreBote) {
        this.capacidadMaxima = capacidadMaxima;
        this.ocupantes = []; // Lista de pasajeros en el bote
        this.nombreBote = nombreBote; // Ej: "Bote 1"
    }

    // Método para agregar un pasajero si hay espacio
    agregarPasajero(pasajero) {
        if (this.ocupantes.length < this.capacidadMaxima) {
            this.ocupantes.push(pasajero);
            console.log(`✓ ${pasajero.mostrarInfo()} agregado a ${this.nombreBote}`);
            return true; // Éxito
        } else {
            console.log(`✗ No hay espacio en ${this.nombreBote} para ${pasajero.mostrarInfo()}`);
            return false; // Sin espacio
        }
    }

    // Método para mostrar la lista de ocupantes
    mostrarOcupantes() {
        console.log(`\n--- ${this.nombreBote} (Capacidad: ${this.capacidadMaxima}, Ocupados: ${this.ocupantes.length}) ---`);
        if (this.ocupantes.length === 0) {
            console.log("Bote vacío.");
        } else {
            this.ocupantes.forEach(pasajero => {
                console.log(pasajero.mostrarInfo());
            });
        }
    }
}

// 3. Función para el algoritmo de evacuación
function evacuacion(pasajeros, botes) {
    console.log("\n=== INICIANDO EVACUACIÓN ===");

    // Ordenar pasajeros por prioridad:
    // 1. Género: Femenino (0) antes que Masculino (1)
    // 2. Edad: Ascendente (niños primero)
    // 3. Tipo de boleto: 1ra (1) > 2da (2) > 3ra (3), menor número primero
    pasajeros.sort((a, b) => {
        // Género: Femenino = 0, Masculino = 1
        let generoA = a.genero === "Femenino" ? 0 : 1;
        let generoB = b.genero === "Femenino" ? 0 : 1;
        if (generoA !== generoB) {
            return generoA - generoB; // Femenino primero
        }

        // Edad: Ascendente (menor edad primero)
        if (a.edad !== b.edad) {
            return a.edad - b.edad;
        }

        // Tipo de boleto: Asignar números (1ra=1, 2da=2, 3ra=3)
        let claseA = a.tipoBoleto === "1ra Clase" ? 1 : (a.tipoBoleto === "2da Clase" ? 2 : 3);
        let claseB = b.tipoBoleto === "1ra Clase" ? 1 : (b.tipoBoleto === "2da Clase" ? 2 : 3);
        return claseA - claseB; // Menor clase primero (1ra Clase)
    });

    console.log("\nOrden de evacuación (prioridad):");
    pasajeros.forEach((p, index) => {
        console.log(`${index + 1}. ${p.mostrarInfo()}`);
    });

    // Asignar pasajeros a botes hasta que se llenen
    let pasajerosFuera = [];
    let indicePasajero = 0;

    botes.forEach(bote => {
        while (indicePasajero < pasajeros.length && bote.ocupantes.length < bote.capacidadMaxima) {
            let pasajero = pasajeros[indicePasajero];
            if (!bote.agregarPasajero(pasajero)) {
                break; // Bote lleno
            }
            indicePasajero++;
        }
    });

    // Los pasajeros restantes quedan fuera
    for (let i = indicePasajero; i < pasajeros.length; i++) {
        pasajerosFuera.push(pasajeros[i]);
    }

    // Mostrar resultados
    console.log("\n=== RESULTADOS DE LA EVACUACIÓN ===");
    botes.forEach(bote => {
        bote.mostrarOcupantes();
    });

    if (pasajerosFuera.length > 0) {
        console.log("\n--- PASAJEROS QUE QUEDARON FUERA ---");
        pasajerosFuera.forEach(p => {
            console.log(p.mostrarInfo());
        });
    } else {
        console.log("\n¡Todos los pasajeros fueron evacuados!");
    }

    return { evacuados: indicePasajero, fuera: pasajerosFuera.length };
}

// 4. Ejecución de la simulación (se ejecuta automáticamente al cargar el JS)
console.log("=== CREANDO PASAJEROS ===");
let listaPasajeros = [
    new Pasajero("María González", 25, "Femenino", "1ra Clase"),
    new Pasajero("Juan Pérez", 30, "Masculino", "2da Clase"),
    new Pasajero("Ana López", 12, "Femenino", "3ra Clase"), // Niña
    new Pasajero("Carlos Ruiz", 45, "Masculino", "1ra Clase"),
    new Pasajero("Sofía Martínez", 8, "Femenino", "2da Clase"), // Niña
    new Pasajero("Luis García", 20, "Masculino", "3ra Clase"),
    new Pasajero("Elena Rodríguez", 35, "Femenino", "1ra Clase"),
    new Pasajero("Miguel Torres", 60, "Masculino", "2da Clase"),
    new Pasajero("Lucía Herrera", 15, "Femenino", "3ra Clase"), // Adolescente
    new Pasajero("Pedro Sánchez", 5, "Masculino", "3ra Clase") // Niño (pero hombre, baja prioridad)
];

// Mostrar pasajeros iniciales
console.log("Pasajeros creados:");
listaPasajeros.forEach(p => console.log(p.mostrarInfo()));

console.log("\n=== CREANDO BOTES ===");
let listaBotes = [
    new BoteRescate(3, "Bote 1"),
    new BoteRescate(3, "Bote 2"),
    new BoteRescate(3, "Bote 3") // Capacidad total: 9, para que 1 quede fuera
];

// Ejecutar la simulación
//let resultado = evacuacion(listaPasajeros, listaBotes);
//console.log(`\nResumen: ${resultado.evacuados} evacuados, ${resultado.fuera} fuera.`);

window.ejecutarSimulacion = function() {
    let resultado = evacuacion(listaPasajeros, listaBotes);
    console.log(`\nResumen: ${resultado.evacuados} evacuados, ${resultado.fuera} fuera.`);
};