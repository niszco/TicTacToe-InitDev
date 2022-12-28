import * as readlineSync from "readline-sync";

//1er partie

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
    if ((ligneTaille < 0 || ligneTaille > grille.length-1) || (colonneTaille < 0 || colonneTaille > grille.length-1) || grille[ligneTaille][colonneTaille] != " ") {
        return false;
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
        return false;
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

//2ème partie

function main(): void { //Fonction Principale
    let newTableau = créeGrille(questionTailleGrille());
    tourParTour(newTableau, 0);
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

function continuerPartie(tour: number, maximumDeTour: number): number {
    let reponseQuestion = String(readlineSync.question("On continue ? [O]ui ou [N]on: "));
    if (reponseQuestion === "N") { //Si l'utilisateur réponds Non, la fonction modifie la variable tour pour qu'elle soit identique à la valeur maximale de tours, cela permet d'arreter la boucle
       return tour = maximumDeTour;
    }
    else if (reponseQuestion != "N" && reponseQuestion != "O") { //Si l'utilisateur saisie une valeur qui n'est ni N ou O, on lui redemande de saisir
        console.log("Erreur. Veuillez saisir un caractère valide [O] ou [N]");
        return continuerPartie(tour, maximumDeTour);
    }
    else { //Sinon la variable tour ne change pas
        return tour;
    }
}

function tourParTour(grille: Array<Array<string>>, tour: number): void { //Fonction pour faire les tours, en gros sous fonction principale
    for (let tourBoucle = tour, maximumTour = tailleCôté(grille) * tailleCôté(grille); tourBoucle < maximumTour; tourBoucle ++) { // Une grille de Tic Tac Toe est un carré, donc pour calculer le maximum d'élement on faits taille coté X taille coté
        tourBoucle = continuerPartie(tourBoucle, maximumTour);
        if (tourBoucle % 2 === 0) { //Le jeu commencera toujours par le joueur O
            console.log("C'est au tour du joueur O")
            dansLaBoucle(grille, tourBoucle)
        }
        else if (tourBoucle % 2 != 0) {
            console.log("C'est au tour du joueur X")
            dansLaBoucle(grille, tourBoucle)
        }
        affiche(grille);
    }
}

function dansLaBoucle(grille: Array<Array<string>>, tour: number): void {
    if (tour === tailleCôté(grille) * tailleCôté(grille)) {
        console.log("la partie à été intérompue")
    }
    else {
        let ligne = saisieUtilisateurLigne(grille, tour)
        let colonne = saisieUtilisateurColonne(grille, tour)
        vérification(ligne,colonne ,grille, tour)
        if (tour % 2 === 0) {
            écrire(grille, ligne, colonne, "O")
        }
        else {
            écrire(grille, ligne, colonne, "X")
        }
    }
}

function vérification(ligneFonction: number, colonneFonction: number, grilleReférence: Array<Array<string>>, numéroTour: number): void {
    if (estVide(grilleReférence, ligneFonction, colonneFonction) === false) {
        console.log("erreur la case n'est pas vide")
        dansLaBoucle(grilleReférence, numéroTour)
    }
}

function saisieUtilisateurLigne(grille: Array<Array<string>>, numéroTour: number): number { //Cette fonction permet à l'utilisateur de rentrer une saisie et elle vérifie si elle est valide
    let nombreSaisieLigne = Number(readlineSync.question("Entrez le numéro de la ligne (appuyez sur entrée pour annuler la saisie): "));
    if (nombreSaisieLigne <= tailleCôté(grille)-1 && nombreSaisieLigne >= 0) {
        return nombreSaisieLigne
    }
    else if (nombreSaisieLigne > tailleCôté(grille)-1 ) {
        console.log("Erreur, le nombre inserer est plus grand que la longueur maximale de la grille");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else if (nombreSaisieLigne < 0) {
        console.log("Erreur, le nombre inserer ne peut pas être inférieur à 0");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else if (nombreSaisieLigne == null) {
        tourParTour(grille, numéroTour)
        return 0
    }
    else {
        console.log("Erreur, caractère non valide");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
}

function saisieUtilisateurColonne(grille: Array<Array<string>>, numéroTour: number): number { //Cette fonction est la même que celle au dessus, sauf avec des messages différentes
    let nombreSaisieColonne = Number(readlineSync.question("Entrez le numéro de la colonne (appuyez sur entrée pour annuler la saisie): "));
    if (nombreSaisieColonne <= tailleCôté(grille)-1 && nombreSaisieColonne >= 0) {
        return nombreSaisieColonne
    }
    else if (nombreSaisieColonne > tailleCôté(grille)-1 ) {
        console.log("Erreur, le nombre inserer est plus grand que la hauteur maximale de la grille");
        return saisieUtilisateurColonne(grille, numéroTour);
    }
    else if (nombreSaisieColonne < 0) {
        console.log("Erreur, le nombre inserer ne peut pas être inférieur à 0");
        return saisieUtilisateurColonne(grille, numéroTour);
    }
    else if (nombreSaisieColonne === undefined) {
        tourParTour(grille, numéroTour)
        return 0
    }
    else {
        console.log("Erreur, caractère non valide");
        return saisieUtilisateurColonne(grille, numéroTour);
    }
}

main();