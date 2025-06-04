let entries = JSON.parse(localStorage.getItem("entries")) || [];
const zielKalorien = 1800;

const table = document.getElementById("entryTable");
const totalEl = document.getElementById("totalCalories");
const progressBar = document.getElementById("progressBar");
const progressMessage = document.getElementById("progressMessage");

let chart;

// 🧾 Einträge anzeigen
function renderTable() {
  table.innerHTML = "";
  let total = 0;

  entries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.meal}</td>
      <td>${entry.food}</td>
      <td>${entry.calories}</td>
      <td>${entry.note}</td>
      <td><button onclick="deleteEntry(${index})">✖</button></td>
    `;
    table.appendChild(row);
    total += parseInt(entry.calories);
  });

  totalEl.textContent = total;
  updateProgress(total);
  aktualisiereKreis(total);
}


// ➕ Eintrag hinzufügen
document.getElementById("entryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const meal = document.getElementById("meal").value;
  const food = document.getElementById("food").value;
  const calories = document.getElementById("calories").value;
  const note = document.getElementById("note").value;

  if (date && meal && food && calories) {
    const newEntry = { date, meal, food, calories: parseInt(calories), note };
    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));
    this.reset();
    renderTable();
  }
});

// 🗑️ Eintrag löschen
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  renderTable();
}

// 📈 Fortschrittsbalken & Motivation
function updateProgress(kcal) {
  const percent = Math.min((kcal / zielKalorien) * 100, 100);
  progressBar.style.width = percent + "%";

  if (kcal === 0) {
    progressBar.style.backgroundColor = "#444";
    progressMessage.textContent = "Starte deinen Tag mit einem guten Frühstück 🌅";
  } else if (kcal < zielKalorien * 0.6) {
    progressBar.style.backgroundColor = "#f1c40f";
    progressMessage.textContent = "Du bist auf dem Weg! Noch ein kleiner Snack? 🍌";
  } else if (kcal <= zielKalorien) {
    progressBar.style.backgroundColor = "#2ecc71";
    progressMessage.textContent = "Super toll Elly! 💪 Du kommst deinem Ziel näher!";
  } else {
    progressBar.style.backgroundColor = "#e74c3c";
    progressMessage.textContent = "Uff, etwas über dem Ziel – aber morgen rockst du’s wieder! ❤️";
  }
}

// ▶️ Beim Start
renderTable();
function aktualisiereKreis(gesamtKcal) {
  const zielKalorien = 1500;
  const canvas = document.getElementById('kalorienKreis');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const text = document.getElementById('kalorienText');
  const prozent = Math.min(gesamtKcal / zielKalorien, 1);

  // Kreis löschen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Hintergrundkreis
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 90, 0, 2 * Math.PI);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Fortschrittskreis
  const endAngle = 2 * Math.PI * prozent;
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 90, -0.5 * Math.PI, endAngle - 0.5 * Math.PI);
  ctx.strokeStyle = prozent >= 1 ? '#00ff88' : '#ff2c9c';
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.stroke();

  text.textContent = `${gesamtKcal} / ${zielKalorien} kcal`;
  if (gesamtKcal >= zielKalorien) {
    text.textContent += ' ✨ Ziel erreicht, Elly!';
  }
}function ladeProfil() {
  const weight = localStorage.getItem("weight");
  const height = localStorage.getItem("height");
  const age = localStorage.getItem("age");

  if (weight) {
    document.getElementById("weight").value = weight;
    document.getElementById("savedWeight").textContent = weight;
  }
  if (height) {
    document.getElementById("height").value = height;
    document.getElementById("savedHeight").textContent = height;
  }
  if (age) {
    document.getElementById("age").value = age;
    document.getElementById("savedAge").textContent = age;
  }
}

document.getElementById("saveProfileBtn").addEventListener("click", () => {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const age = document.getElementById("age").value;

  if (weight && height && age) {
    localStorage.setItem("weight", weight);
    localStorage.setItem("height", height);
    localStorage.setItem("age", age);

    document.getElementById("savedWeight").textContent = weight;
    document.getElementById("savedHeight").textContent = height;
    document.getElementById("savedAge").textContent = age;

    alert("Profil wurde gespeichert! ✅");
  } else {
    alert("Bitte alle Felder ausfüllen.");
  }
});
// ...dein bisheriger Code...

function berechneBMI(gewicht, groesse) {
  const groesseInMeter = groesse / 100;
  const bmi = gewicht / (groesseInMeter * groesseInMeter);
  return bmi.toFixed(1);
}

function bewerteBMI(bmi) {
  if (bmi < 18.5) return "Untergewicht ❗";
  if (bmi < 25) return "Normalgewicht ✅";
  if (bmi < 30) return "Übergewicht ⚠️";
  return "Adipositas ❗❗";
}

function zeigeBMI() {
  const gewicht = parseFloat(localStorage.getItem("weight"));
  const groesse = parseFloat(localStorage.getItem("height"));

  if (!gewicht || !groesse) return;

  const bmi = berechneBMI(gewicht, groesse);
  const status = bewerteBMI(bmi);

  document.getElementById("bmiWert").textContent = bmi;
  document.getElementById("bmiStatus").textContent = status;
}

// Nach dem Laden und nach dem Speichern aufrufen:
window.addEventListener("DOMContentLoaded", zeigeBMI);
document.getElementById("saveProfileBtn").addEventListener("click", zeigeBMI);
// Direkt beim Start laden
// 🌤 Stimmung speichern
function speichereStimmung(emoji) {
  const heute = new Date().toISOString().split("T")[0];
  localStorage.setItem("stimmung_" + heute, emoji);
  document.getElementById("heutigeStimmung").textContent = emoji;
}

// 🌤 Stimmung beim Laden setzen
(function ladeStimmung() {
  const heute = new Date().toISOString().split("T")[0];
  const mood = localStorage.getItem("stimmung_" + heute);
  if (mood) {
    document.getElementById("heutigeStimmung").textContent = mood;
  }
})();
// ... andere Funktionen ...

const sprueche = [
  "Du rockst das heute! 🔥",
  "Jeder Bissen bringt dich deinem Ziel näher. 🥗",
  "Bleib dran, Elly – du bist großartig! 💪",
  "Selbst kleine Schritte führen ans Ziel. 🚶‍♀️",
  "Du gibst deinem Körper Liebe durch gutes Essen. ❤️",
  "Ein neuer Tag, eine neue Chance. 🌞",
  "Glaub an dich, Elly! 🌈",
  "Disziplin ist der Weg zur Freiheit. 🎯",
  "Du bist stärker als jede Versuchung. 🍫🚫",
  "Stolz beginnt mit dem ersten Schritt. 👣"
];

function zeigeMotivationsspruch() {
  const zufall = Math.floor(Math.random() * sprueche.length);
  const textFeld = document.getElementById("spruchDesTages");
  if (textFeld) {
    textFeld.textContent = sprueche[zufall];
  }
}

// Beim Laden der Seite aufrufen:
zeigeMotivationsspruch();
ladeProfil();
zeigeBMI(); 

const kcalDaten = {
  kartoffel: 70,      // pro Stück (mittel)
  ei: 80,             // pro Stück
  kaese: 180,         // pro 50g
  tomate: 20,         // pro Stück
  joghurt: 60,        // pro 100g
  banane: 90,         // pro Stück
  huhn: 110,          // pro 100g
  reis: 130,          // pro 100g, gekocht
  apfel: 55           // pro Stück
};

let kcalEintraege = [];
const kcalForm = document.getElementById("kcalForm");
const kcalListe = document.getElementById("kcalListe");
const kcalGesamt = document.getElementById("kcalGesamt");

kcalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const menge = parseInt(document.getElementById("menge").value);
  const lebensmittel = document.getElementById("lebensmittel").value;
  const kcal = menge * kcalDaten[lebensmittel];
  kcalEintraege.push({ menge, lebensmittel, kcal });
  renderKcal();
});

function renderKcal() {
  let gesamt = 0;
  kcalListe.innerHTML = "";
  kcalEintraege.forEach((entry, idx) => {
    gesamt += entry.kcal;
    kcalListe.innerHTML += `
      <li>
        ${entry.menge} × ${iconLebensmittel(entry.lebensmittel)} = ${entry.kcal} kcal
        <button class="delete-btn" title="Eintrag löschen" onclick="deleteKcalEintrag(${idx})">&times;</button>
      </li>
    `;
  });
  kcalGesamt.textContent = gesamt;
}

window.deleteKcalEintrag = function(index) {
  kcalEintraege.splice(index, 1);
  renderKcal();
};

function iconLebensmittel(lm) {
  switch (lm) {
    case "kartoffel": return "🥔 Kartoffel";
    case "ei": return "🥚 Ei";
    case "kaese": return "🧀 Käse";
    case "tomate": return "🍅 Tomate";
    case "joghurt": return "🥛 Joghurt";
    case "banane": return "🍌 Banane";
    case "huhn": return "🍗 Hähnchen";
    case "reis": return "🍚 Reis";
    case "apfel": return "🍏 Apfel";
    default: return lm;
  }
}
// beim Laden der Seite die Kalorien anzeigen
document.addEventListener("DOMContentLoaded", renderKcal);