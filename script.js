const root = document.querySelector(":root"); //Used for css variables
const htmlBody = document.querySelector("body");
const bDarkLightMode = document.querySelector(".buttons__item--2"); //darkmode button
const bNewGame = document.querySelector(".buttons__item--1"); //newgame button
const gameGrid = document.querySelectorAll(".grid__box"); //darkmode button
const gameTitle = document.querySelector(".game-title"); //darkmode button

//DARK MODE / LIGHT MODE
let colorMode = localStorage.getItem("colorMode"); //Get stored seting
if (!colorMode) {
    colorMode = "dark"; //if value is not set, set default setting to dark
    localStorage.setItem("colorMode", colorMode); //Store data
}
//function for setting colour
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
fnSetColorMode(colorMode); //on page load set colour
//function for switching LIGHT/DARK mode
const fnDarkLightMode = () => {
    if (colorMode == "dark") {
        fnSetColorMode("light");
        colorMode = "light";
    } else if (colorMode == "light") {
        fnSetColorMode("dark");
        colorMode = "dark";
    }
    localStorage.setItem("colorMode", colorMode);
};
//event listener for LIGHT/DARK mode button
bDarkLightMode.addEventListener("click", fnDarkLightMode);
// //////////////

const fnNewGame = () => {
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

//Game should always start with an empty grid
//First go should always be x
//player 1 and player 2 should always take in turn to be x or o
//When a box is selected it should
//1. check if the box is empty. If its not stop the user and send alert
//2. if it is then it should run a checkWIn function

//checkWin function should check a few things like calling the
//getMatchingLines then calculating who won from those matching lines
//getMatchingLines function should check for all matching lines and return them
let gameGridArr = ["", "", "", "", "", "", "", "", ""];
let gameGridCoordsArr = [];
let gameTurn = "x";
let isGameInProgress = false;

//NEW GAME
// let fnNewGame = () => {

// };
// fnNewGame();

//[0],[1],[2]
//[3],[4],[5]
//[6],[7],[8]

//let matchLineArr = ["", "", "", "", "", "", "", ""];
//matchLineArr
//[6]           [7]
//   [ ],[ ],[ ] - [0]
//   [ ],[ ],[ ] - [1]
//   [ ],[ ],[ ] - [2]
//    |   |   |
//   [3],[4],[5]

//[0] is the top horizontal line
//[1] is the middle horizontal line
//[2] is the bottom horizontal line
//[3] is the left verticle line
//[4] is the middle verticle line
//[5] is the right verticle line
//[6] is the left to right diagonal line
//[7] is the right to left diagonal line
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
    //The reason why im not returning or using if else or switch case
    //is because there can be more than 1 winning line in tic tac toe
    if (gameGridArr[0] == gameGridArr[1] && gameGridArr[1] == gameGridArr[2]) {
        matchLineArr[0] = gameGridArr[0]; //add top line winning char to top line position
        //this matches the top line
        //we need to draw a horizontal line at the top
        //we need to get the coords from the array and draw line
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
    fnDrawLine(matchLineArr);
    return matchLineArr;
};

// const fnDrawWinLines = () => {
//     const lineArr = fnGetMatchingLines();
// };

//there can only be 1 winner so there will never be an o and x line
//at the same time
const fnCheckWin = () => {
    if (fnGetMatchingLines().includes("x")) {
        return "x";
    } else if (fnGetMatchingLines().includes("o")) {
        return "o";
    }
};

//console.log(`${fnCheckWin()} Won The Game`);

// bGrid.forEach((box) {
//     box.addEventListener("click", handlePlaceXO)

// })

gameGrid.forEach((box) => {
    //for each element in the class
    console.dir(box); //send the element info in console

    //Gets the center coordinates of every box
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
                isGameInProgress = false;
                console.log(`${fnCheckWin()} Won the game`);
                bNewGame.innerText = "NEW GAME";
                setTimeout(() => alert(`${fnCheckWin()} Won the game`), 100);
                gameTitle.innerText = `${fnCheckWin().toUpperCase()} WON THE GAME`;
            } else {
                if (!gameGridArr.includes("")) {
                    isGameInProgress = false;
                    console.log(`DRAW!`);
                    bNewGame.innerText = "NEW GAME";
                    setTimeout(() => alert(`DRAW`), 100);
                    gameTitle.innerText = `DRAW!`;
                }
            }
        }
    });
});

//const fnComputerAsPlayer
//localStorage.setItem("pageLoadCount", 1);
//console.log(localStorage.getItem("pageLoadCount"));