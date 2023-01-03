import * as readlineSync from "readline-sync";

//1er partie

function créeGrille(taille: number): Array<Array<string>> { // Exercice 1 : Permet d'afficher la grille
    let grilleMatrice = []; // Stocke la grille pour le Tic Tac Toe
    let recupérateurString = []; // Sert à recuperer les strings et à les insérer dans des tableaux séparé par une ligne
    // Le premier for est généré pour le nombre d'éléments dans les lignes et les colonnes
    for (let colonne = 0, compteurColonne = 0; compteurColonne < taille; colonne++) {
        recupérateurString.push(" "); // Représente un espace vide dans le tableau
        if (colonne === taille) {
            grilleMatrice.push(recupérateurString);
            compteurColonne ++;
            colonne = -1; // Grâce à l'incrémentation cette valeur passera à 0 à la fin de la boucle, sinon elle passe à 1 et une partie du tableau ne sera pas genéré
            recupérateurString =[];
        }
    }
    return grilleMatrice;
}

function tailleCôté(grille: Array<Array<string>>): number { // Exercice 2 :
    let tailleGrille = 0;// Une grille de Tic Tac Toe est forcément un carré
    for (let ligne = 0; ligne < grille.length; ligne ++, tailleGrille ++ ); // Calcule la taille d'un coté de la grille grâce à l'incrémentation 
    return tailleGrille;
}

function estVide(grille: Array<Array<string>>, ligneTaille: number, colonneTaille: number ): boolean { // Exercice 3 :
    if ((ligneTaille < 0 || ligneTaille > grille.length-1) || (colonneTaille < 0 || colonneTaille > grille.length-1) || grille[ligneTaille][colonneTaille] != " ") {
        return false;
    }
    return true;
}

function écrire(grille: Array<Array<string>>, ligne: number, colonne: number, symbole: string): void { // Exercice 4 :
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] != " ") { // Si les valeurs de la colonne ou de la ligne sont au delà du tableau ou si elle a dejà un symbole, la fonction retourne une erreur.
        console.log("erreur, les paramétres pour la position sont fausse ou elle contient deja une valeur");
    }
    else if (symbole != "X" && symbole != "O" && symbole != "x" && symbole != "o") { // Si le symbole n'est pas conforme, cela retourne une erreur, x et X sont différent ainsi que pour o et O
        console.log("erreur, le paramétre pour le symbole est non conforme"); // TODO Remplacer par des lowercase machin
    }
    else {
        grille[ligne][colonne] = symbole;
    }
}

function effacer(grille: Array<Array<string>>, ligne: number, colonne: number): void { // Exercice 5 :
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] === " ") { // Si les valeurs de la colonne ou de la ligne sont au delà du tableau ou si elle a dejà un symbole, la fonction retourne une erreur.
        console.log("erreur, les paramétres pour la position sont fausse ou elle est deja vide"); // TODO peut-être changer le com car c'est le même que celui du 4
    }
    else {
        grille[ligne][colonne] = " ";
    }
}

function est(grille: Array<Array<string>>, ligne: number, colonne: number, symbole: string): boolean { // Exercice 6 :
    if ((ligne < 0 || ligne > grille.length-1) || (colonne < 0 || colonne > grille.length-1) || grille[ligne][colonne] != symbole || (symbole != "X" && symbole != "O" && symbole != "x" && symbole != "o")) {
        return false;
    }
    return true;
}

