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
