var QRCode = require('qrcode')
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

var dumData = [];
for(var i=0; i<1292; i++){
    dumData.push(Math.floor(Math.random() * Math.floor(256)));
}
console.log(dumData);

console.log(QRCode);
// QRCode.create("Neil");
// QRCode.toFile('QRs/filename.png', [{ data: 'ABCDEFG', mode: 'alphanumeric'}], {
QRCode.toFile('QRs/filename-realishdata.png', [{ data: dumData, mode: 'byte'}], {
    color: {
      dark: '#000000',  // Blue dots
      light: '#ffffff' // Transparent background
    }
  }, function (err) {
    if (err) throw err
    console.log('done')
})