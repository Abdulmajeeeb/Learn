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
let wIN = 4;
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


function winner() {
    //for rows
    for (let i = 0; i < ROWS; i++) {
        let rowString = table[i].join("");
        let win = rowString.match(/gggg/);
        let lose = rowString.match(/rrrr/);
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
        let win = columnString.match(/gggg/);
        let lose = columnString.match(/rrrr/);
        if (win) {
            return true;
        }
        if (lose) {
            return true;
        }
    }
    //for diagonal
    //for adiagonal
    return false;
};


module.exports = {
    updateTable,
    table,
    winner
}
