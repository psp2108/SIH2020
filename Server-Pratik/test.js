// const request = require('request');

// request({
//     url: 'http://localhost:3000/getBuilding/123',
//     method: "GET",
//     json: true,
//     headers: {'Content-Type': 'application/json'},
//   }, function(err, response, body){
//     if(err) {
//       console.log(err);
//     }
//     else if(response.statusCode > 204){
//         // console.log(response);
//         console.log(body);
//     }
//     else{
//         console.log(body);
//         // console.log(response);
//     }
// });

var a = [4,3,2,1,5,2];
console.log(a.indexOf(2))
console.log(a.indexOf(20))

var b = 56
console.log((b + "").length == 1 ? "0" + b : b)
console.log((b + "").length == 1 ? "0" + b : b)