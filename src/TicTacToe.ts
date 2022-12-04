import * as readlineSync from "readline-sync";

function main(): void { //Fonction Principale
    questionTailleGrille();
}

function questionTailleGrille(): void { //Permet de choisir la taille de la grille
    let tailleQuestion = Number(readlineSync.question("Veuillez choisir la taille de votre grille: "));
    if (tailleQuestion < 3) { // Si l'utilisateur demande un nombre inférieur à 3, ça lui repose la question
        console.log("Erreur. Veuillez choisir 3 au minimum")
        questionTailleGrille();
    }
    else {
        créeGrille(tailleQuestion);
    }
}

function créeGrille(taille: number): void { //Exercice 1, Permet d'afficher la grille
    let grilleMatrice = []; //La variable qui stocke la grille pour le Tic Tac Toe
    let recupérateurString = []; //cette variable sert à recuper les strings et à les mettres dans des tableaux séparé pour une ligne
    //le premier for est pour généré le nombre d'élément dans les lignes
    for (let colonne = 0, compteurColonne = 0; compteurColonne < taille; colonne++) {
        recupérateurString.push("#"); // le # représente un espace vide
        if (colonne === taille) {
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
}

function tailleCôté(grille: Array<Array<string>>): void { //Exercice 2 
    let tailleGrille = 0;// Une grille de Tic Tac Toe est forcément un carré
    for (let ligne = 0; ligne < grille.length; ligne ++, tailleGrille ++ ){

    }
    console.log("voici la taille :", tailleGrille);
    console.log(estVide(grille, tailleGrille, tailleGrille));
}

function estVide(grille: Array<Array<string>>, colonneTaille: number, ligneTaille: number ): boolean { //Exercice 3
    for (let colonne = 0, ligne = 0; colonne < colonneTaille; ligne++) {
        //console.log("cologne =",colonne) //TODO à enlever
        //console.log("ligne = ",ligne) //TODO à enlever
        if (grille[colonne][ligne] != "#" || grille.length != colonneTaille || grille.length != ligneTaille) {
            return false;
        }
        if (ligne === grille.length-1) {
            ligne = -1;
            colonne ++;
            //console.log("debug jaaj") //TODO à enlever
        }
        else {

        }
    }
    return true;
}

main()