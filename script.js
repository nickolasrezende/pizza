
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");
if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-mode");
    document.body.classList.toggle("light-mode");
  });
}

function getNumber(id){ return Number(document.getElementById(id)?.value || 0); }

function calculateDough(){
  const flour = getNumber("flour");
  const hyd = getNumber("hydration");
  const saltPct = getNumber("salt");
  const yeastPct = getNumber("yeast");
  const ball = getNumber("ball");

  const water = flour * hyd / 100;
  const salt = flour * saltPct / 100;
  const yeast = flour * yeastPct / 100;
  const total = flour + water + salt + yeast;
  const balls = Math.floor(total / ball);

  document.getElementById("calcResult").innerHTML = `
    <div><span>Água</span><strong>${water.toFixed(0)}g</strong></div>
    <div><span>Sal</span><strong>${salt.toFixed(1)}g</strong></div>
    <div><span>Fermento</span><strong>${yeast.toFixed(2)}g</strong></div>
    <div><span>Peso total</span><strong>${total.toFixed(0)}g</strong></div>
    <div><span>Bolas</span><strong>${balls}</strong></div>
    <div><span>Hidratação</span><strong>${hyd}%</strong></div>
  `;
}

let timerInterval = null;
let timerRemaining = 30 * 60;
let timerInitial = 30 * 60;

function renderTimer(){
  const el = document.getElementById("timerDisplay");
  if (!el) return;
  const h = Math.floor(timerRemaining / 3600);
  const m = Math.floor((timerRemaining % 3600) / 60);
  const s = timerRemaining % 60;
  el.textContent = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function syncTimer(){
  const min = getNumber("timerMinutes");
  timerRemaining = min * 60;
  timerInitial = timerRemaining;
  renderTimer();
}

const timerMinutes = document.getElementById("timerMinutes");
if (timerMinutes) timerMinutes.addEventListener("input", syncTimer);

function startTimer(){
  if (timerInterval) return;
  if (timerRemaining <= 0) syncTimer();
  timerInterval = setInterval(() => {
    timerRemaining--;
    renderTimer();
    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Timer finalizado! Vai olhar essa massa, cidadão.");
    }
  }, 1000);
}

function pauseTimer(){
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer(){
  clearInterval(timerInterval);
  timerInterval = null;
  timerRemaining = timerInitial;
  renderTimer();
}

renderTimer();
