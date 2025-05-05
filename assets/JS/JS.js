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
function showHide_aide() {
    let div = document.getElementById("aide");
    let bouton = document.getElementById("button_aide");

    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
        bouton.innerHTML = "Masquer l'aide";
    } else {
        div.style.display = "none";
        bouton.innerHTML = "Afficher l'aide";
    }
}

// Charger le texte -----------------------------------------------------------------------
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {  //addEventListener a été utilisée en faisant référence à https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_addeventlistener2
        
        let file = fileInput.fixxx
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
                segText();
                let nbTokens = xx
                let nbLines = xx
                document.getElementById("logger2").innerHTML = '<span class="infolog">Nombre de tokens : ' + nbTokens + '<br>Nombre de lignes : ' + nbLines +' </span>';
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);

            document.getElementById("logger1").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger1").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}



// VERSION segText() ------------------------------------------------------------------------
function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
    } else {
        if (document.getElementById("delimID").value === "") {
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun délimiteur donné !</span>'
        }else{
            document.getElementById('logger3').innerHTML="";
            let text = document.getElementById("fileDisplayArea").innerText;
            let delim = xx;
            let display = xx;
        
            let regex_delim = new RegExp(
                "["
                + delim
                    .replace("-", "\\-") // le tiret n'est pas à la fin : il faut l'échapper, sinon erreur sur l'expression régulière
                    .replace("[", "\\[").replace("]", "\\]") // à changer sinon regex fautive, exemple : [()[]{}] doit être [()\[\]{}], on doit "échapper" les crochets, sinon on a un symbole ] qui arrive trop tôt.
                + "\\s" // on ajoute tous les symboles d'espacement (retour à la ligne, etc)
                + "]+" // on ajoute le + au cas où plusieurs délimiteurs sont présents : évite les tokens vides
            );
        
            let tokens = xx;
            tokens = tokens.filter(x => x.trim() != ""); // on s'assure de ne garder que des tokens "non vides"
            let lines = xx;
            lines = lines.filter(line => line.trim() != "");
        
            global_var_tokens = xx; // décommenter pour vérifier l'état des tokens dans la console développeurs sur le navigateur
            global_var_lines = xx;
            display.innerHTML = xx.join(" ");
        }
    }
}


// A RETENIR : différences .innerHTML  .textContent  .innerText
//.innerHTML permet de récupérer ou définir le contenu HTML d'un élément, y compris les balises HTML.
//.textContent permet de récupérer ou définir le contenu textuel d'un élément, en ignorant les balises HTML. Supprime les espaces supplémentaires et les retours chariot.
//.innerText est similaire à .textContent, mais tient compte de la mise en forme CSS appliquée à l'élément, ce qui peut parfois affecter le texte affiché. Inclue des espaces et des retours chariot supplémentaires.

function dictionnaire() {
    // Vérifie si un fichier a été chargé
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let tokenFreq = {}; // Dictionnaire associant chaque token à sa fréquence
        let tokens = global_var_tokens; // Tokens déjà segmentés et stockés globalement

        // Compter la fréquence de chaque token
        tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1);

        // Convertir en tableau de paires [token, fréquence]
        let freqPairs = Object.entries(tokenFreq);

        // Trier par fréquence décroissante
        freqPairs.sort((a, b) => b[1] - a[1]);

        // Créer un tableau HTML avec entête
        let tableArr = [['<b>Token</b>', '<b>Fréquence</b>']];
        let tableData = freqPairs.map(pair => [pair[0], pair[1]]);
        let finalTable = tableArr.concat(tableData);

        // Générer le HTML
        let tableHtml = finalTable.map(row => '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td></tr>').join('');
        document.getElementById('page-analysis').innerHTML = '<table>' + tableHtml + '</table>';
    }
}

