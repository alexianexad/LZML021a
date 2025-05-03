// Variables globales
let tokens = [];
let lignes = [];

fonction demanderNom() {
let nom = prompt("Quel est vetre nom?");
if (nom) {
alert("Bonjour,"+ nom+"!");
} else {
alert("Vous n'avez pas entré de nom.);
}
}

function prenom () {
let name = document.getElementById("Comment vous appelez vous?").value;
document.getElementById("holder1").innerHTML = name;
}
function afficherAide() {
alert("Bienvenue sur mon site !");
const aide = `Bienvenue sur le site !

Fonctionnalités disponibles :
1. Charger un texte : segmentation automatique en tokens et en lignes.
2. Dictionnaire : affiche les mots triés par fréquence.
3. Grep : cherche une expression dans les lignes (colorée en rouge).
4. Concordancier : montre les mots en contexte gauche/pôle/droit.
5. Mots de 5 lettres : affiche tous les mots de 5 lettres trouvés.

Assurez-vous de charger un fichier texte avant d'utiliser les boutons.`;
    alert(aide);
}



window.onload = function () {
    const fileInput = document.getElementById('fileInput');
    const fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        const textType = new RegExp("text.*");

        if (file.type.match(textType)) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const texte = e.target.result;
                fileDisplayArea.innerText = texte;

                // Segmentation automatique
                tokens = texte.split(/\s+/).filter(t => t.trim() !== "");
                lignes = texte.split(/\n/).filter(l => l.trim() !== "");

                document.getElementById("logger").innerHTML =
                    `<span class="infolog">Fichier chargé avec succès : ${tokens.length} tokens, ${lignes.length} lignes non vides.</span>`;
            };

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML =
                '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });

    // Associer les fonctions aux bons boutons
    document.getElementById("btnDictionnaire").onclick = dictionnaire;
    document.getElementById("btnGrep").onclick = grep;
    document.getElementById("btnConcordancier").onclick = concordancier;
    document.getElementById("btnPersonnalise").onclick = mots5lettres;
}

// Dictionnaire des fréquences
function dictionnaire() {
    if (tokens.length === 0) {
        alert("Erreur : aucun texte chargé.");
        return;
    }

    const freq = {};
    tokens.forEach(token => {
        const t = token.toLowerCase();
        freq[t] = (freq[t] || 0) + 1;
    });

    const tableau = Object.entries(freq).sort((a, b) => b[1] - a[1]);

    const output = document.getElementById("resultats");
    output.innerHTML = `<h3>Dictionnaire</h3><table><tr><th>Mot</th><th>Fréquence</th></tr>` +
        tableau.map(([mot, freq]) => `<tr><td>${mot}</td><td>${freq}</td></tr>`).join('') +
        `</table>`;
}

// Fonction GREP
function grep() {
    if (lignes.length === 0) {
        alert("Erreur : aucun texte chargé.");
        return;
    }

    const motif = document.getElementById("poleID").value;
    if (!motif) {
        alert("Erreur : veuillez entrer une expression régulière.");
        return;
    }

    const regex = new RegExp(motif, "gi");
    const output = document.getElementById("resultats");
    const resultats = lignes.map(ligne => {
        if (regex.test(ligne)) {
            return `<p>${ligne.replace(regex, match => `<span style='color:red;'>${match}</span>`)}</p>`;
        }
        return null;
    }).filter(Boolean);

    output.innerHTML = `<h3>Résultats GREP</h3>` + resultats.join('');
}

// Concordancier
function concordancier() {
    if (tokens.length === 0) {
        alert("Erreur : aucun texte chargé.");
        return;
    }

    const pôle = document.getElementById("poleID").value;
    if (!pôle) {
        alert("Erreur : veuillez entrer un mot-clé.");
        return;
    }

    const regex = new RegExp(`(.{0,30})(${pôle})(.{0,30})`, "gi");
    const texte = document.getElementById("fileDisplayArea").innerText;
    const output = document.getElementById("resultats");

    const lignes = [...texte.matchAll(regex)].map(m =>
        `<tr><td>${m[1]}</td><td><strong>${m[2]}</strong></td><td>${m[3]}</td></tr>`
    );

    output.innerHTML = `<h3>Concordancier</h3><table><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>` +
        lignes.join('') + `</table>`;
}

// Fonction personnalisée : mots de 5 lettres
function mots5lettres() {
    if (tokens.length === 0) {
        alert("Erreur : aucun texte chargé.");
        return;
    }

    const mots = tokens.filter(t => t.length === 5);
    const output = document.getElementById("resultats");
    output.innerHTML = `<h3>Mots de 5 lettres</h3><p>${mots.join(', ')}</p>`;
}
