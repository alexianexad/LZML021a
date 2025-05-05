let global_var_tokens = [];
let global_var_lines = [];

document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        global_var_lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        global_var_tokens = text.split(/\s+/).filter(token => token.trim() !== "");

        document.getElementById("fileInfo").textContent =
            `Fichier chargé : ${file.name} | ${global_var_tokens.length} tokens | ${global_var_lines.length} lignes non vides.`;

        document.getElementById("page-analysis").innerHTML = "<b>Fichier chargé avec succès.</b>";
    };
    reader.readAsText(file);
});

function afficherDictionnaire() {
    if (global_var_tokens.length === 0) return;

    const freq = {};
    global_var_tokens.forEach(token => {
        freq[token] = (freq[token] || 0) + 1;
    });

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);

    let html = "<b>Dictionnaire des formes :</b><br><ul>";
    sorted.forEach(([word, count]) => {
        html += `<li>${word} : ${count}</li>`;
    });
    html += "</ul>";
    document.getElementById("page-analysis").innerHTML = html;
}

function grep() {
    const motif = document.getElementById("motif").value.trim();
    if (!motif || global_var_lines.length === 0) return;

    const regex = new RegExp(motif, "gi");
    const results = global_var_lines
        .map(line => line.replace(regex, match => `<span style="background-color: yellow;">${match}</span>`))
        .filter(line => line.includes("span"));

    document.getElementById("page-analysis").innerHTML =
        `<b>Lignes contenant "${motif}" :</b><br>` + results.join("<br>");
}

function concordancier() {
    const motif = document.getElementById("motif").value.trim();
    if (!motif || global_var_lines.length === 0) return;

    const regex = new RegExp(`(.{0,20})(${motif})(.{0,20})`, "gi");
    const results = [];

    global_var_lines.forEach(line => {
        let match;
        while ((match = regex.exec(line)) !== null) {
            results.push({
                gauche: match[1],
                pole: match[2],
                droite: match[3]
            });
        }
    });

    if (results.length === 0) {
        document.getElementById("page-analysis").innerHTML = "Aucun résultat.";
        return;
    }

    let html = "<table border='1'><tr><th>Gauche</th><th>Motif</th><th>Droite</th></tr>";
    results.forEach(r => {
        html += `<tr><td>${r.gauche}</td><td style="background-color: yellow;">${r.pole}</td><td>${r.droite}</td></tr>`;
    });
    html += "</table>";

    document.getElementById("page-analysis").innerHTML = html;
}

function nbPhrases() {
    if (global_var_lines.length === 0) return;

    const texte = global_var_lines.join(" ");
    const phrases = texte.split(/[.!?]+/).filter(p => p.trim().length > 0);
    document.getElementById("page-analysis").innerHTML = `<b>Nombre de phrases :</b> ${phrases.length}`;
}

function tokenLong() {
    if (global_var_tokens.length === 0) return;

    const sorted = [...new Set(global_var_tokens)].sort((a, b) => b.length - a.length);
    const top10 = sorted.slice(0, 10);
    document.getElementById("page-analysis").innerHTML = `<b>10 mots les plus longs :</b><br>` + top10.join(", ");
}

function surlignerVoyelles() {
    if (global_var_tokens.length === 0) return;

    const voyelles = /[aeiouyAEIOUY]/g;
    const texte = global_var_tokens.map(token =>
        token.replace(voyelles, match => `<span style="color:red;">${match}</span>`)
    ).join(" ");

    document.getElementById("page-analysis").innerHTML = `<b>Voyelles surlignées :</b><br>${texte}`;
}

function kujuj() {
    if (global_var_tokens.length === 0) return;

    const transformé = global_var_tokens.map(token => token + "uj").join(" ");
    document.getElementById("page-analysis").innerHTML = `<b>Kujuj :</b><br>${transformé}`;
}