function affiche(grille: Array<Array<string>>): void { // Exercice 7 :
    for (let ligne_pipe = 0; ligne_pipe < grille.length; ligne_pipe++) { // Le deuxième for permet d'afficher la grille
        for (let colonne_pipe = 0; colonne_pipe < grille.length; colonne_pipe++) {
            if (colonne_pipe === 0) {
                process.stdout.write(" "); // Ajoute un espace pour la première ligne du tableau
            }
            process.stdout.write(grille[ligne_pipe][colonne_pipe] + " ");
            if (colonne_pipe != grille.length-1) { // Pour éviter qu'un caratère : "|" soit mis à la fin
                process.stdout.write("|" + " ");
            }
        }
        console.log();
        if (ligne_pipe != grille.length-1) { // Permet d'empêcher la mise en place d'une ligne de "-" après la dernière ligne du tableau si la condition est valide 
            for (let ligne_dash = 0; ligne_dash < 1; ligne_dash++) { // Ce for permet de créer une ligne de "-" juste après la mise en place d'un array,dans un array sous format ligne
                for (let colonne_dash = 0; colonne_dash < grille.length; colonne_dash++) {
                    if (colonne_dash != grille.length-1) { // Si le for est a sa dernière itération, il rajoute 3 "dash" à la place de 4 car il n'y a pas de pipe à la fin. 3 dash pour un élement et un pour le "pipe"
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

// 2ème partie :

function main(): void {
    let newTableau = créeGrille(questionTailleGrille());// Permet de créer une grille vide pour jouer au morpion
    let historique = new Array<Array<number|string>>;// Permet de créer le tableau qui stocke l'historique des coups sans le faire dans la boucle
    tourParTour(newTableau, 0, historique); // Fonction qui sert de boucle pour jouer
}

function questionTailleGrille(): number { // Permet de choisir la taille de la grille
    let tailleQuestion = readlineSync.question("Veuillez choisir la taille de votre grille: ");
    if (verifieurEntier(tailleQuestion) === false) { // Si le caractère saisi n'est pas un entier, on réitére la question
        console.log("Il faut saisir un entier");
        return questionTailleGrille();
    }
    let représentationQuestion = Number(tailleQuestion)
    if (représentationQuestion < 3) { // Si l'utilisateur demande un nombre inférieur à 3, on lui repose la question, sinon le tableau est créé.
        console.log("Erreur. Veuillez choisir 3 au minimum");
        return questionTailleGrille();
    }
    else {
        return représentationQuestion;
    }
}

function verifieurEntier(chaine: string): boolean { // Pour des raisons que je ne comprends pas, si on met un espace " " au début de la réponse, il sera considerer comme un 0, en soit c'est n'est pas un problème qui nuit au fonctionnement
    for (let incrémentation = 0, compteurSymbole = 0; incrémentation < chaine.length; incrémentation ++) {
        if (chaine[incrémentation] === "-" || chaine[incrémentation] === "+") { // Cela permet de compter le nombre de - ou +, il ne peut seulement en avoir un seul
            compteurSymbole ++;
        }
        if (((chaine[incrémentation] === "-" || chaine[incrémentation] === "+") && (chaine[incrémentation+1] === " " || chaine.length === 1))) { // S'il y a un symbole qui n'est pas attaché à un nombre, la fonction retourne faux.
            return false;
        }
        else if ((estUnSigneValide(chaine[incrémentation]) === false) || compteurSymbole > 1) { 
            // Cela vérifie si le string est un symbole valide ou qu'il y a un seul symbole + ou -, sinon la fonction retourne faux
            return false;
        }
    }
    return true;
}

function estUnSigneValide (chaine: string): boolean { // Fonction qui permet aux for ci-dessus d'être mieux lisible en permettant de racourcir les conditions
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
    ) { // Si le le caractére analysé est conforme, la fonction retourne vraie
        return true;
    }
    else {
        return false;
    }
}

function tourParTour(grille: Array<Array<string>>, tour: number, historique: Array<Array<number|string>>): void { // Fonction émule les tours de chaque joueurs.
    for (let tourBoucle = tour, maximumTour = tailleCôté(grille) * tailleCôté(grille); tourBoucle < maximumTour; tourBoucle ++) { // Une grille de Tic Tac Toe est un carré, donc pour calculer le maximum d'élement on faits taille coté * taille coté
        if (continuerPartie() === false) { // Cette condition permet de demander à l'utilisateur s'il veut continuer la partie
            return intérompPartie();
        }
        afficherHistorique(tourBoucle, historique); // La fonction affiche l'historique s'il y en a un
        if (AnnulerCoup(tourBoucle) === true) { // Si la fonction retourne true, on procéde à l'annulation du coup précedent
            effacer(grille, récupererNombreHistorique(historique, tourBoucle-1, 0), récupererNombreHistorique(historique, tourBoucle-1, 1)); // Pour plus d'information, il faut voir la fonction "récupererNombreHistorique"
            historique.pop();
            affiche(grille);
            return tourParTour(grille, tourBoucle-1, historique); // On relance le tour mais on décremente de 1
        }
        if (tourBoucle % 2 === 0) { // Le jeu commencera toujours par le joueur O
            console.log("C'est au tour du joueur O");
            let saisieDonnées = saisieUtilisateur(grille, tourBoucle);
            if ((saisieDonnées[0] === tailleCôté(grille) * tailleCôté(grille)) || (saisieDonnées[1] === tailleCôté(grille) * tailleCôté(grille))) { // Il est impossible pour une donnée d'avoir la même valeur que la taille maximum d'une grille, la seule possibilité est acquise grâce à une des conditions de la fonction
                return tourParTour(grille, tourBoucle, historique); // Permet de retourner au début du tour si l'utilisateur appuie sur entrer lors de la saisie des données
            }
            historique.push(écrireDansHistorique(saisieDonnées[0], saisieDonnées[1], "O"));
            écrire(grille, saisieDonnées[0], saisieDonnées[1], "O");
        }
        else { // si tourBoucle est impaire, c'est le tour du joueur X
            console.log("C'est au tour du joueur X");
            let saisieDonnées = saisieUtilisateur(grille, tourBoucle);
            if ((saisieDonnées[0] === tailleCôté(grille) * tailleCôté(grille)) || (saisieDonnées[1] === tailleCôté(grille) * tailleCôté(grille))) { // Il est impossible pour une donnée d'avoir la même valeur que la taille maximum d'une grille, la seule possibilité est acquise grâce à une des conditions de la fonction
                return tourParTour(grille, tourBoucle, historique); // Permet de retourner au début du tour si l'utilisateur appuie sur entrer lors de la saisie des données
            }
            historique.push(écrireDansHistorique(saisieDonnées[0], saisieDonnées[1], "X"));
            écrire(grille, saisieDonnées[0], saisieDonnées[1], "X");
        }
        affiche(grille);
        tourBoucle = statutDeLaPartie(grille, tourBoucle, maximumTour); // La boucle se finit immédiatement en mettant la valeur maximale si un des deux joueurs à gagné
    }
}

function continuerPartie(): boolean { // Cette fonction demande au joueur s'il veut continuer la partie
    let reponseQuestion = String(readlineSync.question("On continue ? [O]ui ou [N]on: "));
    if (reponseQuestion === "N") {
        return false;
    }
    else if (reponseQuestion != "N" && reponseQuestion != "O") { // Si l'utilisateur saisie une valeur qui n'est ni N ou O, on lui redemande de saisir
        console.log("Erreur. Veuillez saisir un caractère valide [O] ou [N]");
        return continuerPartie();
    }
    else {
        return true;
    }
}

function intérompPartie(): void { // Fonction qui intérrompt le for si le joueur veut arréter la partie en cours
    console.log("la partie à été intérompue");
}

function saisieUtilisateur(grille: Array<Array<string>>, numéroTour: number): Array<number> { // Cette fonction permet de saisir les données et les stocker dans un tableau
    let stockageSaisie = new Array<number>;
    let ligne = saisieUtilisateurLigne(grille, numéroTour);
    stockageSaisie.push(ligne);
    if (stockageSaisie[0] === tailleCôté(grille) * tailleCôté(grille)) {
        return stockageSaisie;
    }
    let colonne = saisieUtilisateurColonne(grille, numéroTour);
    stockageSaisie.push(colonne)
    if (stockageSaisie[1] === tailleCôté(grille) * tailleCôté(grille)) {
        return stockageSaisie;
    }
    if (estVide(grille, stockageSaisie[0], stockageSaisie[1]) === false) {
        console.log("erreur la case n'est pas vide");
        return saisieUtilisateur(grille, numéroTour);
    }
    return stockageSaisie;
}

function saisieUtilisateurLigne(grille: Array<Array<string>>, numéroTour: number): number { //Cette fonction permet à l'utilisateur de rentrer une saisie et elle vérifie si elle est valide
    let saisieUtilisateur = readlineSync.question("Entrez le numéro de la ligne (appuyez sur entrée pour annuler la saisie). Pour rappel, la grille commence par 0: ");
    if (verifieurEntier(saisieUtilisateur) === false) {
        console.log("Il faut saisir un entier");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else if (saisieUtilisateur.length === 0) { // Si l'utilisateur appuie directemment sur entrer
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

function saisieUtilisateurColonne(grille: Array<Array<string>>, numéroTour: number): number { // Cette fonction est la même que celle au dessus, sauf avec des messages différents
    let saisieUtilisateur = readlineSync.question("Entrez le numéro de la colonne (appuyez sur entrée pour annuler la saisie). Pour rappel, la grille commence par 0: ");
    if (verifieurEntier(saisieUtilisateur) === false) {
        console.log("Il faut saisir un entier");
        return saisieUtilisateurLigne(grille, numéroTour);
    }
    else if (saisieUtilisateur.length === 0) { // Si l'utilisateur appuie directemment sur entrer
        return tailleCôté(grille) * tailleCôté(grille);
    }
    let nombreSaisieColonne = Number(saisieUtilisateur)
    if (nombreSaisieColonne <= tailleCôté(grille)-1 && nombreSaisieColonne >= 0) {
        return nombreSaisieColonne;
    }
    else if (nombreSaisieColonne > tailleCôté(grille)-1 ) {
        console.log("Erreur, le nombre inserer est plus grand que la hauteur maximale de la grille");
        return saisieUtilisateurColonne(grille, numéroTour);
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

function statutDeLaPartie(grille: Array<Array<string>> , tour: number, maximumDeTour: number): number { // Cette fonction vérifie si l'un des deux joueurs disposent des conditions nécessaires pour gagner et met fin à la partie, sinon elle continue jusqu'a l'annonce d'un match nul.
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
        return tour;
    }
    else {
        return tour;
    }
}

function gagner(grille: Array<Array<string>>, symbole: string): boolean { // Cette fonction vérifie en detail le tableau pour chercher si un des deux joueurs ont une combinaisons gagnante
    for (let ligne = 0, colonne = 0, compteurSymbole = 0; ligne < tailleCôté(grille); colonne++ ) { // Ce for permet de vérifier si le joueur a complété une grille horizontalement
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
            colonne = -1; // L'incrémentation le changera en 0
            compteurSymbole = 0;
        }
    }
    for (let ligne = 0, colonne = 0, compteurSymbole = 0; colonne < tailleCôté(grille); ligne++ ) { // Ce for permet de vérifier si le joueur a complété une grille verticalement
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
            ligne = -1; // L'incrémentation le changera en 0
            compteurSymbole = 0;
        }
    }
    for (let ligne = 0, colonne = 0, compteurSymbole = 0; colonne < tailleCôté(grille); ligne++, colonne++) { // Ce for permet de vérifier si le joueur a complété une grille diagonalement vers la droite
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
    for (let ligne = 0, colonne = tailleCôté(grille)-1, compteurSymbole = 0; ligne < tailleCôté(grille); ligne++, colonne--) { // Ce for permet de vérifier si le joueur a complété une grille diagonalement vers la gauche
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

function écrireDansHistorique(ligne: number, colonne: number, Symbole: string): Array<number | string> { // Fonction qui insére le numéro de la ligne, colonne et symbole dans un tableau pour servir d'historique 
    let historiqueArray = [];
    historiqueArray.push(ligne, colonne, Symbole);
    return historiqueArray;
}

function afficherHistorique(numéroTour: number, historique: Array<Array<number|string>>): void { // Permet d'afficher les informations nécessaires à l'utilisateur concernant l'historique
    if (numéroTour === 0 ) {
    }
    else {
        console.log("Dernier coup joué = (", historique[numéroTour-1][0],",", historique[numéroTour-1][1],",", "'",historique[numéroTour-1][2],"'", ")");
    }
}

function AnnulerCoup(numéroTour: number): boolean { // Fonction qui demande à l'utilisateur s'il veut annuler son coup
    if (numéroTour === 0 ) {
        return false;
    }
    else {
        let reponseQuestion = String(readlineSync.question("annulez ce coup ? [O]ui ou [N]on: "));
        if (reponseQuestion === "N") {
            return false;
        }
        else if (reponseQuestion != "N" && reponseQuestion != "O") { // Si l'utilisateur saisie une valeur qui n'est ni N ou O, on lui redemande de saisir la valeur
            console.log("Erreur. Veuillez saisir un caractère valide [O] ou [N]");
            return AnnulerCoup(numéroTour);
        }
        else {
            return true;
        }
    }
}

function récupererNombreHistorique(historique: Array<Array<number|string>>, numéroTour: number, indexArray: number): number { // Fonction qui permet de récupérer un nombre du tableau de l'historique et de le convertir au bon type car number | string != number
    return Number(historique[numéroTour][indexArray])
}

main(); // Pour lancer le Tic-Tac-Toe