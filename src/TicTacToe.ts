import * as readlineSync from "readline-sync";

function main(): void { //Fonction Principale
    questionTailleGrille();
}

function questionTailleGrille(): void { //Permet de choisir la taille de la grille
    let tailleQuestion = Number(readlineSync.question("Veuillez choisir la taille de votre grille: "));
    if (tailleQuestion < 3) { // Si l'utilisateur demande un nombre inférieur à 3, ça lui repose la question
        console.log("Erreur. Veuillez choisir 3 au minimum");
        questionTailleGrille();
    }
    else {
        créeGrille(tailleQuestion);
    }
}

function créeGrille(taille: number): void { //Exercice 1, Permet d'afficher la grille
    let grilleMatrice = []; //La variable qui stocke la grille pour le Tic Tac Toe
    let recupérateurString = []; //cette variable sert à recuper les strings et à les mettres dans des tableaux séparé pour une ligne
    //le premier for est pour généré le nombre d'élément dans les lignes et les colonnes
    for (let colonne = 0, compteurColonne = 0; compteurColonne < taille; colonne++) {
        recupérateurString.push("#"); // le # représente un espace vide
        if (colonne === taille) {
            grilleMatrice.push(recupérateurString);
            compteurColonne ++;
            colonne = -1;
            recupérateurString =[];
        }
    }
    grilleMatrice[0][2] = "X"
    console.log(tailleCôté(grilleMatrice));
    console.log(estVide(grilleMatrice, tailleCôté(grilleMatrice), tailleCôté(grilleMatrice)));// TODO si tu oublie comment faire des appels de fonction, check ça
    écrire(grilleMatrice, 2, 1, "O");
    effacer(grilleMatrice, 0, 2)
    console.log(est(grilleMatrice, 2, 1, "O"))
    affiche(grilleMatrice)
}

function tailleCôté(grille: Array<Array<string>>): number { //Exercice 2 
    let tailleGrille = 0;// Une grille de Tic Tac Toe est forcément un carré
    for (let ligne = 0; ligne < grille.length; ligne ++, tailleGrille ++ ){

    }
    return tailleGrille
}

function estVide(grille: Array<Array<string>>, colonneTaille: number, ligneTaille: number ): boolean { //Exercice 3
    for (let ligne = 0, colonne = 0; ligne < ligneTaille; colonne++) {
        if (grille[ligne][colonne] != "#" || grille.length != colonneTaille || grille.length != ligneTaille) { //Si la grille n'est pas vide ou si la grille n'est pas un carré, cela retourne faux
            return false;
        }
        if (colonne === grille.length-1) { //ça vérifie la colonne d'une ligne un par un
            colonne = -1;
            ligne ++;
        }
        else {

        }
    }
    return true;
}

function écrire(grille: Array<Array<string>>, ligne: number, colonne: number, symbole: string): void { //Exercice 4
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] != "#") { //Si les valeurs de la colonne ou de la ligne sont au dela du tableau ou si elle a deja un symbole, cela retourne une erreur
        console.log("erreur, les paramétres pour la position sont fausse ou elle contient deja une valeur");
    }
    else if (symbole != "X" && symbole != "O" && symbole != "x" && symbole != "o") { //Si le symbole n'est pas conforme, cela retourne une erreur, x et X sont différent ainsi que pour o et O
        console.log("erreur, le paramétre pour le symbole est non conforme"); //TODO Remplacer par des lowercase machin
    }
    else {
        grille[ligne][colonne] = symbole;
    }
}

function effacer(grille: Array<Array<string>>, ligne: number, colonne: number): void { //Exercice 5
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] === "#") { //Si les valeurs de la colonne ou de la ligne sont au dela du tableau ou si elle a deja un symbole, cela retourne une erreur
        console.log("erreur, les paramétres pour la position sont fausse ou elle est deja vide"); //TODO peut-être changer le com car c'est le même que celui du 4
    }
    else {
        grille[ligne][colonne] = "#";
    }
}

function est(grille: Array<Array<string>>, ligne: number, colonne: number, symbole: string): boolean { //Exercice 6
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] != symbole || (symbole != "X" && symbole != "O" && symbole != "x" && symbole != "o")) {
        console.log("debug test est")
        return false
    }
    return true;
}

function affiche(grille: Array<Array<string>>): void { //Exercice 7
    for (let ligne = 0; ligne < grille.length; ligne++) { //Le deuxième for est pour afficher la grille
        for (let colonne = 0; colonne < grille.length; colonne++) {
            process.stdout.write(grille[ligne][colonne] + " ");
            if (colonne != grille.length-1) { //Pour éviter qu'un "|"" soit mis à la fin
                process.stdout.write("|" + " ");
            }
        }
        console.log();
        for (let jaaj1 = 0; jaaj1 < 1; jaaj1++) { //TODO créer une explication pourquoi ça marche, car je n'en sais rien lol
            for (let jaaj2 = 0; jaaj2 < grille.length; jaaj2++) { //TODO changer noms de variable
                process.stdout.write("-" + "-" + "-");
            }
            console.log();
        }
    }
}

main();