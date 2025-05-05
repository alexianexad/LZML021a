//variables globales
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

// Chargement automatique du fichier texte à l'ouverture de la page

window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        let file = fileInput.files[0];
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) {
            let reader = new FileReader();

            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
                segText();  // Appelle segmentation automatique
                let nbTokens = global_var_tokens.length;
                let nbLines = global_var_lines.length;
                document.getElementById("logger2").innerHTML = '<span class="infolog">Nombre de tokens : ' + nbTokens + '<br>Nombre de lignes : ' + nbLines + '</span>';
            }

            reader.readAsText(file);
            document.getElementById("logger1").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger1").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}


// Affiche ou masque l'aide

function showHide_aide() {
    let div = document.getElementById("aide");
    let button = document.getElementById("button_aide");

    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
        button.innerHTML = button.innerHTML.replace("Afficher", "Masquer");
    } else {
        div.style.display = "none";
        button.innerHTML = button.innerHTML.replace("Masquer", "Afficher");
    }
}

// Segmentation du texte en tokens et lignes

function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        if (document.getElementById("delimID").value === "") {
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun délimiteur donné !</span>';
        } else {
            document.getElementById('logger3').innerHTML = "";
            let text = document.getElementById("fileDisplayArea").innerText;
            let delim = document.getElementById("delimID").value;
            let display = document.getElementById("fileDisplayArea");

            // Création d'une expression régulière basée sur les délimiteurs
            let regex_delim = new RegExp("[" + delim.replace("-", "\\-").replace("[", "\\[").replace("]", "\\]") + "\\s]+");

            // Découpe en tokens et lignes
            let tokens = text.split(regex_delim).filter(x => x.trim() != "");
            let lines = text.split(/\r\n|\r|\n/).filter(line => line.trim() != "");

            global_var_tokens = tokens;
            global_var_lines = lines;
            display.innerHTML = tokens.join(" ");
        }
    }
}
// Création du dictionnaire de fréquence

function dictionnaire() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let tokenFreq = {};
        let tokens = global_var_tokens;

        // Comptage des fréquences
        tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1);

        let freqPairs = Object.entries(tokenFreq);
        freqPairs.sort((a, b) => b[1] - a[1]);

        let tableArr = [['<b>Token</b>', '<b>Fréquence</b>']];
        let tableData = freqPairs.map(pair => [pair[0], pair[1]]);
        let finalTable = tableArr.concat(tableData);

        let tableHtml = finalTable.map(row => '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td></tr>').join('');
        document.getElementById('page-analysis').innerHTML = '<table>' + tableHtml + '</table>';
    }
}

// Fonction de recherche de motif (GREP)

function grep() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let poleInput = document.getElementById('poleID').value;

        if (poleInput == "") {
            document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
        } else {
            let poleRegex = new RegExp(poleInput, 'g');
            let resultat = "<tr><th>Ligne</th><th>Résultat</th></tr>";

            for (let i = 0; i < global_var_lines.length; i++) {
                if (global_var_lines[i].match(poleRegex)) {
                    let lineNumber = i + 1;
                    resultat += "<tr><td>" + lineNumber + "</td><td>" + global_var_lines[i] + "</td></tr>";
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


//  Affichage du concordancier autour d’un pôle

function concordancier() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        document.getElementById('logger3').innerHTML = "";
        let poleInput = document.getElementById('poleID').value;

        if (poleInput == "") {
            document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
        } else {
            let lgInput = document.getElementById('lgID').value;

            if (lgInput == "" || parseInt(lgInput) <= 0) {
                document.getElementById('logger3').innerHTML = "Il faut d'abord entrer une longueur > 0 !";
            } else {
                let poleRegex = new RegExp("^" + poleInput + "$", "gi");
                let long = parseInt(lgInput);

                let concordance = global_var_tokens.reduce((acc, token, i) => {
                    if (poleRegex.test(token)) {
                        let cLeft = global_var_tokens.slice(Math.max(0, i - long), i).join(" ");
                        let cRight = global_var_tokens.slice(i + 1, Math.min(global_var_tokens.length, i + long + 1)).join(" ");
                        acc.push([cLeft, token, cRight]);
                    }
                    return acc;
                }, []);

                let table = document.createElement("table");
                table.innerHTML = "<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead>";
                concordance.forEach(([cLeft, pole, cRight]) => {
                    let row = table.insertRow();
                    row.innerHTML = "<td>" + cLeft + "</td><td>" + pole + "</td><td>" + cRight + "</td>";
                });

                if (concordance.length === 0) {
                    document.getElementById('page-analysis').innerHTML = "";
                    document.getElementById('logger3').innerHTML = "Aucune concordance trouvée.";
                } else {
                    document.getElementById('logger3').innerHTML = "";
                    document.getElementById("page-analysis").innerHTML = "";
                    document.getElementById("page-analysis").appendChild(table);
                }
        function nbPhrases() {
    if (texteComplet.trim() === "") {
        document.getElementById("logger3").innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        const phrases = texteComplet.split(/[.!?]+/).filter(p => p.trim() !== "");
        document.getElementById("page-analysis").innerHTML = "Nombre de phrases : " + phrases.length;
    }
}
    function tokenLong() {
    if (global_var_tokens.length === 0) {
        document.getElementById("logger3").innerHTML = "Aucun token chargé !";
    } else {
        let maxLength = Math.max(...global_var_tokens.map(t => t.length));
        let longestWords = [...new Set(global_var_tokens.filter(t => t.length === maxLength))];

        document.getElementById("page-analysis").innerHTML =
            "Mot(s) le(s) plus long(s) (" + maxLength + " caractères) :<br>" + longestWords.join(", ");
    }
}   
                function pieChart() {
    if (global_var_tokens.length === 0) {
        document.getElementById("logger3").innerHTML = "Aucun token à analyser !";
        return;
    }

    // Créer un dictionnaire de fréquence
    let freq = {};
    global_var_tokens.forEach(t => freq[t] = (freq[t] || 0) + 1);

    // Trier par fréquence et prendre les 5 premiers
    let top = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    let labels = top.map(x => x[0]);
    let data = top.map(x => x[1]);

    const ctx = document.getElementById('myPieChart').getContext('2d');
    new Chart(ctx, {
       
    });
}
                

function surlignerVoyelles() {
    const display = document.getElementById("fileDisplayArea");
    if (display.innerText.trim() === "") {
        document.getElementById("logger3").innerHTML = "Il faut d'abord charger un fichier .txt !";
    } else {
        const texte = display.innerText;
        const texteModifie = texte.replace(/[aeiouyAEIOUY]/g, '/');
        display.innerText = texteModifie;
        document.getElementById("logger3").innerHTML = "Les voyelles ont été remplacées par des '/'.";
    }
}
           

 

