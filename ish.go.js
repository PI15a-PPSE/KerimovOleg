window.onload = function() {    
    Ish.Go.View.init();
}

var gGameState;

var Constants = new function() {
    this.Color = {
        BLACK : "black",
        WHITE : "white"
    };
    this.Direction = {
        NORTH : "north",
        EAST : "east",
        SOUTH : "south",
        WEST : "west",
        ALL : ["north", "east", "south", "west"]
    };
    this.PointState = {
        EMPTY : ".",
        BLACK : "X",
        WHITE : "O"
    };
    this.MoveError = {
        REPEAT : "The attempted move would result in a repeated board state.",
        OCCUPIED : "The selected intersection is occupied.",
        SUICIDE : "The attepted move would result in a suicide."
    };
    this.TerritoryOwner = {
        UNKNOWN : this.PointState.EMPTY,
        NEUTRAL : "-",
        BLACK : this.PointState.BLACK,
        WHITE : this.PointState.WHITE
    };
    this.GameStatus = {
        ACTIVE : "active",
        IDLE : "idle",
        ENDED : "ended"
    };
};

/**
 * OBJ: Defines changed points after a move is made.
 */
function MoveResult(player, newPoint, capturedPoints) {
    this.player = player;
    this.newPoint = newPoint;
    this.capturedPoints = capturedPoints;
}

/**
 * OBJ: Defines common attributes for board points/intersections.
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
    this.getNeighborAt = function(side) {
        switch (side) {
            case Constants.Direction.NORTH:
                return new Point(this.row-1, this.column);
            case Constants.Direction.SOUTH:
                return new Point(this.row+1, this.column);
            case Constants.Direction.EAST:
                return new Point(this.row, this.column+1);
            case Constants.Direction.WEST:
                return new Point(this.row, this.column-1);
        }
    };
    this.toString = function() {
        return "(" + this.row + ", " + this.column + ")";
    };
    this.equals = function(other) {
        return (this.row == other.row &&
                this.column == other.column);
    };
    this.isInArray = function(array) {
        for (var i=0; i<array.length; i++) {
            if (this.equals(array[i])) {
                return true;
            }
        }
        return false;
    };
}
};