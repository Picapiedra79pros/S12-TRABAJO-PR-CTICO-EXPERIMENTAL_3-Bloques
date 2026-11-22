
// ==========================================
// SISTEMA DE BÚSQUEDA DE CALIFICACIONES
// ==========================================

// Único vector unidimensional
let calificaciones = [];

// Cantidad obligatoria de estudiantes
const LIMITE = 15;

// Contador de calificaciones ingresadas
let contador = 0;

// Estado del sistema
let iniciado = false;


// ==========================================
// CONEXIÓN DE BOTONES
// ==========================================

// BOTÓN 1: Iniciar
document.getElementById("btnIniciar")
    .addEventListener("click", iniciar);

// BOTÓN 2: Agregar calificación
document.getElementById("btnAgregar")
    .addEventListener("click", agregar);

// BOTÓN 3: Presentar calificaciones
document.getElementById("btnPresentar")
    .addEventListener("click", presentar);

// BOTÓN 4: Buscar y analizar
document.getElementById("btnBuscar")
    .addEventListener("click", buscarYAnalizar);

// BOTÓN 5: Reiniciar
document.getElementById("btnReiniciar")
    .addEventListener("click", reiniciar);


// ==========================================
// BOTÓN 1: INICIAR
// ==========================================
// Habilita el ingreso de las 15 notas.

function iniciar() {

    iniciado = true;

    document.getElementById("btnIniciar").disabled = true;
    document.getElementById("btnAgregar").disabled = false;

    document.getElementById("cantidad").value = contador;

    mostrarMensaje("Ingrese las 15 calificaciones.");
}


// ==========================================
// BOTÓN 2: AGREGAR CALIFICACIÓN
// ==========================================
// Valida que la nota esté entre 0 y 10.
// Guarda la nota en el vector.
// No permite ingresar más de 15 notas.

function agregar() {

    if (!iniciado) {
        alert("Primero debe iniciar el sistema.");
        return;
    }

    // Verificar si ya existen 15 notas
    if (contador >= LIMITE) {
        alert("Ya se registraron las 15 calificaciones.");
        return;
    }

    let campo = document.getElementById("nota").value;

    // Validar campo vacío
    if (campo.trim() === "") {
        alert("Ingrese una calificación.");
        return;
    }

    let nota = Number(campo);

    // Validar rango permitido
    if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
        alert("La calificación debe estar entre 0 y 10.");
        return;
    }

    // Guardar en el único vector mediante índice
    calificaciones[contador] = nota;

    // Aumentar contador
    contador++;

    document.getElementById("cantidad").value = contador;
    document.getElementById("nota").value = "";

    // Actualizar listado
    presentar();

    // Limpiar análisis anterior
    limpiarResultados();

    // Comprobar si ya se ingresaron las 15 notas
    if (contador === LIMITE) {

        document.getElementById("btnAgregar").disabled = true;
        document.getElementById("btnBuscar").disabled = false;

        mostrarMensaje(
            "Las 15 calificaciones están registradas. " +
            "Ahora puede realizar la búsqueda."
        );

    } else {

        mostrarMensaje(
            "Calificación registrada: " +
            contador + " de " + LIMITE
        );
    }
}


// ==========================================
// BOTÓN 3: PRESENTAR
// ==========================================
// Recorre el vector utilizando un ciclo for.
// Muestra las calificaciones con su posición.

function presentar() {

    let texto = "";

    for (let i = 0; i < contador; i++) {

        texto +=
            "Posición " + i +
            ": " + calificaciones[i] + "\n";
    }

    if (contador === 0) {
        texto = "No hay calificaciones registradas.";
    }

    document.getElementById("listaNotas").value = texto;
}


// ==========================================
// BOTÓN 4: BUSCAR Y ANALIZAR
// ==========================================
// Busca manualmente la nota de referencia.
// Muestra todas las posiciones coincidentes.
// Cuenta notas superiores, inferiores e iguales.
// Identifica la nota máxima y su primera posición.
// No utiliza métodos de búsqueda de arreglos.

