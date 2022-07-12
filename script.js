const root = document.querySelector(":root"); //Used for css variables
const bDarkLightMode = document.querySelector(".buttons__item--2"); //darkmode button
const bGameGrid = document.querySelectorAll(".grid__box"); //darkmode button

//DARK MODE / LIGHT MODE

let colorMode = "dark";
const fnDarkLightMode = () => {
    if (colorMode == "dark") {
        root.style.setProperty("--color-1", "#f1f1f1");
        root.style.setProperty("--color-2", "#272727");
        colorMode = "light";
        bDarkLightMode.innerText = "DARK MODE";
        console.log("Light mode enabled");
    } else if (colorMode == "light") {
        root.style.setProperty("--color-2", "#f1f1f1");
        root.style.setProperty("--color-1", "#272727");
        colorMode = "dark";
        bDarkLightMode.innerText = "LIGHT MODE";
        console.log("Dark mode enabled");
    }
};

bDarkLightMode.addEventListener("click", fnDarkLightMode);

// //////////////

//Game should always start with an empty grid
//First go should always be x
//player 1 and player 2 should always take in turn to be x or o
//When a box is selected it should
//1. check if the box is empty. If its not stop the user and send alert
//2. if it is then it should run a matchLine function

//matchLine function should check for all matching lines and return them

let gameGridArr = ["", "", "", "", "", "", "", "", ""];
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
    return matchLineArr;
};

// const fnDrawWinLines = () => {
//     const lineArr = fnGetMatchingLines();
// };

const fnCheckWin = () => {
    //there can only be 1 winner so there will never be an o and x line
    //at the same time
    if (fnGetMatchingLines().includes("x")) {
        return "x";
    } else if (fnGetMatchingLines().includes("o")) {
        return "o";
    } else {
        return "no one";
    }
};

console.log(`${fnCheckWin()} Won The Game`);

// bGrid.forEach((box) {
//     box.addEventListener("click", handlePlaceXO)

// })

// bGameGrid.forEach((operatorButton) => { //for each element in the class
//             //console.dir(operatorButton) //send the element info in console
//             operatorButton.addEventListener("click", (event) => {
//                         if (containsNumber(inputScreen.value) == false) {
//                             return alert("There is no number to work with!")
//                         }