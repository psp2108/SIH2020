script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-3.4.1.js';

script.crossorigin = 'anonymous';
document.head.appendChild(script);

function get_direction(map, routeTable, target, source){
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

    var t = getDirections(map, routeTable, target, source)
    console.log(t);
    return(t);
    //alert(t);
}

function send_Json_for_directions(floor_no_dest,node_no,s_floor_no,node_id,map_node,route_table){
    var map = map_node;
    //console.log("Data is");
    //console.log(route_table);
    var routeTable = route_table;
    //console.log(routeTable);
    var target = node_no;
    var source = node_id;
    var dirct=get_direction(map, routeTable, target, source);

    return dirct;
}