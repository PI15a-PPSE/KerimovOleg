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
        /**
     * Returns a Territory object for the territory which "point" is a part of.
     *
     * A typical call passes only "point".
     */
    this.getTerritory = function(point, territory) {
        // TODO: make this work when board is empty
        
        var pState = gGameState.getPointStateAt(point);
        
        // Skip non-empty points
        if (pState != Constants.PointState.EMPTY) {
            return new Territory(this.getChainPoints(point), pState);
        }
        
        var isRoot = false;
        if (!territory) {
            // If territory is null, make a new one
            territory = new Territory();
            // Mark instance as root of call tree
            isRoot = true;
        }
        
        // Add the current point to the territory
        territory.points.push(point);
        
        // Check for rest of territory in every direction
        for (var i = 0; i < Constants.Direction.ALL.length; i++) {
            var side = Constants.Direction.ALL[i];
            var nPoint = point.getNeighborAt(side);
            
            // Check for territory at neighboring point (nPoint)
            if (this.isPointInBounds(nPoint)) {
                var nState = gGameState.getPointStateAt(nPoint);
                
                if (nState == Constants.PointState.EMPTY) {
                    // Empty. Add that piece's territory to this territory.
                    if (!nPoint.isInArray(territory.points)) {
                        // TODO: find out why this works
                        this.getTerritory(nPoint, territory);
                    }
                }
                else if (territory.owner != Constants.TerritoryOwner.NEUTRAL) {
                    if (territory.owner == Constants.TerritoryOwner.UNKNOWN) {  
                        territory.owner = nState;
                    }
                    else if (territory.owner != nState) {
                        territory.owner = Constants.TerritoryOwner.NEUTRAL;
                    }
                }                   
            }
        }
        
        // If we are done making calls, and back at the root of the call tree,
        // ensure we're passing back a real territory owner (neutral).
        if (isRoot && territory.owner == Constants.TerritoryOwner.UNKNOWN) {
            territory.owner = Constants.TerritoryOwner.NEUTRAL;
        }
        
        return territory;
    };
}; // end Ish.Go.Logic namespace