require("dotenv").config();

var processMat = require('./dependent/PreProcessMatrix')
var routeTable = require('./dependent/RoutingTable')

var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

var port = process.env['SIH_PORT'] || 3000;

var mongoHost = process.env['SIH_MONGODB_HOST'] || "localhost";
var mongoPort = process.env['SIH_MONGODB_PORT'] || "27017";
var mongoDB = process.env['SIH_MONGODB_DB'] || "sih2020";
var mongoURL = "mongodb://" + mongoHost + ":" + mongoPort + "/";

var sizeHandler = function(n, len){var t = "" + n; while(t.length < len) t += '0' + t}

MongoClient.connect(mongoURL + mongoDB, function(err, db) {
    if (err){ 
        console.log("Failed to connect to database");
        // throw err;
    }
    console.log("Database created!");

    // db.close();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log(req);
    res.send('hello world');
});

app.post('/registerBuilding', function(req, resp){
    var buildingData = {
        'meta-data':{}
    };
    buildingData['meta-data'] = req.body;
    buildingData['meta-data']["maps"] = {};

    var temp = {}
    for(var i=0; i<buildingData['meta-data']['total-floors']; i++){
        temp['floor'+i] = {};
        temp['floor'+i]['name'] = "";
        temp['floor'+i]['destinations'] = [];
        buildingData['meta-data']["maps"]['floor'+i] = {};
        buildingData['meta-data']["maps"]['floor'+i]['file-path'] = "no-path";
    }

    buildingData["floor-destination"] = temp;
    buildingData["source-node"] = [];

    MongoClient.connect(mongoURL, function(err, db) {
        if (err){
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"})
        }
        var dbo = db.db(mongoDB);
        dbo.collection("buildings").insertOne(buildingData, function(err, res) {
          if (err) {
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"});
          };
          db.close();
          resp.status(200).json({message : "Inserted", status : "succeed"})
        });
    });
});

app.post('/registerBuilding/addDetails', function(req, resp){
    /*
    {
        "meta-data" : {
            "name" : "SAMPLE BUILDING NAME",
            "registration-id" : 345234,
            "total-floors" : 2,
    
            "maps" : {
                "floor0" : {
                    "file-path" : "location of .dwg or any map file"
                },
                "floor1" : {
                    "file-path" : "location of .dwg or any map file"
                } 
            }
        },
    
        "floor-destination" : {
            "floor0" : {
                "name" : "",
                "destinations" : []
            },
            "floor1" : {
                "name" : "",
                "destinations" : []
            }
        },
        
        "source-node": []
    };
    */
   var buildingData = {"_id":"5e3c6ad579daf34a40aa34f6","meta-data":{"name":"SAMPLE BUILDING NAME 2","registration-id":"000020","total-floors":2,"maps":{"floor0":{"file-path":"no-path"},"floor1":{"file-path":"no-path"}}},"floor-destination":{"floor0":{"name":"","destinations":[]},"floor1":{"name":"","destinations":[]}},"source-node":[]};
    // var buildingData; //get from db
    var obj = processMat.processMatrix(req.body);
    var QR_counter = 0;
    for(var i=0; i<obj.adj_matrix.length; i++){
        if(obj.nodes['node' + i].type.indexOf("QR") >= 0){
            var temp = {
                "node" : i,
                "qr-id" : obj.building.no + "-" + sizeHandler(obj.building.floorno, 2) + "-" + sizeHandler(QR_counter, 3),
                "floor" : obj.building.floorno,
                "path-table" : routeTable.getRoutingTable(obj.adj_matrix, i)
            }

            buildingData['source-node'].push(temp);
            QR_counter++;
        }
        else if(obj.nodes['node' + i].type.indexOf("Via") >= 0){
            var temp = {
                "name" : obj.nodes['node' + i].name,
                "node" : i,
                "type" : "via",
                "direction" : "both"
            }
            buildingData['floor-destination']['floor'+obj.building.floorno].push(temp);
        }
        else if(obj.nodes['node' + i].type.indexOf("Dest") >= 0){
            var temp = {
                "name" : obj.nodes['node' + i].name,
                "node" : i,
                "type" : "destination"
            }
            buildingData['floor-destination']['floor'+obj.building.floorno].push(temp);
        }
    }
    
    for(var i=0; i<obj.adj_matrix.length; i++){
        var temp = {};
        for(var j=0; j<obj.adj_matrix; j++){
            if(obj.adj_matrix[i][j] != -1){
                temp[j] = obj.adj_matrix[i][j];
            }
        }
        buildingData['meta-data'].maps['floor'+obj.building.floorno][i] = temp;
    }
    // Iterate obj.nodes
    // If QR push to source
    //   -- node = current node
    //   -- floor = obj.building.floorno
    //   -- ['qr-id'] = obj.building.no + "-" + obj.building.floorno{2-digit} + "-" + QR_counter{3-digit}
    //   -- ['path-table'] = getRoutingTable(obj['adj-matrix'], current node)
    // If Dest or via push to destinations
    //   -- Add direction to via, default 'both'
    
    resp.status(200).json(buildingData);
 
});

app.get('/getPdf/:id', function(req, res){
    const file = `${__dirname}/sample_files/QRs.pdf`;
    res.download(file); // Set disposition and send it.
});

app.get('/getBuilding/:id', function(req, res){  
    data = {
        "meta-data" : {
            "name" : "SAMPLE BUILDING NAME",
            "registration-id" : 345234,
            "total-floors" : 2,
    
            "maps" : {
                "floor0" : {
                    "0": {"1":225},
                    "1": {"0":45, "1":0, "2":270},
                    "2": {"2":90, "3":0},
                    "3": {"2":180, "4":0},
                    "4": {"3":180, "5":90},
                    "5": {"4":270, "5":180, "6":90},
                    "6": {"5":270},
                    "file-path" : "location of .dwg or any map file"
                },
                "floor1" : {
                    "0": {"1":225},
                    "1": {"0":45, "1":0, "2":270},
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
                "node" : 1,
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
                    { "t": 0, "p": 0},
                    { "t": 1, "p": 0},
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

app.use(router);
app.listen(port);
console.log("Server started on port " + port)
