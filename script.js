const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
// Création des symboles pour chaque joueur.
const playerOne = 'X'; const playerTwo = 'O';
// Initialisation du jeu sur le tour du joueur 1.
let playerTurn = playerOne;

// Combinaisons de victoires possibles sur la grille du morpion (par rapport aux cellules).
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// Ajout d'un évenement 'click' pour afficher 'X' ou 'O' dans la grille du jeu.
cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});


function playGame(e) {
    e.target.innerHTML = playerTurn;

    if(checkWin(playerTurn)) {
        updateGameStatus("wins" + playerTurn);
        return endGame();
    } else if (checkDraw()) {
        updateGameStatus("draw");
        return endGame();
    }

    updateGameStatus(playerTurn);
    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
};

// Test sur chaque combinaison et sur chaque index.
function checkWin(playerTurn) {
    // On prend chaque pattern et les on teste tous. On vérifie ensuite si chaque pattern est égal au symbole du player.
    return winningPatterns.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML == playerTurn;
        });
    });
};

// "[...cells]" transforme toutes les cells (div) en un tableau.
function checkDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
    });
};

function updateGameStatus(status) {
    let statusText;

    switch (status) {
        case 'X':
            statusText = "Au tour du joueur 2 (O)";
            break;
        case 'O':
            statusText = "Au tour du joueur 1 (X)";
            break;
        case 'winsX':
            statusText = "Le joueur 1 (X) à gagné";
            break;
        case 'winsO':
            statusText = "Le joueur 2 (O) à gagné";
            break;
        case 'draw':
            statusText = "Egalité ! Personne ne gagne";
            break;
    }
    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}

function endGame() {
    document.getElementById('gameEnd').style.display = "block";
};

function reloadGame() {
    window.location.reload();
};