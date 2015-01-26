var elo = function() {

    this.k = 32;
    var next = null;

    this.expected = function(w,l) {
        next = 1/(1 + Math.pow( 10, ( w - l ) / 400 ) );
        var expectedValue = 1/(1 + Math.pow( 10, ( l - w ) / 400 ) );
        return expectedValue;
    }

    this.next = function() {
        return next;
    }

    this.newRating = function(w,l,s) {
        var expectation = this.expected(w,l),
            change = this.k * ( s - expectation );
        next = l + this.k * ( (1 - s) - this.expected(l,w) );
        return w + change;
    }

    this.rateWin = function (w,l) {
        return this.newRating(w,l,1);
    }

    this.rateLoss = function (w,l) {
        return this.newRating(w,l,0);
    }

    this.rateDraw = function (w,l) {
        return this.newRating(w,l,0.5);
    }
}

module.exports = elo;