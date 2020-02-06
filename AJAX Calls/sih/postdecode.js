var postDecode = function(byteArr){
    var binString = "";
    var bitsLimit = 10;
    var part1 = "";
    var part2 = "";
    var part3 = "";
    var obj = {};

    // General Function to equilize the length
    var handleLength = function(str, length){
        while(str.length < length){
            str = "0" + str;
        }
        return str;
    }

    // Parse QR-ID and Building-ID
    var parseIDs = function(part1){
        var qrId = "";
        var buildingId = "";
        
        var len = part1.length / 8;

        for(var i=0; i<len; i++){
            var temp = part1.slice(i*8, i*8+8);

            if(i < 5){
                buildingId += String.fromCharCode(parseInt(temp, 2));
            }
            qrId += String.fromCharCode(parseInt(temp, 2));
        }
        obj["qr-id"] = qrId;
        obj["building-id"] = buildingId;
    }

    // Convert to binary
    for(var i=0; i<byteArr.length; i++){
        if(i < 12){
            part1 += handleLength(byteArr[i].toString(2), 8);
        }
        else if(i <= 13 && i >= 12){
            part2 += handleLength(byteArr[i].toString(2), 8);
        }
        else{
            part3 += handleLength(byteArr[i].toString(2), 8);
        }
    }
    
    parseIDs(part1);
    obj["path-table"] = [];

    // Get Routuing Table
    for(var i=0; i<parseInt(part2, 2); i++){
        var temp = part3.slice(i*bitsLimit, i*bitsLimit+bitsLimit);
        obj["path-table"].push({ "t": i, "p":parseInt(temp, 2)});
    }
    return obj;
}