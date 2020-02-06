require("dotenv").config();
const express = require('express');
const app = express();

var port = process.env['SIH_PORT'] || 3000;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    console.log(req);
    res.send('hello world');
});

app.get('/getBuilding/:id', function(req, res){  
    data = {
        "meta-data" : {
            "name" : "SAMPLE BUILDING NAME",
            "registration-id" : 345234,
            "total-floors" : 2,
    
            "maps" : {
                "floor0" : {
                    "0": {},
                    "1": {"1":0, "2":270},
                    "2": {"2":90, "3":0},
                    "3": {"2":180, "4":0},
                    "4": {"3":180, "5":90},
                    "5": {"4":270, "5":180, "6":90},
                    "6": {"5":270},
                    "file-path" : "location of .dwg or any map file"
                },
                "floor1" : {
                    "0": {},
                    "1": {"1":0, "2":270},
                    "2": {"2":90, "3":0},
                    "3": {"2":180, "4":0},
                    "4": {"3":180, "5":90},
                    "5": {"4":270, "5":180, "6":90},
                    "6": {"5":270},
                    "file-path" : "location of .dwg or any map file"
                } 
            }
        },
    
        "floor-destination" : {
            "floor0" : {
                "name" : "",
                "destinations" : [
                    {
                        "name" : "Reception",
                        "node" : 0,
                        "type" : "destination"
                    },
                    {
                        "name" : "Lift",
                        "node" : 2,
                        "type" : "via",
                        "direction" : "both"
                    },
                    {
                        "name" : "Stairs",
                        "node" : 1,
                        "type" : "via",
                        "direction" : "both"
                    },
                    {
                        "name" : "Lunch",
                        "node" : 3,
                        "type" : "destination"
                    },
                    {
                        "name" : "Escalator",
                        "node" : 6,
                        "type" : "via",
                        "direction" : "up"
                    },
                    {
                        "name" : "Escalator",
                        "node" : 5,
                        "type" : "via",
                        "direction" : "down"
                    }
                ]
            },
            "floor1" : {
                "name" : "",
                "destinations" : [
                    {
                        "name" : "Rest Room",
                        "node" : 0,
                        "type" : "destination"
                    },
                    {
                        "name" : "Lift",
                        "node" : 2,
                        "type" : "via",
                        "direction" : "both"
                    },
                    {
                        "name" : "Stairs",
                        "node" : 1,
                        "type" : "via",
                        "direction" : "both"
                    },
                    {
                        "name" : "Terrace",
                        "node" : 3,
                        "type" : "destination"
                    },
                    {
                        "name" : "Escalator",
                        "node" : 6,
                        "type" : "via",
                        "direction" : "up"
                    },
                    {
                        "name" : "Escalator",
                        "node" : 5,
                        "type" : "via",
                        "direction" : "down"
                    }
                ]
            }
        },
        
        "source-node": [
            {
                "node" : 4,
                "floor" : 0,
                "qr-id" : "[building reg no]-[floor number 3 digit]-[0 to 'n']"
            },
            {
                "node" : 4,
                "floor" : 1,
                "qr-id" : "[building reg no]-[floor number 3 digit]-[0 to 'n']"
            },
            {
                "node" : 1,
                "floor" : 0,
                "qr-id" : "",
                "path-table" : [
                    { "t": 1, "p": -1 },
                    { "t": 2, "p": 3 },
                    { "t": 3, "p": 4 },
                    { "t": 4, "p": 5 },
                    { "t": 5, "p": 6 },
                    { "t": 6, "p": 9 }
                ]
            }
        ]
    };
    console.log(req, "Requested")
    res.setHeader('content-type', 'application/json');
    res.status(200).json(data);
});

// app.post('/regBuilding',function(req, res){


// });

// app.post('/setMap',function(req, res){

// });


app.listen(port);
