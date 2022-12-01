import * as readlineSync from "readline-sync";

function questionTailleGrille(): void {
    let tailleQuestion = Number(readlineSync.question("Veuillez choisir la taille de votre grille: "));
    créeGrille(tailleQuestion, "a")
    console.log("debug", tailleQuestion);
}

function créeGrille(taille: number, texte: string): void {
    let grilleString = ""
    for (let i = 0; i < taille; i++) { //ça veut dire quoi la taille de la grille ?
        grilleString += "c";
        grilleString += "|";
        if (i === taille-1) {
            grilleString += texte
            console.log("ça marche")
        }
    }
    console.log("debug", grilleString)
}

questionTailleGrille()