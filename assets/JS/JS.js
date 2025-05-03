// assets/JS/script.js

// Variables globales pour stocker le texte brut, tokens et lignes
let rawText = "";
let tokens = [];
let lignes = [];

// Chargement du fichier et segmentation automatique
const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return alert("Aucun fichier sélectionné.");
    if (!file.type.match(/^text\//)) return alert("Type non supporté. Choisissez un fichier texte.");

    const reader = new FileReader();
    reader.onload = function(ev) {
        rawText = ev.target.result;
        // Segmentation en lignes
        lignes = rawText.split(/\r?\n/).filter(l => l.trim() !== "");
        // Segmentation en tokens
        const delim = document.getElementById("delimID").value;
        const regexDelim = new RegExp("[" + delim.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + "]+", "g");
        tokens = rawText.split(regexDelim).filter(t => t.trim() !== "");

        // Affichage du texte brut
        document.getElementById("fileDisplayArea").textContent = rawText;
        alert(`Fichier chargé : ${tokens.length} tokens, ${lignes.length} lignes non vides.`);
    };
    reader.readAsText(file);
});

// Fonction dictionnaire: compte et trie les tokens
function dictionnaire() {
    if (tokens.length === 0) return alert("Erreur : chargez d'abord un fichier.");

    const freq = {};
    tokens.forEach(token => {
        const t = token.toLowerCase();
        freq[t] = (freq[t] || 0) + 1;
    });
    const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]);

    // Construction du tableau HTML
    let html = '<h3>Dictionnaire</h3><table><tr><th>Mot</th><th>Fréquence</th></tr>';
    sorted.forEach(([mot, count]) => {
        html += `<tr><td>${mot}</td><td>${count}</td></tr>`;
    });
    html += '</table>';
    document.getElementById("page-analysis").innerHTML = html;
}

// Fonction grep: affiche les lignes contenant le pôle, surligné en rouge
function grep() {
    if (lignes.length === 0) return alert("Erreur : chargez d'abord un fichier.");
    const pole = document.getElementById("poleID").value;
    if (!pole) return alert("Erreur : entrez un pôle.");

    const regex = new RegExp(pole, 'gi');
    let result = '<h3>Résultats GREP</h3><ul>';
    lignes.forEach(ligne => {
        if (regex.test(ligne)) {
            const highlighted = ligne.replace(regex, match => `<span class='highlight'>${match}</span>`);
            result += `<li>${highlighted}</li>`;
        }
    });
    result += '</ul>';
    document.getElementById("page-analysis").innerHTML = result;
}

// Fonction concordancier: affiche contexte gauche/pôle/droit
function concordancier() {
    if (lignes.length === 0) return alert("Erreur : chargez d'abord un fichier.");
    const pole = document.getElementById("poleID").value;
    if (!pole) return alert("Erreur : entrez un pôle.");

    const regex = new RegExp(`(.{0,30})(${pole})(.{0,30})`, 'gi');
    let html = '<h3>Concordancier</h3><table><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>';
    lignes.forEach(ligne => {
        let match;
        while ((match = regex.exec(ligne)) !== null) {
            html += `<tr><td>${match[1]}</td><td><strong>${match[2]}</strong></td><td>${match[3]}</td></tr>`;
        }
    });
    html += '</table>';
    document.getElementById("page-analysis").innerHTML = html;
}

// Gestion des erreurs et association aux boutons
// Dans HTML :
// <button onclick="dictionnaire()">Dictionnaire</button>
// <button onclick="grep()">Grep</button>
// <button onclick="concordancier()">Concordancier</button>
