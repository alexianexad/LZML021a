// Fonction qui demande le nom à l'utilisateur via une boîte de dialogue
function demanderNom() {
    let nom = prompt("Quel est votre nom?");
    if (nom) {
        alert("Bonjour, " + nom + "!");
    } else {
        alert("Vous n'avez pas entré de nom.");
    }
}

// Fonction incorrectement nommée : "fonction" au lieu de "function"
// Corrigée ci-dessous :
// Fonction qui récupère la valeur d’un champ input et l’affiche dans un élément HTML
function prenom() {
    let name = document.getElementById("Comment vous appelez vous?").value; // Erreur probable ici : l’id d’un élément ne doit pas contenir de point d’interrogation
    document.getElementById("holder1").innerHTML = name;
}

// Affiche un message "Bonjour!" dans un élément avec l’ID "resultat"
function afficherNom() {
    const message = "Bonjour!";
    document.getElementById("resultat").innerHTML = message;
}

// Affiche une alerte de bienvenue et tente d’écrire "aide" dans la page
// Mais ici "aide" n’est pas défini → il manque probablement une variable ou une chaîne de texte
function afficherAide() {
    alert("Bienvenue sur mon site !");
    document.getElementById("resultat").innerHTML = aide; // Erreur potentielle : 'aide' n'est pas défini
}

// Affiche un dictionnaire de fréquence des mots dans les tokens globaux
function dictionnaire() {
    if (tokensGlobaux.length === 0) {
        alert("Aucun token trouvé ! Chargez un fichier d'abord.");
        return;
    }

    // Création du dictionnaire de fréquences
    let freqs = {};
    tokensGlobaux.forEach(tok => {
        tok = tok.toLowerCase();
        if (freqs[tok]) {
            freqs[tok]++;
        } else {
            freqs[tok] = 1;
        }
    });

    // Tri du dictionnaire par fréquence décroissante
    let sorted = Object.entries(freqs).sort((a, b) => b[1] - a[1]);

    // Création du tableau HTML avec les fréquences
    let table = "<table><tr><th>Forme</th><th>Fréquence</th></tr>";
    sorted.forEach(([mot, freq]) => {
        table += `<tr><td>${mot}</td><td>${freq}</td></tr>`;
    });
    table += "</table>";

    document.getElementById("texteResultat").innerHTML = "<h3>📊 Dictionnaire de fréquences</h3>" + table;
}

// Fonction de segmentation simple à partir d’un champ texte (input)
function segmenter() {
    let texte = document.getElementById("texte").value;
    let tokens = texte.split(" "); // Séparation par les espaces
    let table = document.createElement("table");

    tokens.forEach(mot => {
        let row = document.createElement("tr");
        row.innerHTML = mot; // Affiche un mot par ligne
        table.appendChild(row);
    });

    document.getElementById("texteResultat").innerHTML = "";
    document.getElementById("texteResultat").appendChild(table);
}

// Fonction qui segmente un fichier texte en utilisant des délimiteurs personnalisés
function segmenterTexte() {
    const fileInput = document.getElementById("fileInput");
    const delimiters = document.getElementById("delimID").value; // Récupère les délimiteurs donnés par l’utilisateur
    const displayArea = document.getElementById("page-analysis");

    if (!fileInput.files.length) {
        alert("Veuillez sélectionner un fichier !");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        let text = event.target.result;

        // Création d’une expression régulière avec les délimiteurs
        let regex = new RegExp("[" + delimiters.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + "]+", "g");

        // Découpe du texte selon les délimiteurs
        let segments = text.split(regex).filter(segment => segment.trim() !== "");

        // Affichage du résultat
        displayArea.innerHTML = "<h3>Résultat de la segmentation :</h3><p>" + segments.join("<br>") + "</p>";
    };

    reader.readAsText(file);
}

// Code exécuté au chargement de la page
window.onload = function () {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // Quand l'utilisateur choisit un fichier
    fileInput.addEventListener('change', function (e) {
        let file = fileInput.files[0];
        let textType = new RegExp("text.*");

        // Vérifie si le fichier est un fichier texte
        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function (e) {
                fileDisplayArea.innerText = reader.result; // Affiche le contenu dans une zone dédiée
            }

            reader.readAsText(file); // Lance la lecture du fichier

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });

    // Associe la fonction de segmentation à un bouton
    document.querySelector("button:nth-of-type(2)").onclick = segmenterTexte;
}

