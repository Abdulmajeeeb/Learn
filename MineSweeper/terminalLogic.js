let rows=9;
let cols=9;
let board=[];
let percentBomb=20;

for (let i=0; i<rows; i++){
    board.push([]);
    for (let j=0; j<cols; j++){
        board[i].push("");
    }
};

console.table(board);
let numberBomb= Number(Math.floor((percentBomb*rows*cols)/100));
for (let i=0; i<numberBomb; i++){
    let compRow=Number(Math.floor(Math.random()*rows));
    let compCol=Number(Math.floor(Math.random()*cols));
    if (board[compRow][compCol]!==""){
        i--;
    continue;
    } else{
        board[compRow][compCol]="x";
    }
}
console.table(board);
console.log(numberBomb);