function buscarYAnalizar() {

    // Exigir exactamente 15 calificaciones
    if (contador !== LIMITE) {

        alert("Debe registrar las 15 calificaciones.");
        return;
    }

    let campo = document.getElementById("buscar").value;

    // Validar campo vacío
    if (campo.trim() === "") {
        alert("Ingrese la calificación que desea buscar.");
        return;
    }

    let referencia = Number(campo);

    // Validar calificación de referencia
    if (!Number.isFinite(referencia) ||
        referencia < 0 || referencia > 10) {

        alert("La calificación debe estar entre 0 y 10.");
        return;
    }

    // Contadores para el análisis
    let superiores = 0;
    let inferiores = 0;
    let iguales = 0;

    // Variable para guardar posiciones encontradas
    let posicionesEncontradas = "";

    // Inicializar máximo con el primer elemento
    let mayor = calificaciones[0];

    // Primera posición donde aparece el máximo
    let posicionMayor = 0;

    // Recorrer el vector completo
    for (let i = 0; i < LIMITE; i++) {

        // Comparar con la nota de referencia
        if (calificaciones[i] > referencia) {

            superiores++;

        } else if (calificaciones[i] < referencia) {

            inferiores++;

        } else {

            // La calificación es igual
            iguales++;

            // Guardar la posición encontrada
            posicionesEncontradas +=
                "Posición " + i + "\n";
        }

        // Buscar la nota más alta
        if (calificaciones[i] > mayor) {

            mayor = calificaciones[i];

            // Guardar primera posición del máximo
            posicionMayor = i;
        }
    }

    // Mostrar resultado de búsqueda
    if (iguales > 0) {

        document.getElementById("resultado").value =
            "Calificación encontrada: " + referencia;

        document.getElementById("posiciones").value =
            posicionesEncontradas;

        mostrarMensaje(
            "Se encontraron " + iguales + " coincidencias."
        );

    } else {

        document.getElementById("resultado").value =
            "No se encontraron coincidencias.";

        document.getElementById("posiciones").value =
            "La calificación no existe en el vector.";

        mostrarMensaje(
            "No se encontraron coincidencias."
        );
    }

    // Mostrar cantidad de notas superiores
    document.getElementById("superiores").value =
        superiores;

    // Mostrar cantidad de notas inferiores
    document.getElementById("inferiores").value =
        inferiores;

    // Mostrar cantidad de notas iguales
    document.getElementById("iguales").value =
        iguales;

    // Mostrar nota más alta
    document.getElementById("mayor").value =
        mayor;

    // Mostrar primera posición de la nota máxima
    document.getElementById("posicionMayor").value =
        posicionMayor;
}


// ==========================================
// FUNCIÓN: LIMPIAR RESULTADOS
// ==========================================
// Borra los resultados de una búsqueda anterior.

function limpiarResultados() {

    document.getElementById("resultado").value = "";
    document.getElementById("posiciones").value = "";
    document.getElementById("superiores").value = "";
    document.getElementById("inferiores").value = "";
    document.getElementById("iguales").value = "";
    document.getElementById("mayor").value = "";
    document.getElementById("posicionMayor").value = "";
}


// ==========================================
// BOTÓN 5: REINICIAR
// ==========================================
// Vacía el vector y reinicia los contadores.
// Limpia el formulario para empezar de nuevo.

function reiniciar() {

    // Reiniciar el único vector
    calificaciones = [];

    // Reiniciar contador
    contador = 0;

    iniciado = false;

    // Limpiar entradas
    document.getElementById("nota").value = "";
    document.getElementById("buscar").value = "";
    document.getElementById("listaNotas").value = "";
    document.getElementById("cantidad").value = "";

    // Limpiar resultados
    limpiarResultados();

    // Restablecer botones
    document.getElementById("btnIniciar").disabled = false;
    document.getElementById("btnAgregar").disabled = true;
    document.getElementById("btnBuscar").disabled = true;

    mostrarMensaje("Sistema reiniciado correctamente.");
}


// ==========================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ==========================================

function mostrarMensaje(texto) {

    document.getElementById("mensaje").textContent = texto;
}
