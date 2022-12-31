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
    let tailleQuestion = readlineSync.question("Veuillez choisir la taille de votre grille: ");
    if (verifieurEntier(tailleQuestion) === false) {
        console.log("Il faut saisir un entier");
        return questionTailleGrille();
    }
    let représentationQuestion = Number(tailleQuestion)
    if (représentationQuestion < 3) { // Si l'utilisateur demande un nombre inférieur à 3, ça lui repose la question, sinon ça crée le tableau
        console.log("Erreur. Veuillez choisir 3 au minimum");
        return questionTailleGrille();
    }
    else {
        return représentationQuestion;
    }
}

function verifieurEntier(chaine: string): boolean { //Pour des raisons que je ne comprends pas, si on met un espace " " au début de la réponse, il sera considerer comme un 0
    for (let incrémentation = 0, compteurSymbole = 0; incrémentation < chaine.length; incrémentation ++) {
        if (chaine[incrémentation] === "-" || chaine[incrémentation] === "+") { //Cela permet de compter le nombre de - ou +, il ne peut seulement en avoir un seul
            compteurSymbole ++;
        }
        if (((chaine[incrémentation] === "-" || chaine[incrémentation] === "+") && (chaine[incrémentation+1] === " " || chaine.length === 1))) { // s'il y a un symbole qui n'est pas attacher à un nombre, cela retourne faux
            return false;
        }
        else if ((estUnSigneValide(chaine[incrémentation]) === false)) { 
            // Cela vérifie si le string est un symbole valide, sinon ça retourne faux
            return false;
        }
        else if (compteurSymbole > 1) { //S'il y a plus de symbole - ou + que 1, cela retourne faux
            return false;
        }
    }
    return true;
}

