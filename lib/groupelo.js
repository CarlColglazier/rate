var elo = require("./elo.js");

var groupElo = function() {

    /**
     * Current K factor used to weigh all Elo score changes. 
     * See http://en.wikipedia.org/wiki/Elo_rating_system#Most_accurate_K-factor
     * for more information.
     */
    this.k = 32,
    this.weighted = true;
    
    // Holds inverse of returned values to prepare for any possible next() calls.
    var next = null;
    
    /**
     * next() returns the inverse of any previously called function.
     *
     * @return (int)
     */
    this.next = function() {
        return next;
    }
    
    // Return the size of an object.
    function getSize(obj) {
        var size = 0,
            key;
        for (x in obj) {
            if (obj.hasOwnProperty(x)) size++;
        }
        return size;
    };
    
    /**
     * flatten() returns the average Elo scores for two objects.
     * 
     * @param (object)
     * @param (object)
     * @return (array)
     */
    function flatten(obj1,obj2) {
        var len1 = getSize(obj1),
            len2 = getSize(obj2),
            value1 = 0,
            value2 = 0,
            results = [];
        for (x in obj1) {
            value1 += obj1[x];
        }
        for (x in obj2) {
            value2 += obj2[x];
        }
        results.push(value1/len1);
        results.push(value2/len2);
        return results;
    }
    
    /**
     * expected() returns a percentage int for w's win expectency.
     *
     * @param (obj): The current Elo rating of the first player.
     * @param (obj): The current Elo rating of the second player. 
     * @return (int): The win expectency (0-1) for player w.
     */
    this.expected = function(obj1,obj2) {
        var flattened = flatten(obj1,obj2),
            w = flattened[0],
            l = flattened[1];
        next = 1/(1 + Math.pow( 10, ( w - l ) / 400 ) );
        var expectedValue = 1/(1 + Math.pow( 10, ( l - w ) / 400 ) );
        return expectedValue;
    }
    
    /**
     * newRating() returns an updated rating for player w.
     * next is also populated with the new rating for player l.
     *
     * @param (obj): The current Elo rating of the first player.
     * @param (obj): The current Elo rating of the second player.
     * @param (int): The results of the match where s = 1 is a win, s = 0.5 is a draw, and s = 0 is a loss for player w.
     * @return (obj): The new rating for player w. 
     */
    this.newRating = function(obj1,obj2,s) {
        var expectation = this.expected(obj1,obj2),
            change = this.k * ( s - expectation ),
            flattened = flatten(obj1,obj2),
            w = flattened[0],
            l = flattened[1],
            wlen = getSize(obj1),
            llen = getSize(obj2),
            results = {};
        if (this.weighted) {
            for (x in obj1) {
                results[x] = obj1[x] + change / ( wlen * ( obj1[x] / w ) );
            }
            for (x in obj2) {
                results[x] = obj2[x] - change / ( llen * ( obj2[x] / l ) );
            }
        } else {
            for (x in obj1) {
                results[x] = obj1[x] + change / wlen ;
            }
            for (x in obj2) {
                results[x] = obj2[x] - change / llen;
            }
        }
        next = results;
        return results;
    }
    
    // Calls a newRating(w,l,s) where player w is the winner.
    this.rateWin = function (w,l) {
        return this.newRating(w,l,1);
    }

    // Calls a newRating(w,l,s) where players w and l drew.
    this.rateLoss = function (w,l) {
        return this.newRating(w,l,0);
    }

    // Calls a newRating(w,l,s) where player w is the loser.
    this.rateDraw = function (w,l) {
        return this.newRating(w,l,0.5);
    }
}

module.exports = groupElo;