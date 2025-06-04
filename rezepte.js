// Warte bis die Seite komplett geladen ist
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("showRecipesBtn");
  const box = document.getElementById("rezeptContainer");

  if (button && box) {
    button.addEventListener("click", function () {
      // Sichtbarkeit umschalten
      if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "flex";
        button.textContent = "Rezepte ausblenden";
      } else {
        box.style.display = "none";
        button.textContent = "Schnelle Rezepte anzeigen";
      }
    });
  } else {
    console.warn("Button oder Container nicht gefunden!");
  }
});
const rezepte = [
  {
    name: "🥪 Toast Hawaii",
    zutaten: "Toast, Schinken, Ananas, Käse",
    zubereitung: "Toast mit Schinken, Ananas und Käse belegen, überbacken."
  },
  {
    name: "🍝 Spaghetti Aglio e Olio",
    zutaten: "Spaghetti, Knoblauch, Olivenöl, Chili",
    zubereitung: "Spaghetti kochen, Knoblauch und Chili in Öl anbraten, mischen."
  },
  {
    name: "🥗 Tomaten-Mozzarella-Salat",
    zutaten: "Tomaten, Mozzarella, Basilikum, Öl",
    zubereitung: "Alles in Scheiben schneiden, würzen und anrichten."
  },
  // ...du kannst noch mehr hinzufügen
];

const dropdownBtn = document.getElementById("dropdownBtn");
const rezeptListe = document.getElementById("rezeptListe");
const rezeptAnzeigen = document.getElementById("rezeptAnzeigen");

// Button klick zeigt/versteckt Liste
dropdownBtn.addEventListener("click", () => {
  rezeptListe.classList.toggle("hidden");
  rezeptAnzeigen.innerHTML = ""; // Zurücksetzen beim Neuöffnen
});

// Liste füllen
rezepte.forEach((rezept, index) => {
  const li = document.createElement("li");
  li.textContent = rezept.name;
  li.addEventListener("click", () => zeigeRezept(index));
  rezeptListe.appendChild(li);
});

function zeigeRezept(index) {
  const r = rezepte[index];
  rezeptAnzeigen.innerHTML = `
    <h3>${r.name}</h3>
    <strong>Zutaten:</strong> <p>${r.zutaten}</p>
    <strong>Zubereitung:</strong> <p>${r.zubereitung}</p>
  `;
  rezeptListe.classList.add("hidden");
}