// ---------------- GREP -------------------------
function grep() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let poleInput = document.getElementById("pole").value;
        if (poleInput == "") {
            document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
        } else {
            let poleRegex = new RegExp(poleInput, 'gi');
            let resultat = "<tr><th>Ligne</th><th>Résultat</th></tr>";
            for (let i = 0; i < global_var_lines.length; i++) {
                if (poleRegex.test(global_var_lines[i])) {
                    let lineNumber = i + 1;
                    resultat += `<tr><td>${lineNumber}</td><td>${global_var_lines[i]}</td></tr>`;
                }
            }
            if (resultat == "<tr><th>Ligne</th><th>Résultat</th></tr>") {
                document.getElementById('page-analysis').innerHTML = "";
                document.getElementById('logger3').innerHTML = "Aucune correspondance trouvée.";
            } else {
                document.getElementById('logger3').innerHTML = "";
                document.getElementById('page-analysis').innerHTML = "<table>" + resultat + "</table>";
            }
        }
    }
}

// ---------------- Concordancier -------------------------
function concord() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let poleInput = document.getElementById('pole').value;
        if (poleInput == "") {
            document.getElementById('logger3').innerHTML = "Il faut entrer un pôle !";
        } else {
            let lgInput = document.getElementById('lgID').value;
            if (lgInput == "" || parseInt(lgInput) <= 0) {
                document.getElementById('logger3').innerHTML = "Il faut entrer une longueur > 0 !";
            } else {
                let poleRegex = new RegExp("^" + poleInput + "$", "gi");
                let long = parseInt(lgInput);

                let concordance = global_var_tokens.reduce((acc, token, i) => {
                    if (poleRegex.test(token)) {
                        let cLeft = global_var_tokens.slice(Math.max(0, i - long), i).join(" ");
                        let cRight = global_var_tokens.slice(i + 1, i + 1 + long).join(" ");
                        acc.push([cLeft, token, cRight]);
                    }
                    return acc;
                }, []);

                let table = document.createElement("table");
                table.innerHTML = "<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead>";
                concordance.forEach(([cLeft, pole, cRight]) => {
                    let row = table.insertRow();
                    row.innerHTML = `<td>${cLeft}</td><td>${pole}</td><td>${cRight}</td>`;
                });

                if (concordance.length == 0) {
                    document.getElementById('page-analysis').innerHTML = "";
                    document.getElementById('logger3').innerHTML = "Aucune occurrence trouvée.";
                } else {
                    document.getElementById('logger3').innerHTML = "";
                    document.getElementById("page-analysis").innerHTML = "";
                    document.getElementById("page-analysis").appendChild(table);
                }
            }
        }
    }
}

// ---------------- Nombre de phrases -------------------------
function nbPhrases() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let text = document.getElementById("fileDisplayArea").textContent;
        let phrases = text.split(/[.!?]+/).filter(p => p.trim().length > 0);
        let resultat = phrases.length;
        document.getElementById('page-analysis').innerHTML = '<div>Il y a ' + resultat + ' phrases dans ce texte.</div>';
    }
}

// ---------------- Mots les plus longs -------------------------
function tokenLong() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let tokenSort = [...global_var_tokens].sort((a, b) => b.length - a.length).slice(0, 10);
        let map = tokenSort.map(token => '<tr><td>' + token + '</td><td>' + token.length + '</td></tr>').join('');
        let resultat = '<table><tr><th colspan=2><b>10 mots les plus longs</b></th></tr><tr><th>Mot</th><th>Longueur</th></tr>' + map + '</table>';
        document.getElementById('page-analysis').innerHTML = resultat;
    }
}

// ---------------- Camembert (Pie Chart) -------------------------
function pieChart() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        let stopwordInput = document.getElementById("stopwords").value;
        let stopwords = stopwordInput.split(",").map(w => w.trim().toLowerCase());

        let filteredTokens = global_var_tokens.filter(token => !stopwords.includes(token.toLowerCase()));

        let count = {};
        filteredTokens.forEach(token => {
            count[token] = (count[token] || 0) + 1;
        });

        let chartData = Object.keys(count)
            .sort((a, b) => count[b] - count[a])
            .slice(0, 30)
            .map(token => ({ label: token, y: count[token] }));

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            backgroundColor: "transparent",
            title: { text: "Mots les plus fréquents" },
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
}

// ---------------- kujuj() - Transformation humoristique -------------------------
function kujuj() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier !";
    } else {
        alert("c'est une plaisanterie !");
        let kujujTokens = global_var_tokens.map(token => token + "uj");
        let kujujText = kujujTokens.join(" ");
        document.getElementById('page-analysis').innerHTML = `<div>${kujujText}</div>`;
    }
}
