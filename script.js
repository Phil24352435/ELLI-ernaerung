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
  renderChart();
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

 // Letzte 7 Tage
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toISOString().split("T")[0];
    dailyTotals[key] = 0;
  }

  // Kalorien summieren
  entries.forEach((entry) => {
    if (dailyTotals.hasOwnProperty(entry.date)) {
      dailyTotals[entry.date] += parseInt(entry.calories);
    }
  });

  const labels = Object.keys(dailyTotals);
  const data = Object.values(dailyTotals);

  if (chart) chart.destroy();



// ▶️ Beim Start
renderTable();
