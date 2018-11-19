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