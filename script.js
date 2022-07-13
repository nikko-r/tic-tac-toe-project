const root = document.querySelector(":root"); //Used for css variables
const bDarkLightMode = document.querySelector(".buttons__item--2"); //darkmode button
const bGameGrid = document.querySelectorAll(".grid__box"); //darkmode button

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
let gameTurn = "x";
let isGameInProgress = true;

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

const fnGetMatchingLines = () => {
    let matchLineArr = ["", "", "", "", "", "", "", ""];
    //The reason why im not returning or using if else or switch case
    //is because there can be more than 1 winning line in tic tac toe
    if (gameGridArr[0] == gameGridArr[1] && gameGridArr[1] == gameGridArr[2]) {
        matchLineArr[0] = gameGridArr[0]; //add top line winning char to top line position
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

bGameGrid.forEach((box) => {
    //for each element in the class
    console.dir(box); //send the element info in console
    box.addEventListener("click", (event) => {
        if (isGameInProgress == true) {
            if (event.target.innerText == "") {
                //
                gameGridArr[event.target.id] = gameTurn;
                //
                if (gameTurn == "x") {
                    event.target.innerText = "X";
                    gameTurn = "o";
                } else if (gameTurn == "o") {
                    event.target.innerText = "O";
                    gameTurn = "x";
                }
            }

            if (fnCheckWin() == "o" || fnCheckWin() == "x") {
                isGameInProgress = false;
                console.log(`${fnCheckWin()} Won the game`);

                setTimeout(() => alert(`${fnCheckWin()} Won the game`), 100);
            } else {
                if (!gameGridArr.includes("")) {
                    isGameInProgress = false;
                    console.log(`DRAW!`);

                    setTimeout(() => alert(`DRAW`), 100);
                }
            }
        }
    });
});

//const fnComputerAsPlayer
//localStorage.setItem("pageLoadCount", 1);
//console.log(localStorage.getItem("pageLoadCount"));