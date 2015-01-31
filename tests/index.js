var rate = require('../'),
    elo = new rate.elo(),
    groupElo = new rate.groupElo();

console.log("ELO TESTS");
console.log("=========");
console.log("EXPECTED : "+elo.expected(1000,500));
console.log("NEXT : "+elo.next());
console.log("WIN : "+elo.rateWin(1000,500));
console.log("NEXT : "+elo.next());
console.log("LOSS : "+elo.rateLoss(500,1000));
console.log("NEXT : "+elo.next());
console.log("DRAW : "+elo.rateDraw(1000,500));
console.log("NEXT : "+elo.next());

var group1 = { 
        "red" : 1000,
        "green" : 100,
        "blue": 2000
    },
    group2 = {
        "yellow": 300,
        "purple": 1000,
        "orange": 1500
    };

console.log("\n\nGROUP ELO TESTS");
console.log("=========");
console.log("EXPECTED : "+groupElo.expected(group1,group2));
console.log("NEXT : "+groupElo.next());
console.log("WIN : "+JSON.stringify(groupElo.rateWin(group1,group2)));
console.log("NEXT : "+JSON.stringify(groupElo.next()));
console.log("LOSS : "+JSON.stringify(groupElo.rateLoss(group2,group1)));
console.log("NEXT : "+JSON.stringify(groupElo.next()));
console.log("DRAW : "+JSON.stringify(groupElo.rateDraw(group1,group2)));
console.log("NEXT : "+JSON.stringify(groupElo.next()));