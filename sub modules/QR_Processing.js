var preEncode = function(obj){
    var part1 = "";
    var part2 = "";
    var part3 = "";
    var finalByteArr = [];
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
                binString += handleLength(eachRow.p.toString(2), bitsLimit);
            });
            if(binString.length % 8 != 0){
                binString += handleLength("0", (8 - (binString.length % 8)));
            }
            return binString;
        }
        return "";
    }

    part1 = text2Binary(obj['qr-id']);
    part2 = handleLength(obj['path-table'].length.toString(2), 16);
    part3 = routeTable2Binary(obj['path-table'])

    var fString = part1 + part2 + part3;
    var len = fString.length / 8;

    for(var i=0; i<len; i++){
        var temp = fString.slice(i*8, i*8+8);
        finalByteArr.push(parseInt(temp, 2));
    }
    return finalByteArr;
}

var postDecode = function(byteArr){

}

var o = {
    "qr-id" : "00445-02-002",
    "building-id": "00445",
    "path-table" : [
        { "t": 0, "p": 1 },
        { "t": 1, "p": 3 },
        { "t": 2, "p": 4 },
        { "t": 3, "p": 5 },
        { "t": 4, "p": 0 },
        { "t": 5, "p": 5 },
        { "t": 6, "p": 234 },
        { "t": 7, "p": 251 },
        { "t": 8, "p": 1023 }
    ]
}
var t = preEncode(o)
// console.log(t, t.length + ":bits,", (t.length / 8) + ":bytes,", t.length % 8)