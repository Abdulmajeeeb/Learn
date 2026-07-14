const table = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
];

function updateTable(col, value) {
    for (let i = 5; i > -1; i--) {
        if (table[i][col] === "") {
            table[i][col] = value;
            return true;
        }
    }
    return false;
};


function winner() {
    //for rows
    for (let i = 0; i < 6; i++) {
        let row = table[i].join("");
        let win = row.match(/gggg/);
        if (win) {
            return true;
        }
    }
    //for columns
    //for diagonal
    //for adiagonal
    return false;
};


module.exports = {
updateTable,
table
}
