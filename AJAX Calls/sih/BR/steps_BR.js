script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-3.4.1.js';

script.crossorigin = 'anonymous';
document.head.appendChild(script);
var no_of_floors;
alert("file");
function step1_br(b_name="SAMPLE BUILDING NAME",registration_id = "34524",total_floors = "2"){

        no_of_floors = total_floors;
        $.ajax({
            type: "POST",
            url: "https://28635f3f.ngrok.io/registerBuilding",
            dataType: 'json',
            data: {
                "b_name" : b_name,
                "registration-id" : registration_id,
                "total-floors" : total_floors,
            },
            success: function(data) {
                console.log(b_name,registration_id ,total_floors);
            },
            error: function (result) {
                console.log(result);
            },
        });
    
}


function step2_br(floor_vise_ditails){
    
        $.ajax({
            type: "POST",
            url: "https://28635f3f.ngrok.io/registerBuilding/addDetails",
            dataType: 'json',
            data:floor_vise_ditails,

            success: function(data) {
                console.log(floor_vise_ditails);
            },
            error: function (result) {
                console.log(result);
            },
        });
    
}
//step1(b_name="SAMPLE BUILDING NAME",registration_id = "345234",total_floors = "2");
//function step2(build_no,floor_no,node1_x,node1_y,type1,node2_x,node2_y,type2,adj_matrix,ref_angle);


