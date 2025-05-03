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
}

function segmenter() {
let texte = document.getElementById("texte").value;
let tokens = texte.split(" ");
let table = document.createElement("table");
tokens.forEach(mot => {
let row = document.createElement("tr");
row\.innerHTML = mot;
table.appendChild(row);
});
document.getElementById("texteResultat").appendChild(table);
}
function segmenterTexte() {
const fileInput = document.getElementById("fileInput");
const delimiters = document.getElementById("delimID").value;
const displayArea = document.getElementById("page-analysis");

```
if (!fileInput.files.length) {
    alert("Veuillez sélectionner un fichier !");
    return;
}

const file = fileInput.files[0];
const reader = new FileReader();

reader.onload = function (event) {
    let text = event.target.result;

    // Création d'une regex pour les délimiteurs
    let regex = new RegExp("[" + delimiters.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + "]+", "g");

    // Segmentation du texte
    let segments = text.split(regex).filter(segment => segment.trim() !== "");

    // Affichage du résultat
    displayArea.innerHTML = "<h3>Résultat de la segmentation :</h3><p>" + segments.join("<br>") + "</p>";
};

reader.readAsText(file);
```

}

window\.onload = function() {
let fileInput = document.getElementById('fileInput');
let fileDisplayArea = document.getElementById('fileDisplayArea');

```
// On "écoute" si le fichier donné a été modifié.
// Si on a donné un nouveau fichier, on essaie de le lire.
fileInput.addEventListener('change', function(e) {
    // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
    // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
    // On peut potentiellement donner plusieurs fichiers,
    // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
    let file = fileInput.files[0];
    // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
    let textType = new RegExp("text.*");

    if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
        // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
        var reader = new FileReader();

        // on dit au lecteur de fichier de placer le résultat de la lecture
        // dans la zone d'affichage du texte.
        reader.onload = function(e) {
            fileDisplayArea.innerText = reader.result;
        }

        // on lit concrètement le fichier.
        // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
        reader.readAsText(file);    

        document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
    } else { // pas un fichier texte : message d'erreur.
        fileDisplayArea.innerText = "";
        document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
    }
});

  document.querySelector("button:nth-of-type(2)").onclick = segmenterTexte;
```

}


    // Associe la fonction de segmentation à un bouton
    document.querySelector("button:nth-of-type(2)").onclick = segmenterTexte;
}
// Variables globales
let tokens = [];
let lignes = [];

// Chargement et segmentation
function chargerTexte() {
    const textarea = document.getElementById("texte");
    const texte = textarea.value.trim();
    
    if (!texte) {
        alert("Veuillez d'abord coller un texte.");
        return;
    }

    tokens = texte.split(/\s+/);
    lignes = texte.split(/\n/).filter(l => l.trim() !== "");

    alert(`Fichier chargé avec ${tokens.length} tokens et ${lignes.length} lignes non vides.`);
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

    const motif = document.getElementById("motif").value;
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

    const pôle = document.getElementById("motif").value;
    if (!pôle) {
        alert("Erreur : veuillez entrer un mot-clé.");
        return;
    }

    const regex = new RegExp(`(.{0,30})(${pôle})(.{0,30})`, "gi");
    const texte = document.getElementById("texte").value;
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

// Aide / Documentation
function afficherAide() {
    const aide = `\nFonctionnalités disponibles :\n
1. Charger un texte : segmentation en tokens et lignes.\n2. Dictionnaire : fréquence des mots.\n3. Grep : rechercher une expression régulière dans les lignes.\n4. Concordancier : affichage en contexte gauche/pôle/droit.\n5. Motifs de 5 lettres : affiche tous les mots de 5 lettres.`;
    alert(aide);
}
