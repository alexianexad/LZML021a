fonction prenom () {
let name = document.getElementById("Comment vous appelez vous?").value;
    document.getElementById("holder1").innerHTML = name;
}
function afficherAide() {
    alert("Bienvenue sur mon site !");
}
 function exempleForEach() {
                let tableau = ["Ceci est mon premier paragraphe", "Ceci est mon deuxième paragraphe", "Paragraphe 3", "Et un dernier !"];
                let liste = "<ol>"; // Changement en liste ordonnée
                tableau.forEach(element => liste += "<li>" + element + "</li>");
                liste += "</ol>";
                document.getElementById("forEachHolder").innerHTML = liste;
            }

            function exempleMap() {
                let tableau = [6, 7, 8, 9];
                let resultat = tableau.map(element => element + 4); // Ajoute 4 à chaque élément
                document.getElementById("mapHolder").innerHTML = `resultat vaut [${resultat.join(', ')}]`;
            }

            function exempleFilter() {
                let tableau = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                let resultat = tableau.filter(element => element >= 5 && element <= 10);
                document.getElementById("filterHolder").innerHTML = `resultat vaut [${resultat.join(', ')}]`;
            }

            function exempleFiltre7() {
                let tableau = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                let resultat = tableau.filter(element => element === 7);
                document.getElementById("filter7Holder").innerHTML = `resultat vaut [${resultat.join(', ')}]`;
            }
