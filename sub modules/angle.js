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
    console.log(line.p2.x - line.p1.x)
    if(line.p2.x - line.p1.x == 0){
        return 90;
    }
    else{
        var slop = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x)
        // console.log(slop)
        var angle = Math.atan(slop) * 180 / Math.PI;
        if (angle < 0){
            angle = (180 + angle);
        }
        // console.log(angle)
        return angle
        // console.log("afas")
    }
}

var line1 = {
    p1: {
        x: -4,
        y: -4
    },
    p2: {
        x: -2,
        y: 4
    }

}
var line2 = {
    p1: {
        x: 5,
        y: -4
    },
    p2: {
        x: 3,
        y: 4
    }

}
var line3 = {
    p1: {
        x: -5,
        y: -3
    },
    p2: {
        x: -5,
        y: 3
    }

}
var line4 = {
    p1: {
        x: -6,
        y: 5
    },
    p2: {
        x: -3,
        y: 5
    }

}
var line5 = {
    p1: {
        x: -8,
        y: 0.8
    },
    p2: {
        x: -2,
        y: -0.2
    }

}
var line6 = {
    p1: {
        x: 0.3,
        y: -0.3
    },
    p2: {
        x: 6,
        y: 0.3
    }

}

console.log("Angle: "+getAngle(line5,23))
console.log("Angle: "+getAngle(line6,23))

var slop = function(x1, y1, x2, y2){
    if (x2 - x1 == 0){
        return "Inf";
    }
    else{
        return (y2-y1)/(x2-x1);
    }
}

// console.log(slop(-5,-3,-5,3))

// console.log(slop(-5,5,-5,-3))
// console.log(slop(-6,5,-3,5))

// console.log(slop(-4,-4,-2,4))
// console.log(slop(5,-4,3,4))