var cl = function(err){
    // Step 1: To convert into binary
    ConvertBase.dec2bin = function (num) {
        return ConvertBase(num).from(10).to(2);
    };

    // Step 2:
    var arr=[];
    var binStrin = "00110000001100000011010000110100001101010010110100110000001100100010110100110000001100000011001000000000010000000001000000001100000000100000000100000000001100000001010000000100000000000000000001010000000101000000011000111010101000000000001111101111111111111111111111000000000100000000000000000000";
    var len = binStrin.length;
    console.log(len);
    var y = binStrin.slice(0,96);
    console.log(y.toString());
    console.log(y.length);
    var z = binStrin.slice(96,len);
    console.log(z.toString());
    console.log(z.length);
    var start = 0;
    var x = 8;
    var qrid = "";
    var blgid = "";// blgid += parseInt(z.slice(st_rem,st_rem+b),2);
    var blg = [];
    var count = [];
    for(var i=0;i<12;i++){
        qrid += String.fromCharCode(parseInt(y.slice(start,start+x),2));
        start=start+x;
       }
    console.log(qrid);
    st_rem = y.length+1;
    var b = 10;
    var pathTable = [];
    var o = {
        "qr-id" :  qrid,
        "building-id" : qrid.slice(0,5),
        "qr-no" : qrid.slice(9,12),
        "path-table":[],
    }


    for(var j=0;j<1024;j++){
            // blgid += String.fromCharCode(parseInt(z.slice(st_rem,st_rem+b),2));
            var count = j;
            
            blg[j] = parseInt(z.slice(st_rem,st_rem+b),2);
            st_rem = st_rem+b;
            if(blg[j] == 0){
                break;
            }
            console.log(err);
            var temp = {};
            temp["t"] = count;
            temp["p"] = blg[j] ;
          
            o["path-table"][j] = temp;
        }
        console.log("PathTable is :-",o);
    }
cl();