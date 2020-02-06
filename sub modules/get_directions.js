var getDirections = function(map, routeTable, target, source){
    var faceAngel = map[source][source];
    var path = [];
    var directions = [];
    var notation = {
        "n": "Go Straight",
        "ne": "Slight Right",
        "e": "Turn Right",
        "se": "Turn Around and Slight Left",
        "s": "Turn Around",
        "sw": "Turn Around and Slight Right",
        "w": "Turn Left",
        "nw": "Slight Left"
    };
    
    var getPath = function(t,s){
        if (t != s){
            getPath(routeTable[t].p, s);
            // path.push(t);
        }
        path.push(t);
    }

    getPath(target, source);

    for(var i=1; i<path.length; i++){
        var temp = map[i-1][i] - faceAngel;
        temp = temp < 0 ? 360 + temp : temp;
        faceAngel = map[i-1][i];

        if((temp >= 338 && temp < 360) || (temp >= 0 && temp < 23)){
            directions.push(notation.n)
        }
        else if(temp >= 23 && temp < 68){
            directions.push(notation.ne)
        }
        else if(temp >= 68 && temp < 113){
            directions.push(notation.e)
        }
        else if(temp >= 113 && temp <= 158){
            directions.push(notation.se)
        }
        else if(temp >= 158 && temp < 203){
            directions.push(notation.s)
        }
        else if(temp >= 203 && temp < 248){
            directions.push(notation.sw)
        }
        else if(temp >= 248 && temp < 293){
            directions.push(notation.w)
        }
        else if(temp >= 293 && temp < 338){
            directions.push(notation.nw)
        }
        else{
            console.log("Angle above 360");
        }
    }

    return {path: path, directions: directions};
}


var map = {
    "0": {"1":225},
    "1": {"0":45, "1":0, "2":270},
    "2": {"2":90, "3":0},
    "3": {"2":180, "4":0},
    "4": {"3":180, "5":90},
    "5": {"4":270, "5":180, "6":90},
    "6": {"5":270},
    "file-path" : "location of .dwg or any map file"
}

var routeTable = [
    { "t": 0, "p": 0 },
    { "t": 1, "p": 0 },
    { "t": 2, "p": 1 },
    { "t": 3, "p": 2 },
    { "t": 4, "p": 3 },
    { "t": 5, "p": 4 },
    { "t": 6, "p": 5 }
]

var target = 6;
var source = 1;

var t = getDirections(map, routeTable, target, source)
console.log(t)