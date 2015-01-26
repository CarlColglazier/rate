var rate = require('../');

var elo = new rate.elo();

console.log("EXPECTED : "+elo.expected(1000,500));
console.log("NEXT : "+elo.next());
console.log("WIN : "+elo.rateWin(1000,500));
console.log("NEXT : "+elo.next());
console.log("LOSS : "+elo.rateLoss(500,1000));
console.log("NEXT : "+elo.next());
console.log("DRAW : "+elo.rateDraw(1000,500));
console.log("NEXT : "+elo.next());