function estUnSigneValide (chaine: string): boolean { //Fonction pour permettre aux for ci-dessus d'être mieux lisible en permettant de racourcir les conditions
    if ((chaine === "0" || 
        chaine === "1" || 
        chaine === "2" || 
        chaine === "3" || 
        chaine === "4" || 
        chaine === "5" || 
        chaine === "6" || 
        chaine === "7" || 
        chaine === "8" || 
        chaine === "9" ||
        chaine === "+" ||
        chaine === "-") 
    ) {
        return true;
    }
    else {
        return false;
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
    for (let tourBoucle = tour, maximumTour = tailleCôté(grille) * tailleCôté(grille), ligne = 0, colonne = 0; tourBoucle < maximumTour; tourBoucle ++) { // Une grille de Tic Tac Toe est un carré, donc pour calculer le maximum d'élement on faits taille coté X taille coté
        tourBoucle = continuerPartie(tourBoucle, maximumTour); //TourBoucle est la variable utilisé pour l'incrémentation et connaitre le nombre de tours
        if (tourBoucle === tailleCôté(grille) * tailleCôté(grille)) { //lors de la fonction précedente, si le joueur à répondu Non, la variable tourBoucle prend la valeur maximumTour qui est aussi la limite du for
            return intérompPartie();
        }
        else if (tourBoucle % 2 === 0) { //Le jeu commencera toujours par le joueur O
            console.log("C'est au tour du joueur O");
            ligne = saisieUtilisateurLigne(grille, tour);
            if (ligne === tailleCôté(grille) * tailleCôté(grille)) {
                return tourParTour(grille, tourBoucle)
            }
            colonne = saisieUtilisateurColonne(grille, tour);
            if (colonne === tailleCôté(grille) * tailleCôté(grille)) {
                return tourParTour(grille, tourBoucle)
            }
            if (estVide(grille, ligne, colonne) === false) { //TODO trouver un moyen de renvoyer directement dans la saisie des coordonnées
                console.log("erreur la case n'est pas vide");
                return tourParTour(grille, tourBoucle);
            }
            écrire(grille, ligne, colonne, "O");
        }
        else { // si tourBoucle est impaire, c'est le tour du joueur X
            console.log("C'est au tour du joueur X");
            ligne = saisieUtilisateurLigne(grille, tour);
            if (ligne === tailleCôté(grille) * tailleCôté(grille)) {
                return tourParTour(grille, tourBoucle)
            }
            colonne = saisieUtilisateurColonne(grille, tour);
            if (colonne === tailleCôté(grille) * tailleCôté(grille)) {
                return tourParTour(grille, tourBoucle)
            }
            if (estVide(grille, ligne, colonne) === false) {
                console.log("erreur la case n'est pas vide");
                return tourParTour(grille, tourBoucle);
            }
            écrire(grille, ligne, colonne, "X");
        }
        affiche(grille);
        tourBoucle = statutDeLaPartie(grille, tourBoucle, maximumTour);
    }
}

// function vérification(ligneFonction: number, colonneFonction: number, grilleReférence: Array<Array<string>>, numéroTour: number): void {
//     if (estVide(grilleReférence, ligneFonction, colonneFonction) === false) {
//         console.log("erreur la case n'est pas vide");
//         return tourParTour(grilleReférence, numéroTour);
//     }
//     if (numéroTour % 2 === 0) {
//         return écrire(grilleReférence, ligneFonction, colonneFonction, "O");
//     }
//     else {
//         return écrire(grilleReférence, ligneFonction, colonneFonction, "X");
//     }
// }

function saisieUtilisateurLigne(grille: Array<Array<string>>, numéroTour: number): number { //Cette fonction permet à l'utilisateur de rentrer une saisie et elle vérifie si elle est valide
    let saisieUtilisateur = readlineSync.question("Entrez le numéro de la ligne (appuyez sur entrée pour annuler la saisie): ");
    if (verifieurEntier(saisieUtilisateur) === false) {
        console.log("Il faut saisir un entier");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else if (saisieUtilisateur.length === 0) {
        return tailleCôté(grille) * tailleCôté(grille);
    }
    let nombreSaisieLigne = Number(saisieUtilisateur)
    if (nombreSaisieLigne <= tailleCôté(grille)-1 && nombreSaisieLigne >= 0) {
        return nombreSaisieLigne;
    }
    else if (nombreSaisieLigne > tailleCôté(grille)-1 ) {
        console.log("Erreur, le nombre inserer est plus grand que la longueur maximale de la grille");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else if (nombreSaisieLigne < 0) {
        console.log("Erreur, le nombre inserer ne peut pas être inférieur à 0");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else {
        console.log("Erreur, caractère non valide");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
}

function saisieUtilisateurColonne(grille: Array<Array<string>>, numéroTour: number): number { //Cette fonction est la même que celle au dessus, sauf avec des messages différentes
    let saisieUtilisateur = readlineSync.question("Entrez le numéro de la colonne (appuyez sur entrée pour annuler la saisie): ");
    if (verifieurEntier(saisieUtilisateur) === false) {
        console.log("Il faut saisir un entier");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else if (saisieUtilisateur.length === 0) {
        return tailleCôté(grille) * tailleCôté(grille);
    }
    let nombreSaisieColonne = Number(saisieUtilisateur)
    if (nombreSaisieColonne <= tailleCôté(grille)-1 && nombreSaisieColonne >= 0) {
        return nombreSaisieColonne;
    }
    else if (nombreSaisieColonne > tailleCôté(grille)-1 ) {
        console.log("Erreur, le nombre inserer est plus grand que la hauteur maximale de la grille");
        return saisieUtilisateurColonne(grille, numéroTour);;
    }
    else if (nombreSaisieColonne < 0) {
        console.log("Erreur, le nombre inserer ne peut pas être inférieur à 0");
        return saisieUtilisateurColonne(grille, numéroTour);
    }
    else {
        console.log("Erreur, caractère non valide");
        return saisieUtilisateurColonne(grille, numéroTour);
    }
}

function statutDeLaPartie(grille: Array<Array<string>> , tour: number, maximumDeTour: number): number {
    if (gagner(grille, "O") === true) {
        console.log("le joueur O à gagner");
        return tour = maximumDeTour;
    }
    else if (gagner(grille, "X") === true) {
        console.log("le joueur X à gagner");
        return tour = maximumDeTour;
    }
    else if (gagner(grille, "X") === false && gagner(grille, "O") === false && tour === maximumDeTour-1) {
        console.log("C'est un match nul")
        return tour = maximumDeTour;
    }
    else {
        return tour
    }
}

function intérompPartie(): void { //Fonction pour pouvoir intérompre le for si le joueur veut arreter la partie en cours
    console.log("la partie à été intérompue");
}

function gagner(grille: Array<Array<string>>, symbole: string): boolean {
    for (let ligne = 0, colonne = 0, compteurSymbole = 0; ligne < tailleCôté(grille); colonne++ ) { //Ce for permet de vérifier si le joueur à completer une grille horizontalement
        if (grille[ligne][colonne] === symbole) {
            compteurSymbole ++;
        }
        else {
            compteurSymbole = 0;
        }
        if (compteurSymbole === tailleCôté(grille)) {
            return true;
        }
        if (colonne === tailleCôté(grille)-1) {
            ligne ++;
            colonne = -1; //l'incrémentation le changera en 0
            compteurSymbole = 0;
        }
    }
    for (let ligne = 0, colonne = 0, compteurSymbole = 0; colonne < tailleCôté(grille); ligne++ ) { //Ce for permet de vérifier si le joueur à completer une grille verticalement
        if (grille[ligne][colonne] === symbole) {
            compteurSymbole ++;
        }
        else {
            compteurSymbole = 0;
        }
        if (compteurSymbole === tailleCôté(grille)) {
            return true;
        }
        if (ligne === tailleCôté(grille)-1) {
            colonne ++;
            ligne = -1; //l'incrémentation le changera en 0
            compteurSymbole = 0;
        }
    }
    for (let ligne = 0, colonne = 0, compteurSymbole = 0; colonne < tailleCôté(grille); ligne++, colonne++) { //Ce for permet de vérifier si le joueur à completer une grille diagonalement vers la droite
        if (grille[ligne][colonne] === symbole) {
            compteurSymbole ++;
        }
        else {
            compteurSymbole = 0;
        }
        if (compteurSymbole === tailleCôté(grille)) {
            return true;
        }
    }
    for (let ligne = 0, colonne = tailleCôté(grille)-1, compteurSymbole = 0; ligne < tailleCôté(grille); ligne++, colonne--) { //Ce for permet de vérifier si le joueur à completer une grille diagonalement vers la gauche
        if (grille[ligne][colonne] === symbole) {
            compteurSymbole ++;
        }
        else {
            compteurSymbole = 0;
        }
        if (compteurSymbole === tailleCôté(grille)) {
            return true;
        }
    }
    return false;
}

main();