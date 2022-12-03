function init(nbreLignes: number, nbreColonnes: number): Array<Array<boolean>> {
  let labyrinthe = new Array<Array<boolean>>();

  for (let i = 0; i < nbreLignes; i++) {
    let ligne = new Array<boolean>();

    for (let j = 0; j < nbreColonnes; j++) ligne.push(true);

    labyrinthe.push(ligne);
  }

  for (let i = 0; i < nbreLignes; i++) {
    labyrinthe[i][0] = false;
    labyrinthe[i][labyrinthe[i].length - 1] = false;
  }

  for (let j = 0; j < nbreColonnes; j++) {
    labyrinthe[0][j] = false;
    labyrinthe[labyrinthe.length - 1][j] = false;
  }

  return labyrinthe;
}

function estVide(labyrinthe: Array<Array<boolean>>, i: number, j: number): boolean {
  return labyrinthe[i][j];
}

function estMur(labyrinthe: Array<Array<boolean>>, i: number, j: number): boolean {
  return !estVide(labyrinthe, i, j);
}

function affichage(labyrinthe: Array<Array<boolean>>): void {
  for (let i = 0; i < labyrinthe.length; i++) {
    let chaine = "";

    for (let j = 0; j < labyrinthe[i].length; j++)
      if (estVide(labyrinthe, i, j)) chaine += " ";
      else chaine += "#";
    console.log(chaine);
  }
}

function randint(inf: number, sup: number): number {
  return Math.floor(Math.random() * (sup - inf + 1) + inf);
}

function placeIlot(labyrinthe: Array<Array<boolean>>, nbreIlot: number): void {
  for (let i = 0; i < nbreIlot; i++) {
    let x = randint(1, labyrinthe.length - 2);
    let y = randint(1, labyrinthe[0].length - 2);
    labyrinthe[x][y] = false;
  }
}

function estConstructibleCas1(labyrinthe: Array<Array<boolean>>, i: number, j: number): boolean {
  return (
    estVide(labyrinthe, i - 1, j - 1) &&
    estVide(labyrinthe, i - 1, j) &&
    estVide(labyrinthe, i, j - 1) &&
    estMur(labyrinthe, i, j + 1) &&
    estVide(labyrinthe, i + 1, j - 1) &&
    estVide(labyrinthe, i + 1, j)
  );
}

function estConstructibleCas2(labyrinthe: Array<Array<boolean>>, i: number, j: number): boolean {
  return (
    estMur(labyrinthe, i - 1, j) &&
    estVide(labyrinthe, i, j - 1) &&
    estVide(labyrinthe, i, j + 1) &&
    estVide(labyrinthe, i + 1, j - 1) &&
    estVide(labyrinthe, i + 1, j) &&
    estVide(labyrinthe, i + 1, j + 1)
  );
}

function estConstructibleCas3(labyrinthe: Array<Array<boolean>>, i: number, j: number): boolean {
  return (
    estVide(labyrinthe, i - 1, j) &&
    estVide(labyrinthe, i - 1, j + 1) &&
    estMur(labyrinthe, i, j - 1) &&
    estVide(labyrinthe, i, j + 1) &&
    estVide(labyrinthe, i + 1, j) &&
    estVide(labyrinthe, i + 1, j + 1)
  );
}

function estConstructibleCas4(labyrinthe: Array<Array<boolean>>, i: number, j: number): boolean {
  return (
    estVide(labyrinthe, i - 1, j - 1) &&
    estVide(labyrinthe, i - 1, j) &&
    estVide(labyrinthe, i - 1, j + 1) &&
    estVide(labyrinthe, i, j - 1) &&
    estVide(labyrinthe, i, j + 1) &&
    estMur(labyrinthe, i + 1, j)
  );
}

function estConstructible(labyrinthe: Array<Array<boolean>>, i: number, j: number): boolean {
  return (
    !estMur(labyrinthe, i, j) &&
    (estConstructibleCas1(labyrinthe, i, j) ||
      estConstructibleCas2(labyrinthe, i, j) ||
      estConstructibleCas3(labyrinthe, i, j) ||
      estConstructibleCas4(labyrinthe, i, j))
  );
}

function casesConstructibles(labyrinthe: Array<Array<boolean>>): Array<[number, number]> {
  let res = new Array<[number, number]>();

  for (let i = 0; i < labyrinthe.length; ++i)
    for (let j = 0; j < labyrinthe[i].length; ++j)
      if (estConstructible(labyrinthe, i, j)) res.push([i, j]);

  return res;
}

function générerLabyrinthe(
  nbreLignes: number,
  nbreColonnes: number,
  nbreIlots: number
): Array<Array<boolean>> {
  let labyrinthe = init(nbreLignes, nbreColonnes);

  placeIlot(labyrinthe, nbreIlots);

  let casesPossibles = casesConstructibles(labyrinthe);

  while (casesPossibles.length > 0) {
    // On choisit une case
    let pos = randint(0, casesPossibles.length - 1);

    // On construit le mur
    labyrinthe[casesPossibles[pos][0]][casesPossibles[pos][1]] = false;

    // On retire les cases qui ne sont plus constructibles
    // Remarque : on pourrait être plus efficaces
    casesPossibles = casesConstructibles(labyrinthe);
  }

  return labyrinthe;
}

function main(): void {
  let labyrinthe = générerLabyrinthe(12, 50, 15);

  affichage(labyrinthe);
}

main();
