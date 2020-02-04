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


var line = {
    p1: {
        x: 0,
        y: 0
    },
    p2: {
        x: -500,
        y: -0.1
    }
}

console.log("Angle: "+getAngle(line,39));