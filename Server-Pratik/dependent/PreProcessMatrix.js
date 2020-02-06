module.exports = {
    processMatrix: function(obj){
        var graph_matrix = [];

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

        for(var i=0;i<obj.adj_matrix.length; i++){
            graph_matrix.push([]);
            for(var j=0;j<obj.adj_matrix.length;j++){
                if(obj.adj_matrix[i][j] == 1){
                    var line = {
                        p1 : obj.nodes["node"+i],
                        p2 : obj.nodes["node"+j]
                    }
                    graph_matrix[i].push(getAngle(line, obj.ref_angle));
                }
                else{
                    graph_matrix[i].push(obj.adj_matrix[i][j]);
                }
            }
        }
        obj.adj_matrix = graph_matrix;
        return obj;
    }
}