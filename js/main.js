document.addEventListener('DOMContentLoaded', () => {

  // 1. Menú responsivo Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. Interacción de la nube de palabras (Democracia)
  const tagButtons = document.querySelectorAll('.tag-btn');
  const feedbackEl = document.getElementById('wordSelectionFeedback');
  const selectedWords = new Set();

  tagButtons.forEach(button => {
    button.addEventListener('click', () => {
      const word = button.getAttribute('data-word');
      
      if (selectedWords.has(word)) {
        selectedWords.delete(word);
        button.classList.remove('active');
      } else {
        selectedWords.add(word);
        button.classList.add('active');
      }

      if (selectedWords.size > 0) {
        feedbackEl.textContent = `Tus palabras seleccionadas: ${Array.from(selectedWords).join(', ')}. La democracia la construimos entre todos.`;
      } else {
        feedbackEl.textContent = '';
      }
    });
  });

  // 3. Lógica de la Trivia / Quiz de Historia
  const quizCards = document.querySelectorAll('.quiz-card');
  const quizResult = document.getElementById('quizResult');
  let score = 0;
  let answeredCount = 0;

  quizCards.forEach(card => {
    const buttons = card.querySelectorAll('.quiz-btn');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Evitar responder dos veces la misma pregunta
        if (card.classList.contains('answered')) return;

        card.classList.add('answered');
        const isCorrect = button.getAttribute('data-correct') === 'true';

        if (isCorrect) {
          button.classList.add('correct');
          score++;
        } else {
          button.classList.add('wrong');
          // Mostrar cuál era la opción correcta
          buttons.forEach(btn => {
            if (btn.getAttribute('data-correct') === 'true') {
              btn.classList.add('correct');
            }
          });
        }

        answeredCount++;

        if (answeredCount === quizCards.length) {
          quizResult.textContent = `Completaste la trivia: Respondiste correctamente ${score} de ${quizCards.length} preguntas.`;
        }
      });
    });
  });

}); // <--- Cierra el addEventListener de DOMContentLoaded

// Activa el reproductor y le da play automáticamente al hacer clic en el botón de advertencia
function activateAudio3D() {
  const container = document.getElementById('audio-container');
  const btn = document.getElementById('btn-play-audio3d');

  // Mostramos el contenedor del reproductor
  container.style.display = 'block';
  
  // Inyectamos el iframe con autoplay=1 para que el navegador ejecute el sonido tras la interacción del usuario
  container.innerHTML = `
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/GjI-_ZlFlsg?autoplay=1" title="Audio 3D" style="border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  // Cambiamos el estado del botón
  btn.innerHTML = '✔ Reproduciendo Audio 3D';
  btn.style.background = '#2e7d32'; // Verde sutil indicando activo
  btn.disabled = true; // Evita clics repetidos
}
