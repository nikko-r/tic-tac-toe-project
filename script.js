const root = document.querySelector(":root");
const htmlBody = document.querySelector("body");
const bDarkLightMode = document.querySelector(".buttons__item--2");
const bNewGame = document.querySelector(".buttons__item--1");
const gameGrid = document.querySelectorAll(".grid__box");
const gameTitle = document.querySelector(".game-title");
const svgWinLine = document.querySelector(".svg-win-line");

let colorMode = localStorage.getItem("colorMode");
if (!colorMode) {
    colorMode = "dark";
    localStorage.setItem("colorMode", colorMode);
}
const fnSetColorMode = (color) => {
    if (color == "light") {
        bDarkLightMode.innerText = "DARK MODE";
        root.style.setProperty("--color-1", "#f1f1f1");
        root.style.setProperty("--color-2", "#272727");
    } else if (color == "dark") {
        bDarkLightMode.innerText = "LIGHT MODE";
        root.style.setProperty("--color-2", "#f1f1f1");
        root.style.setProperty("--color-1", "#272727");
    }
};
fnSetColorMode(colorMode);

const fnDarkLightMode = () => {
    console.log("darkmode button");
    if (colorMode == "dark") {
        fnSetColorMode("light");
        colorMode = "light";
    } else if (colorMode == "light") {
        fnSetColorMode("dark");
        colorMode = "dark";
    }
    localStorage.setItem("colorMode", colorMode);
};
bDarkLightMode.addEventListener("click", fnDarkLightMode);

const fnNewGame = () => {
    console.log("true");
    gameGridArr = ["", "", "", "", "", "", "", "", ""];
    gameGrid.forEach((box) => {
        box.innerText = "";
    });
    gameTurn = "x";
    bNewGame.innerText = "RESET GAME";
    isGameInProgress = true;
    gameTitle.innerText = "X's TURN";
};

bNewGame.addEventListener("click", fnNewGame);

let gameGridArr = ["", "", "", "", "", "", "", "", ""];
let gameGridCoordsArr = [];
let gameTurn = "x";
let isGameInProgress = false;

const fnDrawLine = (LineArr) => {
    let coordArr;
    for (let i = 0; i < 8; i++) {
        if (LineArr[i] !== "") {
            switch (i) {
                case 0:
                    coordArr = [
                        gameGridCoordsArr[0][0],
                        gameGridCoordsArr[0][1],
                        gameGridCoordsArr[2][0],
                        gameGridCoordsArr[2][1],
                    ];
                    break;
                case 1:
                    coordArr = [
                        gameGridCoordsArr[3][0],
                        gameGridCoordsArr[3][1],
                        gameGridCoordsArr[5][0],
                        gameGridCoordsArr[5][1],
                    ];
                    break;
                case 2:
                    coordArr = [
                        gameGridCoordsArr[6][0],
                        gameGridCoordsArr[6][1],
                        gameGridCoordsArr[8][0],
                        gameGridCoordsArr[8][1],
                    ];
                    break;
                case 3:
                    coordArr = [
                        gameGridCoordsArr[0][0],
                        gameGridCoordsArr[0][1],
                        gameGridCoordsArr[6][0],
                        gameGridCoordsArr[6][1],
                    ];
                    break;
                case 4:
                    coordArr = [
                        gameGridCoordsArr[1][0],
                        gameGridCoordsArr[1][1],
                        gameGridCoordsArr[7][0],
                        gameGridCoordsArr[7][1],
                    ];
                    break;
                case 5:
                    coordArr = [
                        gameGridCoordsArr[2][0],
                        gameGridCoordsArr[2][1],
                        gameGridCoordsArr[8][0],
                        gameGridCoordsArr[8][1],
                    ];
                    break;
                case 6:
                    coordArr = [
                        gameGridCoordsArr[0][0],
                        gameGridCoordsArr[0][1],
                        gameGridCoordsArr[8][0],
                        gameGridCoordsArr[8][1],
                    ];
                    break;
                case 7:
                    coordArr = [
                        gameGridCoordsArr[2][0],
                        gameGridCoordsArr[2][1],
                        gameGridCoordsArr[6][0],
                        gameGridCoordsArr[6][1],
                    ];
                    break;
            }

            htmlBody.innerHTML += `<svg height="210" width="500" class="svg-win-line">
            <line x1="${coordArr[0]}" y1="${coordArr[1]}" x2="${coordArr[2]}" y2="${coordArr[3]}"/>
          </svg>`;
        }
    }
};

