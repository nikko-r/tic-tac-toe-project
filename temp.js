//Game should always start with an empty grid
//First go should always be x
//player 1 and player 2 should always take in turn to be x or o
//When a box is selected it should
//1. check if the box is empty. If its not stop the user and send alert
//2. if it is then it should run a matchLine function

//matchLine function should check for all matching lines and return them

let gridArr = ["x", "x", "o", "x", "o", "", "o", "x", "x"];
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
    if (gridArr[0] == gridArr[1] && gridArr[1] == gridArr[2]) {
        matchLineArr[0] = gridArr[0]; //add top line winning char to top line position
    }
    if (gridArr[3] == gridArr[4] && gridArr[4] == gridArr[5]) {
        matchLineArr[1] = gridArr[3];
    }
    if (gridArr[6] == gridArr[7] && gridArr[7] == gridArr[8]) {
        matchLineArr[2] = gridArr[6];
    }
    if (gridArr[0] == gridArr[3] && gridArr[3] == gridArr[6]) {
        matchLineArr[3] = gridArr[0];
    }
    if (gridArr[1] == gridArr[4] && gridArr[4] == gridArr[7]) {
        matchLineArr[4] = gridArr[1];
    }
    if (gridArr[2] == gridArr[5] && gridArr[5] == gridArr[8]) {
        matchLineArr[5] = gridArr[2];
    }
    if (gridArr[0] == gridArr[4] && gridArr[4] == gridArr[8]) {
        matchLineArr[6] = gridArr[0];
    }
    if (gridArr[6] == gridArr[4] && gridArr[4] == gridArr[2]) {
        matchLineArr[7] = gridArr[6];
    }
    return matchLineArr;
};

const fnDrawWinLines = () => {
    const lineArr = fnGetMatchingLines();
};

const fnCheckWin = () => {
    //there can only be 1 winner so there will never be an o and x line
    //at the same time
    if (fnGetMatchingLines().includes("x")) {
        return "x";
    } else {
        return "o";
    }
};

console.log(`${fnCheckWin()} Won The Game`);