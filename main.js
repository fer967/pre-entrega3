const preguntas = [
    {
        pregunta: "¿Cual es la capital de Francia?",
        answers: [
            { text: "Londres", correct: false },
            { text: "Paris", correct: true },
            { text: "Roma", correct: false },
            { text: "Berlin", correct: false },
        ]
    },
    {
        pregunta: "¿Cual es la capital de Colombia?",
        answers: [
            { text: "Bogota", correct: true },
            { text: "Lima", correct: false },
            { text: "Quito", correct: false },
            { text: "La Paz", correct: false },
        ]
    },
    {
        pregunta: "¿Que rio es de America?",
        answers: [
            { text: "Nilo", correct: false },
            { text: "Volga", correct: false },
            { text: "Rin", correct: false },
            { text: "Amazonas", correct: true },
        ]
    },
    {
        pregunta: "¿Que cordillera es de Europa?",
        answers: [
            { text: "Himalaya", correct: false },
            { text: "Alpes", correct: true },
            { text: "Andes", correct: false },
            { text: "Caucaso", correct: false },
        ]
    }
];

const preguntaElement = document.getElementById("pregunta");
const botonRespuesta = document.getElementById("boton-respuesta");
const siguienteBoton = document.getElementById("next-btn");

let indicePreguntaActual = 0;
let puntuacion = 0;

function comenzar() {                                    
    indicePreguntaActual = 0;
    puntuacion = 0;
    siguienteBoton.innerHTML = "siguiente pregunta";
    mostrarPregunta();
}

function mostrarPregunta() {
    resetear();
    let preguntaActual = preguntas[indicePreguntaActual];
    let preguntaNumero = indicePreguntaActual + 1;
    preguntaElement.innerHTML = preguntaNumero + ". " + preguntaActual.pregunta;
    preguntaActual.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        botonRespuesta.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetear() {
    siguienteBoton.style.display = "none";
    while (botonRespuesta.firstChild) {
        botonRespuesta.removeChild(botonRespuesta.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        puntuacion++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(botonRespuesta.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    siguienteBoton.style.display = "block";
}

function mostrarPuntos() {
    resetear();
    preguntaElement.innerHTML = `Tu puntuacion ${puntuacion} de ${preguntas.length}!`;
    siguienteBoton.innerHTML = "jugar de nuevo";
    siguienteBoton.style.display = "block";
}

function usarProximoBoton() {
    indicePreguntaActual++;
    if (indicePreguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarPuntos();
    }
}

siguienteBoton.addEventListener("click", () => {
    if (indicePreguntaActual < preguntas.length) {
        usarProximoBoton();
    } else {
        comenzar();
    }
});

comenzar();
