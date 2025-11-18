// main.js
import { questions } from "./js/questions.js";

const STORAGE_KEY = "barsvar-current-index";
let currentIndex = 0;

function createElement(tag, options = {}) {
  const { className, text } = options;
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

/* (forsíða) */

function renderHero() {
  const root = document.querySelector("[data-hero-root]");
  if (!root) return; // ekki á forsíðu

  root.innerHTML = "";

  const inner = createElement("div", { className: "hero-inner" });

  // efri röðin
  const brand = createElement("header", { className: "hero-brand" });
  const logo = createElement("h2", {
    className: "hero-logo",
    text: "BARSVAR",
  });
  const tagline = createElement("p", {
    className: "hero-tagline",
    text: "DRYKKIR · SPURNINGAR · OG FLEIRI DRYKKIR",
  });
  brand.append(logo, tagline);

  // layout
  const layout = createElement("div", { className: "hero-layout" });

  // texti
  const textCol = createElement("div", { className: "hero-text" });

  const kicker = createElement("p", {
    className: "hero-kicker",
    text: "EINUM DRYKK NÆR SIGRI.",
  });

  const heading = createElement("h1", {
    className: "hero-heading",
    text: "Drykkir. Spurningar.",
  });

  const desc = createElement("p", {
    className: "hero-description",
    text:
      "Barsvar.is er vefur sem hendir á þig spurningum um bjór, vín og kokteila. " +
      "Fullkomið fyrir kvöld heima, fyrirpartý eða þegar barinn gleymdi að redda pub quiz. " +
      "Þú tekur quizið, við sjáum um spurningarnar.",
  });

  const actions = createElement("div", { className: "hero-actions" });
  const startLink = createElement("a", {
    className: "btn primary",
    text: "Start quiz",
  });
  startLink.href = "./sidur/questions.html";

  const note = createElement("p", {
    className: "hero-note",
    text: "10+ spurningar – fleiri coming soon",
  });

  actions.append(startLink, note);
  textCol.append(kicker, heading, desc, actions);

  // mynd
  const fig = createElement("figure", { className: "hero-image" });
  const img = document.createElement("img");
  img.src = "./images/barsvar4.png";
  img.alt = "Vinir að drekka og spila Barsvar-quiz á bar";
  fig.appendChild(img);

  layout.append(textCol, fig);
  inner.append(brand, layout);
  root.appendChild(inner);
}

/* spurningasíða) */

function saveCurrentIndex() {
  try {
    localStorage.setItem(STORAGE_KEY, String(currentIndex));
  } catch (e) {
    console.error("Gat ekki vistað stöðu í localStorage", e);
  }
}

function loadCurrentIndex() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return;

    const parsed = Number(raw);
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed < questions.length) {
      currentIndex = parsed;
    }
  } catch (e) {
    console.error("Gat ekki lesið stöðu úr localStorage", e);
  }
}

function renderQuestionView() {
  const root = document.querySelector("[data-quiz-root]");
  if (!root) return;
  root.innerHTML = "";

  const total = questions.length;
  const current = currentIndex + 1;
  const currentQuestion = questions[currentIndex];

  const title = createElement("h2", {
    className: "quiz-title",
    text: "SPURNINGAFERÐ",
  });

  const meta = createElement("p", {
    className: "quiz-meta",
    text: `Spurning ${current} af ${total}`,
  });

  // Progress bar
  const progress = createElement("div", { className: "quiz-progress" });
  const progressBar = createElement("div", { className: "quiz-progress-bar" });
  progressBar.style.width = `${(current / total) * 100}%`;
  progress.appendChild(progressBar);

  const questionP = createElement("p", {
    className: "quiz-question",
    text: currentQuestion.question,
  });

  // --- Svar texti (by default falinn) ---
  const answerP = createElement("p", {
    className: "quiz-answer quiz-answer--hidden",
    text: `Svar: ${currentQuestion.answer}`,
  });

  const controls = createElement("div", { className: "quiz-controls" });

  const prevBtn = createElement("button", {
    className: "secondary",
    text: "Fyrri spurning",
  });

  const nextBtn = createElement("button", {
    className: "primary",
    text: "Næsta spurning",
  });

  const answerToggleBtn = createElement("button", {
    className: "secondary",
    text: "Sýna svar",
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === total - 1;

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      saveCurrentIndex();
      renderQuestionView();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < total - 1) {
      currentIndex += 1;
      saveCurrentIndex();
      renderQuestionView();
    }
  });

  // toggle á svarinu
  answerToggleBtn.addEventListener("click", () => {
    const isHidden = answerP.classList.contains("quiz-answer--hidden");
    if (isHidden) {
      answerP.classList.remove("quiz-answer--hidden");
      answerToggleBtn.textContent = "Fela svar";
    } else {
      answerP.classList.add("quiz-answer--hidden");
      answerToggleBtn.textContent = "Sýna svar";
    }
  });

  const hint = createElement("p", {
    className: "quiz-hint",
    text: "Phone a friend!",
  });

  controls.append(prevBtn, nextBtn, answerToggleBtn);
  root.append(title, meta, progress, questionP, answerP, controls, hint);
}

function init() {
  // Forsíða
  renderHero();

  // Spurningasíða
  loadCurrentIndex();
  renderQuestionView();
}

document.addEventListener("DOMContentLoaded", init);
