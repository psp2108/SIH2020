var preEncode = function(obj){
    var part1 = "";
    var part2 = "";
    var bitsLimit = 10;

    // General Function to equilize the length
    var handleLength = function(str, length){
        while(str.length < length){
            str = "0" + str;
        }
        return str;
    }

    // Converting QR-ID to 96-bit binary string as 'part1'
    var text2Binary = function(idInString) {
        var binString = "";
        for(var i=0; i<idInString.length; i++){
            var temp = handleLength(idInString[i].charCodeAt(0).toString(2), 8);
            binString += temp;
        }
        return binString;
    }
    
    // Converting target and parent of 
    var routeTable2Binary = function(table){
        if(table.length <= Math.pow(2, bitsLimit)){
            var binString = "";
            table.forEach(function(eachRow){
                var temp = handleLength(eachRow.p.toString(2), bitsLimit) + handleLength(eachRow.t.toString(2), bitsLimit);
                binString += temp;
            });
            if(binString.length < 2 * bitsLimit * Math.pow(2, bitsLimit)){
                var temp = handleLength("0", 2*bitsLimit);
                binString += temp;
            }
            if(binString.length % 8 != 0){
                binString += handleLength("0", (8 - (binString.length % 8)));
            }
            return binString;
        }
        return "";
    }

    part1 = text2Binary(obj['qr-id']);
    part2 = routeTable2Binary(obj['path-table'])
    return part1 + part2;
}


var o = {
    "qr-id" : "00445-02-002",
    "building-id": "00445",
    "path-table" : [
        { "t": 1, "p": 1 },
        { "t": 2, "p": 3 },
        { "t": 3, "p": 4 },
        { "t": 4, "p": 5 },
        { "t": 5, "p": 0 },
        { "t": 6, "p": 5 },
        { "t": 512, "p": 234 },
        { "t": 1023, "p": 251 },
        { "t": 1, "p": 1023 }
    ]
}
var t = preEncode(o)
// console.log(t, t.length + ":bits,", (t.length / 8) + ":bytes,", t.length % 8)
console.log(t)