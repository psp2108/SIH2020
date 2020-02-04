var getAngle = function(line, angle){
    /*
        {
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
    slop = (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x)
    console.log(slop)
    console.log(Math.atan(slop) * 180 / Math.PI)
    // console.log("afas")
}

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

getAngle(line,23)