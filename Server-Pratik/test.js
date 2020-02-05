const request = require('request');

request({
    url: 'http://localhost:3000/getBuilding/123',
    method: "GET",
    json: true,
    headers: {'Content-Type': 'application/json'},
  }, function(err, response, body){
    if(err) {
      console.log(err);
    }
    else if(response.statusCode > 204){
        // console.log(response);
        console.log(body);
    }
    else{
        console.log(body);
        // console.log(response);
    }
});