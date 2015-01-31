var elo = function() {

    /**
     * Current K factor used to weigh all Elo score changes. 
     * See http://en.wikipedia.org/wiki/Elo_rating_system#Most_accurate_K-factor
     * for more information.
     */
    this.k = 32;

    // Holds inverse of returned values to prepare for any possible next() calls.
    var next = null;

    /**
     * expected() returns a percentage int for w's win expectency.
     *
     * @param (int): The current Elo rating of the first player.
     * @param (int): The current Elo rating of the second player. 
     * @return (int): The win expectency (0-1) for player w.
     */
    this.expected = function(w,l) {
        next = 1/(1 + Math.pow( 10, ( w - l ) / 400 ) );
        var expectedValue = 1/(1 + Math.pow( 10, ( l - w ) / 400 ) );
        return expectedValue;
    }

    /**
     * next() returns the inverse of any previously called function.
     *
     * @return (int)
     */
    this.next = function() {
        return next;
    }

    /**
     * newRating() returns an updated rating for player w.
     * next is also populated with the new rating for player l.
     *
     * @param (int): The current Elo rating of the first player.
     * @param (int): The current Elo rating of the second player.
     * @param (int): The results of the match where s = 1 is a win, s = 0.5 is a draw, and s = 0 is a loss for player w.
     * @return (int): The new rating for player w. 
     */
    this.newRating = function(w,l,s) {
        var expectation = this.expected(w,l),
            change = this.k * ( s - expectation );
        next = l + this.k * ( (1 - s) - this.expected(l,w) );
        return w + change;
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

module.exports = elo;
