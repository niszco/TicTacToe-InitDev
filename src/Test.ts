import * as readlineSync from "readline-sync";

function racineCarré (nombre: number): string {
    for (let jourAdd = 0; jourAdd < nombre; jourAdd++) { //Ligne
        for (let i = 0; i < nombre; i++)  process.stdout.write(" " + (nombre - nombre)); //colonne
        console.log();
    }
    return "\x1b[32m Yolo \x1b[0m";
}
console.log(racineCarré(5));

function créeGrille(taille: number): void { //Exercice 1, Permet d'afficher la grille
    let grilleMatrice = [];
    let testString = []
    if (taille % 2 === 0) { //Si le nombre est pair, il manquera un élément dans la grille. C'est pour ça que on ajoute un +1
        taille += 1
    }
    for (let cologne = 0, compteurColone = 0; compteurColone < taille+2; cologne++) { //le premier for est pour généré le nombre d'élément dans les lignes
        if (compteurColone % 2 != 0) { // TODO Marche pour les nombres impaires, fix pour les nombres pairs
            testString.push("-");
        }
        else {
            if (cologne % 2 === 0) { //
                testString.push("#"); // TODO debug à changer plus tard
            }
            else {
                testString.push("|");
            }
        }
        if (cologne === taille+1) {
            grilleMatrice.push(testString);
            compteurColone ++
            cologne = -1
            testString =[]
        }
    }
    for (let cologne = 0; cologne < grilleMatrice.length; cologne++) { //Le deuxième for est pour afficher la grille
        for (let ligne = 0; ligne < grilleMatrice.length; ligne++) {
            process.stdout.write(grilleMatrice[cologne][ligne] + " ");
        }
        console.log();
    }
    console.log("debug", testString, grilleMatrice);
    console.log("debug", grilleMatrice[0][0])
}

créeGrille(3)

//Test Grille en array
//TODO a supprimer une fois les exercices finis

let grille = [
    [1,2], // Le saut de cologne ne fait rien, c'est juste pour une meilleur organisation
    [4,5],
    [6,7]
];

process.stdout.write(grille[0][1]/*donne 2*/+ " "+ grille[2][1]/*donne7*/); // Il est possible de specifier un indice dans un array qui est dans un array


//Je met de coté au cas ou
/*function créeGrille(taille: number): void { //Exercice 1, Permet d'afficher la grille
    let grilleMatrice = []; //La variable qui stocke la grille pour le Tic Tac Toe
    let recupérateurString = []; //cette variable sert à recuper les strings et à les mettres dans des tableaux séparé pour une ligne
    //le premier for est pour généré le nombre d'élément dans les lignes
    for (let colonne = 0, compteurColonne = 0; compteurColonne < taille+(taille-1); colonne++) { //taille+(taille-1) permet d'avoir la longueur exact du tableau pour une taille de grille spécifique. Par exemple, si on veut une grille de 10, il y aura 9 séparateur "|" donc 10 grille + (10 - 1)séparateur = 19
        if (compteurColonne % 2 != 0) {
            recupérateurString.push("-");
        }
        else {
            if (colonne % 2 === 0) { //
                recupérateurString.push("#"); // le # représente un espace vide
            }
            else {
                recupérateurString.push("|");
            }
        }
        if (colonne === taille+(taille-1)) {
            grilleMatrice.push(recupérateurString);
            compteurColonne ++;
            colonne = -1;
            recupérateurString =[];
        }
    }
    tailleCôté(grilleMatrice);
    //TODO c'est l'exo 7 en fait
    for (let colonne = 0; colonne < grilleMatrice.length; colonne++) { //Le deuxième for est pour afficher la grille
        for (let ligne = 0; ligne < grilleMatrice.length; ligne++) {
            process.stdout.write(grilleMatrice[colonne][ligne] + " ");
        }
        console.log();
    }
}*/

let tab = [0, 2, 4, 8];
for (let i in tab) console.log(i, "a");