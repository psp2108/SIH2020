var inf = 999999;
var graph_matrix = [];
// var adj_matrix = [[],[]];
var temp = {
    "building":{
        "no" : "",
        "floorno" :""
    },
    "nodes" : {
        "node0": {
            "x" : 12,
            "y" : 23,
            "type": "QR"
        },
        "node1": {
            "x" : 12,
            "y" : 23,
            "type": "QR"
        },
        "node2": {
            "x" : 12,
            "y" : 23,
            "type": "QR"
        },
        "node3": {
            "x" : 15,
            "y" : 25,
            "type": "Path"
        }
    },

    "adj_matrix": [
        [0,0,0,0],
        [0,68,0,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    "ref_angle":45
}
var getAngle = function(line, refAngle){
    /*
        line = {
            p1: {
                x: 1,
                y: 2
            },
            p2: {
                x: 3,
                y: 3
            }

        }
    */
    if(line.p2.x - line.p1.x == 0){
        if(line.p1.y < line.p2.y){
            return 90;
        }
        else{
            return 270;
        }
    }
    else{
        var slop = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x)
        var angle = Math.atan(slop) * 180 / Math.PI;
        if (angle > 0){
            angle -= 180;
        }
        angle = Math.abs(angle);

        if (slop < 0){
            if(line.p1.x < line.p2.x && line.p1.y > line.p2.y){
                angle += 180;
            }
        }
        else if(slop > 0){
            if(line.p1.x > line.p2.x && line.p1.y > line.p2.y){
                angle += 180;
            }
        }
        else{
            if(line.p1.x > line.p2.x){
                angle += 180;
            }
        }

        //Bias
        angle += refAngle;
        return angle >= 360 ? angle - 360 : angle;
    }
}

for(var i=0;i<temp.adj_matrix.length; i++){
    graph_matrix.push([]);
    for(var j=0;j<temp.adj_matrix.length;j++){
        if(i==j){
            graph_matrix[i].push(temp.adj_matrix[i][j]);
        }
        else if(temp.adj_matrix[i][j] == 1){
            var line = {
                p1 : temp.nodes["node"+i],
                p2 : temp.nodes["node"+j]
            }
            graph_matrix[i].push(getAngle(line, temp.ref_angle));
        }
        else{
            graph_matrix[i].push(inf);
        }
        
    }
}

for(var i=0;i<graph_matrix.length;i++){
    for(var j=0;j<graph_matrix.length;j++){
        console.log(graph_matrix[i][j]);
    }
}
