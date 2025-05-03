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
function dictionnaire() {
  if (tokens.length === 0) {
    afficherMessage("Erreur : aucun fichier chargé !");
    return;
  }
  let freq = {};
  tokens.forEach(t => freq[t] = (freq[t] || 0) + 1);
  let sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  afficherTableau(sorted, "Forme", "Fréquence");
}

function grep(pole) {
  if (lignes.length === 0) {
    afficherMessage("Erreur : aucun fichier chargé !");
    return;
  }
  if (!pole) {
    afficherMessage("Erreur : aucun pôle fourni !");
    return;
  }
  let exp = new RegExp(pole, "gi");
  let resultats = lignes.filter(l => exp.test(l));
  let colorie = l => l.replace(exp, m => `<span style="color:red">${m}</span>`);
  let affichage = resultats.map(colorie).join("<br>");
  document.getElementById("resultat").innerHTML = affichage;
}

function concordancier(pole, largeur = 5) {
  if (tokens.length === 0) {
    afficherMessage("Erreur : aucun fichier chargé !");
    return;
  }
  if (!pole) {
    afficherMessage("Erreur : aucun pôle fourni !");
    return;
  }
  let regex = new RegExp(pole, "i");
  let concordances = [];
  for (let i = 0; i < tokens.length; i++) {
    if (regex.test(tokens[i])) {
      let gauche = tokens.slice(Math.max(0, i - largeur), i).join(" ");
      let droite = tokens.slice(i + 1, i + 1 + largeur).join(" ");
      concordances.push([gauche, tokens[i], droite]);
    }
  }
  afficherTableau(concordances, "Contexte gauche", "Pôle", "Contexte droit");
}

