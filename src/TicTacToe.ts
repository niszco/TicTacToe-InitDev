import * as readlineSync from "readline-sync";

function main(): void { //Fonction Principale
    let newTableau = créeGrille(questionTailleGrille());
    console.log(newTableau);
    affiche(newTableau);
}

function questionTailleGrille(): number { //Permet de choisir la taille de la grille
    let tailleQuestion = Number(readlineSync.question("Veuillez choisir la taille de votre grille: "));
    if (tailleQuestion < 3) { // Si l'utilisateur demande un nombre inférieur à 3, ça lui repose la question, sinon ça crée le tableau
        console.log("Erreur. Veuillez choisir 3 au minimum");
        return questionTailleGrille();
    }
    else {
        return tailleQuestion;
    }
}

function créeGrille(taille: number): Array<Array<string>> { //Exercice 1, Permet d'afficher la grille
    let grilleMatrice = []; //La variable qui stocke la grille pour le Tic Tac Toe
    let recupérateurString = []; //cette variable sert à recuper les strings et à les mettres dans des tableaux séparé pour une ligne
    //le premier for est pour généré le nombre d'élément dans les lignes et les colonnes
    for (let colonne = 0, compteurColonne = 0; compteurColonne < taille; colonne++) {
        recupérateurString.push(" "); // cela représente un espace vide dans le tableau
        if (colonne === taille) {
            grilleMatrice.push(recupérateurString);
            compteurColonne ++;
            colonne = -1; // gr^ace à l'incrémentation cette valeur passera à 0 à la fin de la boucle, sinon elle passe à 1 et une partie du tableau ne sera pas genéré
            recupérateurString =[];
        }
    }
    return grilleMatrice;
}

function tailleCôté(grille: Array<Array<string>>): number { //Exercice 2 
    let tailleGrille = 0;// Une grille de Tic Tac Toe est forcément un carré
    for (let ligne = 0; ligne < grille.length; ligne ++, tailleGrille ++ ); //calcule la taille d'un coté de la grille gr^ace à l'incrémentation 
    return tailleGrille;
}

function estVide(grille: Array<Array<string>>, ligneTaille: number, colonneTaille: number ): boolean { //Exercice 3
    for (let ligne = 0, colonne = 0; ligne < ligneTaille; colonne++) {
        if (grille[ligne][colonne] != " " || grille.length != colonneTaille || grille.length != ligneTaille) { //Si la grille n'est pas vide ou si la grille n'est pas un carré, cela retourne faux
            return false;//TODO Check la condition de la taille de la grille
        }
        if (colonne === grille.length-1) { //ça vérifie la colonne d'une ligne un par un
            colonne = -1;
            ligne ++;
        }
    }
    return true;
}

function écrire(grille: Array<Array<string>>, ligne: number, colonne: number, symbole: string): void { //Exercice 4
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] != " ") { //Si les valeurs de la colonne ou de la ligne sont au dela du tableau ou si elle a deja un symbole, cela retourne une erreur
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
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] === " ") { //Si les valeurs de la colonne ou de la ligne sont au dela du tableau ou si elle a deja un symbole, cela retourne une erreur
        console.log("erreur, les paramétres pour la position sont fausse ou elle est deja vide"); //TODO peut-être changer le com car c'est le même que celui du 4
    }
    else {
        grille[ligne][colonne] = " ";
    }
}

function est(grille: Array<Array<string>>, ligne: number, colonne: number, symbole: string): boolean { //Exercice 6
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] != symbole || (symbole != "X" && symbole != "O" && symbole != "x" && symbole != "o")) {
        return false; //TODO check condtion de l'énoncer
    }
    return true;
}

function affiche(grille: Array<Array<string>>): void { //Exercice 7
    for (let ligne_pipe = 0; ligne_pipe < grille.length; ligne_pipe++) { //Le deuxième for est pour afficher la grille
        for (let colonne_pipe = 0; colonne_pipe < grille.length; colonne_pipe++) {
            if (colonne_pipe === 0) {
                process.stdout.write(" "); //Rajoute un espace pour la première ligne du tableau
            }
            process.stdout.write(grille[ligne_pipe][colonne_pipe] + " ");
            if (colonne_pipe != grille.length-1) { //Pour éviter qu'un "|"" soit mis à la fin
                process.stdout.write("|" + " ");
            }
        }
        console.log();
        if (ligne_pipe != grille.length-1) { // permet d'empecher la mise en place d'une ligne de dash aprés la dernière ligne du tableau si la condition est valide 
            for (let ligne_dash = 0; ligne_dash < 1; ligne_dash++) { //Ce for permet de créer une ligne de dash juste aprés la mise en place d'un array dans un array sous format ligne
                for (let colonne_dash = 0; colonne_dash < grille.length; colonne_dash++) {
                    if (colonne_dash != grille.length-1) { //Si le for est a sa dernière itération, il rajoute 3 "dash" à la place de 4 car il n'y a pas de pipe à la fin. 3 dash pour un élement et un pour le "pipe"
                        process.stdout.write("-" + "-" + "-" + "-");
                    }
                    else {
                        process.stdout.write("-" + "-" + "-");
                    }
                }
                console.log();
            }
        }
    }
}

main();