const table = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
];
function updateTable(row, col, value) {
    if (table[row][col] !== "") {
        console.log("Cell Already Occupied");
        return false;
    }
    table[row][col] = [value];
    return true;
};
function getCell(m, n) {
    return table[m][n];
};
function compareCells(m1, n1, m2, n2) {
    const A = getCell(m1, n1);
    const B = getCell(m2, n2);
    if (A !== "" && B !== "" && A === B) {
        return true;
    }
};
function winner() {
    //Rows
    let row = 0;
    while (row < 6) {
        if (compareCells(row, 0, row, 1) && compareCells(row, 0, row, 2) && compareCells(row, 0, row, 3)) {
            return true;
        } else
            if (compareCells(row, 1, row, 2) && compareCells(row, 1, row, 3) && compareCells(row, 1, row, 4)) {
                return true;
            } else
                if (compareCells(row, 2, row, 3) && compareCells(row, 2, row, 4) && compareCells(row, 2, row, 5)) {
                    return true;
                } else
                    if (compareCells(row, 3, row, 4) && compareCells(row, 3, row, 5) && compareCells(row, 3, row, 6)) {
                        return true;
                    }
        row++;
    }
    //Columns
    let col = 0;
    while (col < 7) {
        if (compareCells(0, col, 1, col) && compareCells(0, col, 2, col) && compareCells(0, col, 3, col)) {
            return true;
        } else
            if (compareCells(1, col, 2, col) && compareCells(1, col, 3, col) && compareCells(1, col, 4, col)) {
                return true;
            } else
                if (compareCells(2, col, 3, col) && compareCells(2, col, 4, col) && compareCells(2, col, 5, col)) {
                    return true;
                }

        col++;
    }
    //Primary Diagonls

    //Secondary Diagonals
};


module.exports = {

}
