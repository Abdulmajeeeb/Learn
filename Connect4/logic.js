// const table = [
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
// ];
let ROWS = 6;
let COLS = 7;
let WIN = 4;
let table = [];
for (let i = 0; i < ROWS; i++) {
    table.push([]);
    for (let j = 0; j < COLS; j++) {
        table[i].push(".")
    }
}


function updateTable(col, value) {
    for (let i = ROWS - 1; i > -1; i--) {
        if (table[i][col] === ".") {
            table[i][col] = value;
            return true;
        }
    }
    return false;
};


function gameEnd() {
    //for rows
    for (let i = 0; i < ROWS; i++) {
        let rowString = table[i].join("");
        let win = rowString.match(/🟢🟢🟢🟢/);
        let lose = rowString.match(/🔴🔴🔴🔴/);
        if (win) {
            return true;
        }
        if (lose) {
            return true;
        }
    }
    //for columns
    for (let i = 0; i < COLS; i++) {
        let columnString = "";
        for (let j = 0; j < ROWS; j++) {
            columnString += table[j][i]
        }
        let win = columnString.match(/🟢🟢🟢🟢/);
        let lose = columnString.match(/🔴🔴🔴🔴/);
        if (win) {
            return true;
        }
        if (lose) {
            return true;
        }
    }
    //for diagonal
    for (i = 0; i < ROWS - (WIN - 1); i++) {
        for (j = 0; j < COLS - (WIN - 1); j++) {
            let diagonalString = "";
            for (k = 0; k < WIN; k++) {
                diagonalString += table[i + k][j + k];
            }
            let win = diagonalString.match(/🟢🟢🟢🟢/);
            let lose = diagonalString.match(/🔴🔴🔴🔴/);
            if (win) {
                return true;
            }
            if (lose) {
                return true;
            }
        }
    }
    //for adiagonal
    for (i = 0; i < ROWS - (WIN - 1); i++) {
        for (j = 3; j < COLS; j++) {
            let aDiagonalString = "";
            for (k = 0; k < WIN; k++) {
                aDiagonalString += table[i + k][j - k];
            }
            let win = aDiagonalString.match(/🟢🟢🟢🟢/);
            let lose = aDiagonalString.match(/🔴🔴🔴🔴/);
            if (win) {
                return true;
            }
            if (lose) {
                return true;
            }
        }
    }
    return false;
};

function resetTable(){
    for(i=0;i<ROWS;i++){
        for(j=0; j<COLS; j++){
            table[i][j]=".";
        }
    }
}

module.exports = {
    updateTable,
    table,
    gameEnd,
    ROWS,
    COLS,
    resetTable
}
