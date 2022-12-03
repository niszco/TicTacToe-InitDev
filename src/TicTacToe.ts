import * as readlineSync from "readline-sync";

function main(): void { //Fonction Principale
    questionTailleGrille()
}

function questionTailleGrille(): void { //Exercice 2, Permet de choisir la taille de la grille
    let tailleQuestion = Number(readlineSync.question("Veuillez choisir la taille de votre grille: "));
    créeGrille(tailleQuestion);
}

function créeGrille(taille: number): void { //Exercice 1, Permet d'afficher la grille
    let grilleMatrice = []; //La variable qui stocke la grille pour le Tic Tac Toe
    let recupérateurString = []; //cette variable sert à recuper les strings et à les mettres dans des tableaux séparé pour une ligne
    //le premier for est pour généré le nombre d'élément dans les lignes
    for (let cologne = 0, compteurColone = 0; compteurColone < taille+(taille-1); cologne++) { //taille+(taille-1) permet d'avoir la longueur exact du tableau pour une taille de grille spécifique. Par exemple, si on veut une grille de 10, il y aura 9 séparateur "|" donc 10 grille + (10 - 1)séparateur = 19
        if (compteurColone % 2 != 0) {
            recupérateurString.push("-");
        }
        else {
            if (cologne % 2 === 0) { //
                recupérateurString.push("#"); // le # représente un espace vide
            }
            else {
                recupérateurString.push("|");
            }
        }
        if (cologne === taille+(taille-1)) {
            grilleMatrice.push(recupérateurString);
            compteurColone ++;
            cologne = -1;
            recupérateurString =[];
        }
    }
    for (let cologne = 0; cologne < grilleMatrice.length; cologne++) { //Le deuxième for est pour afficher la grille
        for (let ligne = 0; ligne < grilleMatrice.length; ligne++) {
            process.stdout.write(grilleMatrice[cologne][ligne] + " ");
        }
        console.log();
    }
}

main()