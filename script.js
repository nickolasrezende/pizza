
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");
if (menuBtn && nav) menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

function num(id){ return Number(document.getElementById(id)?.value || 0); }

function calculateDough(){
  const flour=num("flour"), hyd=num("hydration"), saltPct=num("salt"), yeastPct=num("yeast"), ball=num("ball");
  const water=flour*hyd/100, salt=flour*saltPct/100, yeast=flour*yeastPct/100, total=flour+water+salt+yeast;
  document.getElementById("calcResult").innerHTML = `
    <div><span>Água</span><strong>${water.toFixed(0)}g</strong></div>
    <div><span>Sal</span><strong>${salt.toFixed(1)}g</strong></div>
    <div><span>Fermento</span><strong>${yeast.toFixed(2)}g</strong></div>
    <div><span>Peso total</span><strong>${total.toFixed(0)}g</strong></div>
    <div><span>Bolas</span><strong>${Math.floor(total/ball)}</strong></div>
    <div><span>Hidratação</span><strong>${hyd}%</strong></div>`;
}

let timerInterval=null, timerRemaining=1800, timerInitial=1800;
function renderTimer(){
  const el=document.getElementById("timerDisplay"); if(!el) return;
  const h=Math.floor(timerRemaining/3600), m=Math.floor((timerRemaining%3600)/60), s=timerRemaining%60;
  el.textContent=`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
function syncTimer(){ timerRemaining=num("timerMinutes")*60; timerInitial=timerRemaining; renderTimer(); }
const tm=document.getElementById("timerMinutes"); if(tm) tm.addEventListener("input",syncTimer);
function startTimer(){ if(timerInterval) return; timerInterval=setInterval(()=>{ timerRemaining--; renderTimer(); if(timerRemaining<=0){clearInterval(timerInterval);timerInterval=null;alert("Timer finalizado! Vai olhar essa massa, cidadão.");}},1000);}
function pauseTimer(){ clearInterval(timerInterval); timerInterval=null; }
function resetTimer(){ clearInterval(timerInterval); timerInterval=null; timerRemaining=timerInitial; renderTimer(); }
renderTimer();
