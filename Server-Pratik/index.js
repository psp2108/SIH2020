require("dotenv").config();

var processMat = require('./dependent/PreProcessMatrix')
var routeTable = require('./dependent/RoutingTable')
var qrPreProcess = require('./dependent/PreProcessQR')

var MongoClient = require('mongodb').MongoClient;
const express = require('express');
var QRCode = require('qrcode');
var async = require('async');
const imagesToPdf = require("images-to-pdf")
const bodyParser = require('body-parser');
var fs = require('fs');
var text2png = require('text2png');

const app = express();
const router = express.Router();

var port = process.env['SIH_PORT'] || 3000;

var mongoHost = process.env['SIH_MONGODB_HOST'] || "localhost";
var mongoPort = process.env['SIH_MONGODB_PORT'] || "27017";
var mongoDB = process.env['SIH_MONGODB_DB'] || "sih2020_temp";
var mongoURL = "mongodb://" + mongoHost + ":" + mongoPort + "/";

var sizeHandler = function(n, len){
    var t = "" + n; 
    while(t.length < len) 
        t = '0' + t; 
    return t
}

var generateQR = function(file, data, done){
    return QRCode.toFile(file, [{ data: data, mode: 'byte'}], {
        color: {
            dark: '#000000',  // Blue dots
            light: '#ffffff' // Transparent background
        }
    }, function (err) {
        if (err){
            return (done == null) ? false : done(err, null);
        }
        else{
            // QRList.push(eachQR['qr-id']);
            // console.log(eachQR['qr-id'])
            return (done == null) ? true : done(err, null);
        }
    });
}

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
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    var a = [
        " (GET)   \t/",
        "(POST)   \t/registerBuilding",
        "(POST)   \t/registerBuilding/addDetails",
        " (GET)   \t/getPdf/:id",
        " (GET)   \t/getBuilding/:id",
        " (GET)   \t/getBuilding"
    ];
    var op = "";
    a.forEach(function(r){
        op += (r + "<br>\n");
    });

    console.log(op);
    res.send(op);
});

app.post('/registerBuilding', function(req, resp){
    console.log(req.body);
    console.log(req.body.name);
    var buildingData = {
        'meta-data':{}
    };
    buildingData['meta-data'] = req.body;
    buildingData['_id'] = req.body['registration-id'];
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
    var buildingData;
    MongoClient.connect(mongoURL, function(err, db) {
        if (err){
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"})
        }
        var dbo = db.db(mongoDB);
        // dbo.collection("buildings").find({"meta-data" : {"registration-id" : "00020"}}).toArray( function(err, res) {
        dbo.collection("buildings").find({'_id' : req.body.building.no}).toArray( function(err, res) {
            if (err) {
                resp.status(200).json({message : "Error: DB not connecting", status : "failed"});
            };
            buildingData = res[0];
            
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
                    buildingData['floor-destination']['floor'+obj.building.floorno].destinations.push(temp);

                    temp = {
                        "node" : i,
                        "qr-id" : "",
                        "floor" : obj.building.floorno,
                        "path-table" : routeTable.getRoutingTable(obj.adj_matrix, i)
                    }

                    buildingData['source-node'].push(temp);
                }
                else if(obj.nodes['node' + i].type.indexOf("Dest") >= 0){
                    var temp = {
                        "name" : obj.nodes['node' + i].name,
                        "node" : i,
                        "type" : "destination"
                    }
                    buildingData['floor-destination']['floor'+obj.building.floorno].destinations.push(temp);
                }
            }
            
            for(var i=0; i<obj.adj_matrix.length; i++){
                var temp = {};
                for(var j=0; j<obj.adj_matrix.length; j++){
                    if(obj.adj_matrix[i][j] != -1){
                        temp[j] = obj.adj_matrix[i][j];
                    }
                }
                buildingData['meta-data'].maps['floor'+obj.building.floorno][i] = temp;
            }
            
            dbo.collection("buildings").updateOne({'_id' : req.body.building.no}, {$set: buildingData}, function(updateErr, updateRes) {
                if (updateErr) {
                    resp.status(200).json({message : "Error: DB not connecting", status : "failed"});
                };
                db.close();
                resp.status(200).json({message : "Updated", status : "succeed"});
            });
        });
    });
});

