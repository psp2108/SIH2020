script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-3.4.1.js';

script.crossorigin = 'anonymous';
document.head.appendChild(script);
var no_of_floors;

function step1(name="SAMPLE BUILDING NAME",registration_id = "345234",total_floors = "2"){
        no_of_floors = total_floors;
        $.ajax({
            type: "GET",
            url: "/registerBuilding",
            dataType: 'json',
            data: {
                "name" : name,
            "registration-id" : registration_id,
            "total-floors" : total_floors,
            },
            success: function(data) {
                
            },
            error: function (result) {
                console.log(result);
            },
        });
    
}


function step2(build_no,floor_no,node1_x,node1_y,type1,node2_x,node2_y,type2,adj_matrix,ref_angle){
    
        $.ajax({
            type: "GET",
            url: "/registerBuilding/addDetails",
            dataType: 'json',
            data:{
                "building":{
                    "no" : build_no,
                    "floorno" :floor_no
                },
                "nodes" : {
                    "node1": {
                        "x" : node1_x,
                        "y" : node1_y,
                        "type": type1
                    },
                    "node2": {
                        "x" : node2_x,
                        "y" : node2_y,
                        "type": type2
                    }
                },
            
                "adj_matrix": [
                    [0,0,0,0],
                    [0,68,0,1],
                    [0,0,0,0],
                    [0,0,0,0]
                ],
                "ref_angle":ref_angle

            },

            success: function(data) {
            
            },
            error: function (result) {
                console.log(result);
            },
        });
    
}



