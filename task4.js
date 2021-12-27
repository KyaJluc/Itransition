var readline = require('readline');
const crypto = require('crypto');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const moves = new Array();
let i = 0;
while (i<process.argv.length-2){
    moves[i]=process.argv[i+2];
    i++;
}
if ((moves.length<3)||(moves.length%2==0)) {
    console.log("Enter an odd number of moves >=3 (for example: rock scissors paper");
    rl.close();
}
else {
    const half = (moves.length)/2;
    genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    secret = genRanHex(64);
    compMove=Math.floor(Math.random() * moves.length);
    const hash = crypto.createHmac('sha3-256', secret)
                   .update(moves[compMove])
                   .digest('hex');
    console.log("HMAC:\n",hash);
    i = 0;
    console.log("Available moves:");
    while (i<moves.length){
    console.log(i+1," - ", moves[i]);
    i++;
}
console.log("0 - exit\n? - help");

rl.question("Enter your move: ", function(answer) {
    if (answer==0) {
        console.log ("You move: exit");
        throw 'stop';
    }
    else {
    userMove=answer-1;
    console.log('Your move: ',moves[userMove]);
    console.log('Computer move: ',moves[compMove]);
    if (userMove==compMove) console.log('Draw');
    else {
    if (compMove>userMove) {
        if (compMove-userMove <= half) console.log('you win');
        else console.log('you lose');
    }
    else {
        if (userMove-compMove <= half) console.log('you lose');
        else console.log('you win');
    }
}
    rl.close();
    console.log("HMAC KEY:\n", secret);
}
});
}