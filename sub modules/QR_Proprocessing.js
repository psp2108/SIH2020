var preEncode = function(obj){
    var t = 'a'.charCodeAt(0).toString(2)

    var text2Binary = function(idIInString) {
        idIInString.forEach(function(c){
            console.log(c)
        });
    }


    return text2Binary("abc");
    // return t;
}


var o = {
    "node" : 4,
    "floor" : 1,
    "qr-id" : "[building reg no]-[floor number 3 digit]-[0 to 'n']",
    "path-table" : [
        { "t": 1, "p": 1 },
        { "t": 2, "p": 3 },
        { "t": 3, "p": 4 },
        { "t": 4, "p": 5 },
        { "t": 5, "p": 0 },
        { "t": 6, "p": 5 }
    ]
}
var t = preEncode(o)
console.log(t)