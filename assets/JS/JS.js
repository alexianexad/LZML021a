// Variables globales
let tokens = [];
let lignes = [];
let texteComplet = "";

// Fonction de segmentation automatique au chargement du fichier
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        texteComplet = e.target.result;

        // Segmentation en lignes (enlevant les lignes vides)
        lignes = texteComplet.split(/\r?\n/).filter(l => l.trim() !== "");

        // Segmentation en tokens (mots)
        tokens = texteComplet.match(/\b\w+\b/g) || [];

        // Afficher les informations
        const info = `Fichier chargé : ${file.name} | ${tokens.length} tokens | ${lignes.length} lignes non vides.`;
        document.getElementById("fileInfo").textContent = info;

        // Réinitialiser les résultats
        document.getElementById("resultats").innerHTML = "";
    };
    reader.readAsText(file);
});

// Fonction dictionnaire : tri des mots par fréquence
function dictionnaire() {
    if (tokens.length === 0) {
        alert("Veuillez charger un fichier avant d’utiliser cette fonction.");
        return;
    }

    const freqs = {};
    tokens.forEach(token => {
        const t = token.toLowerCase();
        freqs[t] = (freqs[t] || 0) + 1;
    });

    const sorted = Object.entries(freqs).sort((a, b) => b[1] - a[1]);

    let html = "<h2>Dictionnaire (par fréquence)</h2><table><tr><th>Mot</th><th>Fréquence</th></tr>";
    sorted.forEach(([mot, freq]) => {
        html += `<tr><td>${mot}</td><td>${freq}</td></tr>`;
    });
    html += "</table>";

    document.getElementById("resultats").innerHTML = html;
}

// Fonction grep : chercher une regex dans les lignes et surligner
function grep() {
    const motif = document.getElementById("motif").value;
    if (lignes.length === 0 || !motif) {
        alert("Veuillez charger un fichier et saisir un motif.");
        return;
    }

    const regex = new RegExp(motif, "gi");
    let resultat = "<h2>Résultats Grep</h2><ul>";

    lignes.forEach(ligne => {
        if (regex.test(ligne)) {
            const surligné = ligne.replace(regex, match => `<span class="surligne">${match}</span>`);
            resultat += `<li>${surligné}</li>`;
        }
    });

    resultat += "</ul>";
    document.getElementById("resultats").innerHTML = resultat;
}

// Fonction concordancier : tableau avec contexte gauche, pôle, droit
function concordancier() {
    const motif = document.getElementById("motif").value;
    if (lignes.length === 0 || !motif) {
        alert("Veuillez charger un fichier et saisir un motif.");
        return;
    }

    const regex = new RegExp(`(.{0,30})\\b(${motif})\\b(.{0,30})`, "gi");
    let html = "<h2>Concordancier</h2><table><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>";

    lignes.forEach(ligne => {
        let match;
        while ((match = regex.exec(ligne)) !== null) {
            const gauche = match[1].trim();
            const mot = match[2];
            const droite = match[3].trim();
            html += `<tr><td>${gauche}</td><td class="surligne">${mot}</td><td>${droite}</td></tr>`;
        }
    });

    html += "</table>";
    document.getElementById("resultats").innerHTML = html;
}

function surlignerVoyelles() {
    if (!texteComplet) {
        alert("Veuillez charger un fichier avant d’utiliser cette fonction.");
        return;
    }

    // Échapper les caractères HTML pour garder la mise en page
    const texteSecurise = texteComplet
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Remplacement des voyelles par "/"
    const texteModifie = texteSecurise.replace(/[aeiouyàâäéèêëîïôöùûü]/gi, "/");

    document.getElementById("resultats").innerHTML = "<h2>Texte avec voyelles remplacées par /</h2><pre>" + texteModifie + "</pre>";
}

function toggleHelp() {
    const help = document.getElementById("help");
    help.style.display = help.style.display === "none" ? "block" : "none";
}

function alertBonjour() {
    alert("Voici un site qui permet d'analyser des textes.");
}

function nbPhrases() {
    let text = document.getElementById('fileDisplayArea').textContent;
    if (!text) {
        alert("Il faut d'abord charger un fichier .txt !");
        return;
    }
    let nb = text.split(/[.!?]+/).filter(p => p.trim().length > 0).length;
    document.getElementById('page-analysis').innerHTML = '<div>Il y a ' + nb + ' phrases dans ce texte.</div>';
}

function tokenLong() {
    if (global_var_tokens.length === 0) {
        alert("Aucun fichier chargé ou texte vide.");
        return;
    }
    let tokenSort = [...new Set(global_var_tokens)].sort((a, b) => b.length - a.length).slice(0, 10);
    let map = tokenSort.map(token => '<tr><td>' + token + '</td><td>' + token.length + '</td></tr>').join('');
    let resultat = '<table><tr><th colspan=2><b>Mots les plus longs</b></th></tr><tr><th>Mot</th><th>Longueur</th></tr>' + map + '</table>';
    document.getElementById('page-analysis').innerHTML = resultat;
}

function pieChart() {
    if (global_var_tokens.length === 0) {
        alert("Il faut charger un fichier texte !");
        return;
    }
    const stopwords = ["le", "la", "les", "de", "des", "et", "en", "un", "une"];
    const filtered = global_var_tokens.filter(t => !stopwords.includes(t.toLowerCase()));
    const count = {};
    filtered.forEach(t => count[t] = (count[t] || 0) + 1);

    const chartData = Object.entries(count)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([label, y]) => ({ label, y }));

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