app.get('/getPdf/:id', function(req, resp){

    var QR_Dir = __dirname + '/QRs';
    var QRList = [];

    if (!fs.existsSync(QR_Dir)){
        fs.mkdirSync(QR_Dir);
    }


    MongoClient.connect(mongoURL, function(err, db) {
        if (err){
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"})
        }
        var dbo = db.db(mongoDB);
        // dbo.collection("buildings").find({"meta-data" : {"registration-id" : "00022"}}).toArray( function(err, res) {
        dbo.collection("buildings").find({'_id' : req.params.id}).toArray( function(err, res) {
            if (err) {
                resp.status(200).json({message : "Error: DB not connecting", status : "failed"});
            };
            db.close();

            var kundali = res[0]
            var QRGenerateTask = [];
            var qrlabelpath = "";

            kundali['source-node'].forEach(function(eachQR){
                if(eachQR['qr-id'] != ""){
                    qrlabelpath = QR_Dir + '/'+ eachQR['qr-id'] + '-label.png';
                    if(QRList.indexOf(qrlabelpath) < 0){
                        // QRList.push(eachQR['qr-id']);
                        var data = qrPreProcess.preEncode(eachQR); // Get it from preEncode
                        
                        QRList.push(qrlabelpath);
                        console.log("LABEL Path -> " + qrlabelpath)
                        fs.writeFileSync(qrlabelpath, text2png('QR ID\n' + eachQR['qr-id'], {color: 'blue'}));
                        var qrpath = QR_Dir + '/'+ eachQR['qr-id'] +'.png';
                        QRList.push(qrpath);
                        QRGenerateTask.push(function(done){
                            console.log("QR Path -> " + qrpath);
                            return QRCode.toFile(qrpath, [{ data: data, mode: 'byte'}], {
                                color: {
                                    dark: '#000000',  // Blue dots
                                    light: '#ffffff' // Transparent background
                                }
                            }, done);   
                        });
                    }
                }              
            });
            async.parallel(QRGenerateTask, function(error, response){
                if(error) {
                    resp.status(200).json({message : "QR Generation failed", status : "failed"});
                }
                else{
                    console.log(QRList)
                    
                    const file = `${QR_Dir}/combined.pdf`;
                    imagesToPdf(QRList, file)  
                    resp.download(file); 
                    // resp.status(200).json({t: QRList}); // Set disposition and send it.
                    // resp.send(QRList);
                }
            });
            
            
        });
    });
});

app.get('/downloadPDF', function(req, res){
    var qr = [
        "./QRs/00050-01-000-label.png",
        "./QRs/00050-01-000.png",
        "./QRs/00050-01-001-label.png",
        "./QRs/00050-01-001.png",
        "./QRs/00050-00-000-label.png",
        "./QRs/00050-00-000.png",
        "./QRs/00050-00-001-label.png",
        "./QRs/00050-00-001.png"
    ]
    imagesToPdf(qr, "combined.pdf")  
    const file = `${__dirname}/combined.pdf`;
    res.download(file); 
})

app.get('/getBuilding/:id', function(req, resp){
    MongoClient.connect(mongoURL, function(err, db) {
        if (err){
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"})
        }
        var dbo = db.db(mongoDB);
        // dbo.collection("buildings").find({"meta-data" : {"registration-id" : "00022"}}).toArray( function(err, res) {
        dbo.collection("buildings").find({'_id' : req.params.id}).toArray( function(err, res) {
          if (err) {
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"});
          };
          db.close();
          resp.status(200).send(res[0]);
        });
    });
});

app.get('/getBuilding', function(req, resp){
    MongoClient.connect(mongoURL, function(err, db) {
        if (err){
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"})
        }
        var dbo = db.db(mongoDB);
        dbo.collection("buildings").find({}).toArray( function(err, res) {
          if (err) {
            resp.status(200).json({message : "Error: DB not connecting", status : "failed"});
          };
          db.close();
          resp.status(200).send(res);
        });
    });
});

app.use(router);
app.listen(port);
console.log("Server started on port " + port)
