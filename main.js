// main.js
import { questions } from './js/questions.js';

let currentIndex = 0;

function createElement(tag, options = {}) {
  const { className, text } = options;
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function renderQuestionView() {
  const root = document.querySelector('[data-quiz-root]');
  if (!root) {
    // ef við erum á index.html og ekki á questions.html, þá gerist ekkert
    return;
  }

  root.innerHTML = '';

  const total = questions.length;
  const current = currentIndex + 1;
  const currentQuestion = questions[currentIndex];

  const title = createElement('h2', {
    className: 'quiz-title',
    text: 'Spurningaferð',
  });

  const meta = createElement('p', {
    className: 'quiz-meta',
    text: `Spurning ${current} af ${total}`,
  });

  // Progress bar
  const progress = createElement('div', { className: 'quiz-progress' });
  const progressBar = createElement('div', { className: 'quiz-progress-bar' });
  progressBar.style.width = `${(current / total) * 100}%`;
  progress.appendChild(progressBar);

  const questionP = createElement('p', {
    className: 'quiz-question',
    text: currentQuestion.question,
  });

  const controls = createElement('div', { className: 'quiz-controls' });

  const prevBtn = createElement('button', {
    className: 'secondary',
    text: 'Fyrri spurning',
  });
  const nextBtn = createElement('button', {
    className: 'primary',
    text: 'Næsta spurning',
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === total - 1;

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderQuestionView();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < total - 1) {
      currentIndex += 1;
      renderQuestionView();
    }
  });

  const hint = createElement('p', {
    className: 'quiz-hint',
    text: 'Pro tip: hérna kemur mögulega tips!',
  });

  controls.append(prevBtn, nextBtn);
  root.append(title, meta, progress, questionP, controls, hint);
}

function init() {
  renderQuestionView();
}

document.addEventListener('DOMContentLoaded', init);
