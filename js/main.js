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

// Control de reproducción / pausa del Audio 3D
let isPlayingAudio = false;

function toggleAudio3D() {
  const iframe = document.getElementById('audio3d-player');
  const btn = document.getElementById('btn-play-audio3d');

  if (!isPlayingAudio) {
    // Mandar comando de play vía YouTube JS API
    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    btn.innerHTML = '⏸ Pausar Audio 3D';
    btn.style.background = '#a00000';
    isPlayingAudio = true;
  } else {
    // Mandar comando de pause vía YouTube JS API
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    btn.innerHTML = '▶ Reproducir Audio 3D';
    btn.style.background = 'var(--accent)';
    isPlayingAudio = false;
  }
}
