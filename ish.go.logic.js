// Ish.Go namespace declaration
var Ish = Ish || {};
Ish.Go = Ish.Go || {};

// begin Ish.Go.Logic namespace
Ish.Go.Logic = new function() {
    
    /**
     * Helper function which returns true or false if the given point
     * is in the bounds of the game state's board.
     */
    this.isPointInBounds = function(point) {
        return (
            point &&
            point.row < gGameState.boardHeight && point.row >= 0 &&
            point.column < gGameState.boardWidth && point.column >= 0
        );
    };
    
}; // end Ish.Go.Logic namespace