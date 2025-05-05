let tokens = [];
let lignes = [];
let texteComplet = "";
let global_var_tokens = [];

function toggleHelp() {
    const help = document.getElementById("help");
    help.style.display = help.style.display === "none" ? "block" : "none";
}
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        texteComplet = e.target.result;

        lignes = texteComplet.split(/\r?\n/).filter(l => l.trim() !== "");
        tokens = texteComplet.match(/\b\w+\b/g) || [];

        global_var_tokens = tokens;

        document.getElementById("fileInfo").textContent =
            Fichier chargé : ${file.name} | ${tokens.length} tokens | ${lignes.length} lignes non vides.;

        document.getElementById("fileDisplayArea").textContent = texteComplet;
        document.getElementById("resultats").innerHTML = "";
        document.getElementById("chartContainer").innerHTML = "";
    };
    reader.readAsText(file);
});

// Afficher / Masquer aboutme -----------------------------------------------------------------------
function showHide_aboutme() {
	let div = document.getXXX("aboutme");
	let b = document.getElementById("button_aboutme").innerHTML;
  		if (div.style.display === "none") {
   			div.style.diXXX;
	  		let change = b.replace("more","less");
	  		document.getElementById("button_aboutme").innerHTML = change;
	  		}
		else {
			div.style.display = "none";
			var change = XXX");
	    	document.getElXXX = change;
	    	}

function dictionnaire() {
    if (tokens.length === 0) return alert("Veuillez charger un fichier.");

    const freqs = {};
    tokens.forEach(t => {
        const mot = t.toLowerCase();
        freqs[mot] = (freqs[mot] || 0) + 1;
    });

    const sorted = Object.entries(freqs).sort((a, b) => b[1] - a[1]);
    let html = "<h2>Dictionnaire</h2><table><tr><th>Mot</th><th>Fréquence</th></tr>";
    sorted.forEach(([mot, freq]) => {
        html += <tr><td>${mot}</td><td>${freq}</td></tr>;
    });
    html += "</table>";

    document.getElementById("resultats").innerHTML = html;
}

function grep() {
    const motif = document.getElementById("motif").value;
    if (lignes.length === 0 || !motif) return alert("Charger un fichier et entrer un motif.");

    const regex = new RegExp(motif, "gi");
    let html = "<h2>Résultats Grep</h2><ul>";
    lignes.forEach(ligne => {
        if (regex.test(ligne)) {
            const surligné = ligne.replace(regex, m => <span class="surligne">${m}</span>);
            html += <li>${surligné}</li>;
        }
    });
    html += "</ul>";
    document.getElementById("resultats").innerHTML = html;
}

function concordancier() {
    const motif = document.getElementById("motif").value;
    if (lignes.length === 0 || !motif) return alert("Charger un fichier et entrer un motif.");

    const regex = new RegExp((.{0,30})\\b(${motif})\\b(.{0,30}), "gi");
    let html = "<h2>Concordancier</h2><table><tr><th>Gauche</th><th>Pôle</th><th>Droite</th></tr>";
    lignes.forEach(ligne => {
        let match;
        while ((match = regex.exec(ligne)) !== null) {
            html += <tr><td>${match[1].trim()}</td><td class="surligne">${match[2]}</td><td>${match[3].trim()}</td></tr>;
        }
    });
    html += "</table>";
    document.getElementById("resultats").innerHTML = html;
}

function surlignerVoyelles() {
    if (!texteComplet) return alert("Veuillez charger un fichier.");

    const modifie = texteComplet.replace(/[aeiouyàâäéèêëîïôöùûü]/gi, "/");
    const count = (texteComplet.match(/[aeiouyàâäéèêëîïôöùûü]/gi) || []).length;
    const result = <h2>Texte avec voyelles remplacées</h2>
    <p>${count} voyelles remplacées</p><pre>${modifie}</pre>;
    document.getElementById("resultats").innerHTML = result;
}

function toggleHelp() {
    const help = document.getElementById("help");
    help.style.display = help.style.display === "none" ? "block" : "none";
}

function alertBonjour() {
    alert("Voici un site qui permet d'analyser des textes.");
}

function nbPhrases() {
    if (!texteComplet) return alert("Veuillez charger un fichier.");
    const nb = texteComplet.split(/[.!?]+/).filter(p => p.trim().length > 0).length;
    document.getElementById("page-analysis").innerHTML =
        <div>Il y a ${nb} phrases dans ce texte.</div>;
}

function showHide_aide() {
    const aide = document.getElementById("aide");
    const bouton = document.getElementById("button_aide");

    if (aide.style.display === "none" || aide.style.display === "") {
        aide.style.display = "block";
        bouton.innerText = "Masquer l'aide";
    } else {
        aide.style.display = "none";
        bouton.innerText = "Afficher l'aide";
    }
}

function tokenLong() {
    if (global_var_tokens.length === 0) return alert("Charger un fichier.");
    let sorted = [...new Set(global_var_tokens)].sort((a, b) => b.length - a.length).slice(0, 10);
    let rows = sorted.map(t => <tr><td>${t}</td><td>${t.length}</td></tr>).join("");
    document.getElementById("page-analysis").innerHTML =
        <table><tr><th>Mot</th><th>Longueur</th></tr>${rows}</table>;
}

function pieChart() {
  const display = document.getElementById('fileDisplayArea');
  const logger = document.getElementById('logger3');

  if (display.innerText.trim() === "") {
    logger.innerHTML = "Veuillez d'abord charger un texte.";
    return;
  }

  // Récupérer la liste de stopwords (séparés par virgules)
  const stopwordInput = document.getElementById('stopwordInput').value;
  const stopwords = stopwordInput
    ? stopwordInput.toLowerCase().split(",").map(w => w.trim())
    : [];

  // Tokeniser le texte global
  const global_var_tokens = display.innerText
    .toLowerCase()
    .match(/\b[\wàâçéèêëîïôûùüÿñæœ'-]+\b/g);

  if (!global_var_tokens) {
    logger.innerHTML = "Le texte ne contient aucun mot valide.";
    return;
  }

  // Filtrer les stopwords
  const filteredTokens = global_var_tokens.filter(token => !stopwords.includes(token));

  // Compter les fréquences
  const count = {};
  filteredTokens.forEach(token => {
    count[token] = (count[token] || 0) + 1;
  });

  // Trier et sélectionner les 30 premiers
  const sortedTokens = Object.keys(count)
    .sort((a, b) => count[b] - count[a])
    .slice(0, 30);

  const chartData = sortedTokens.map(token => ({
    label: token,
    y: count[token]
  }));

  // Création du graphique
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    backgroundColor: "transparent",
    title: {
      text: "Mots les plus fréquents"
    },
    data: [{
      type: "pie",
      showInLegend: true,
      legendText: "{label}",
      indexLabelFontSize: 14,
      indexLabel: "{label} - {y}",
      dataPoints: chartData
    }]
  });

  chart.render();
}