const fnGetMatchingLines = () => {
    const matchLineArr = ["", "", "", "", "", "", "", ""];
    if (gameGridArr[0] == gameGridArr[1] && gameGridArr[1] == gameGridArr[2]) {
        matchLineArr[0] = gameGridArr[0];
    }
    if (gameGridArr[3] == gameGridArr[4] && gameGridArr[4] == gameGridArr[5]) {
        matchLineArr[1] = gameGridArr[3];
    }
    if (gameGridArr[6] == gameGridArr[7] && gameGridArr[7] == gameGridArr[8]) {
        matchLineArr[2] = gameGridArr[6];
    }
    if (gameGridArr[0] == gameGridArr[3] && gameGridArr[3] == gameGridArr[6]) {
        matchLineArr[3] = gameGridArr[0];
    }
    if (gameGridArr[1] == gameGridArr[4] && gameGridArr[4] == gameGridArr[7]) {
        matchLineArr[4] = gameGridArr[1];
    }
    if (gameGridArr[2] == gameGridArr[5] && gameGridArr[5] == gameGridArr[8]) {
        matchLineArr[5] = gameGridArr[2];
    }
    if (gameGridArr[0] == gameGridArr[4] && gameGridArr[4] == gameGridArr[8]) {
        matchLineArr[6] = gameGridArr[0];
    }
    if (gameGridArr[6] == gameGridArr[4] && gameGridArr[4] == gameGridArr[2]) {
        matchLineArr[7] = gameGridArr[6];
    }
    console.log(matchLineArr);
    //setTimeout(() => fnDrawLine(matchLineArr), 100); //This is an experimental feature uncomment this for winning line. This will break buttons though
    return matchLineArr;
};

const fnCheckWin = () => {
    if (fnGetMatchingLines().includes("x")) {
        return "x";
    } else if (fnGetMatchingLines().includes("o")) {
        return "o";
    }
};

gameGrid.forEach((box) => {
    const xcoord =
        box.getBoundingClientRect().x + box.getBoundingClientRect().width / 2;
    const ycoord =
        box.getBoundingClientRect().y + box.getBoundingClientRect().height / 2;

    gameGridCoordsArr.push([xcoord, ycoord]);
    console.log(gameGridCoordsArr);

    box.addEventListener("click", (event) => {
        if (isGameInProgress == false) {
            alert("CLICK NEW GAME TO START A GAME!");
        } else if (isGameInProgress == true) {
            if (event.target.innerText == "") {
                //
                gameGridArr[event.target.id] = gameTurn;
                //
                if (gameTurn == "x") {
                    event.target.innerText = "X";
                    gameTurn = "o";
                    gameTitle.innerText = "O's TURN";
                } else if (gameTurn == "o") {
                    event.target.innerText = "O";
                    gameTurn = "x";
                    gameTitle.innerText = "X's TURN";
                }
            }

            if (fnCheckWin() == "o" || fnCheckWin() == "x") {
                console.log(bNewGame);
                isGameInProgress = false;
                console.log(`${fnCheckWin()} Won the game`);
                bNewGame.innerText = "NEW GAME";
                gameTitle.innerText = `${fnCheckWin().toUpperCase()} WON THE GAME`;
                console.log(bNewGame);
            } else {
                if (!gameGridArr.includes("")) {
                    isGameInProgress = false;
                    console.log(`DRAW!`);
                    setTimeout(() => alert(`DRAW`), 100);
                    gameTitle.innerText = `DRAW!`;
                }
            }
        }
    });
});