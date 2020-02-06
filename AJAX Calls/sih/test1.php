<?php 
    echo"Hello";
?>

<html>
<head>
    
    <script src="JS_functions_dir_ret.js"></script>
    <script src="JS_functions.js"></script>
    <script src="clean.js"></script>
    <script src="get_dirt_data.js"></script>
</head>
<body>
    <form method="GET" action="test2.php">
        <input type="text" name="inp1">
        <input type="button" id="sub" onclick="sendQR()">
    </form>
<script>
function sendQR()
{
    var binStrin = "00110000001100000011010000110100001101010010110100110000001100100010110100110000001100000011001000000000010000000001000000001100000000100000000100000000001100000001010000000100000000000000000001010000000101000000011000111010101000000000001111101111111111111111111111000000000100000000000000000000";
    //var clean_data=cl(binStrin);
    // var building_id=clean_data["building-id"];
    // var qr_id=clean_data["qr-id"];
    // var route_table=clean_data["path-table"];

    var building_id="00445";
    var qr_id="00445-02-002";
    var route_table=[
        { "t": 0, "p": 0 },
        { "t": 1, "p": 0 },
        { "t": 2, "p": 1 },
        { "t": 3, "p": 2 },
        { "t": 4, "p": 3 },
        { "t": 5, "p": 4 },
        { "t": 6, "p": 5 }
    ];
    
    
    $.ajax(
        {
            type: "GET",
            url: "http://localhost:3000/getBuilding/:123",
            dataType: "json",
            data: {
                     "building_id" : building_id
                },
            success: function(data) {
                //console.log(data);
                // var parsed = JSON.parse(data);
                // var parsed = data;             
                // //alert(JSON.stringify(parsed));
                // var floor_no=0;
                //alert(JSON.stringify(parsed["meta-data"]["maps"]["floor"+floor_no]));
                var dest_list = ret_dest_list(data);
                var node_id;
                var s_floor_no;
                
                
                var s_node = data["source-node"];
                var map_nodes = data["meta-data"]["maps"];
                var map_node;
                
                for(i = 0 ; i < s_node.length ; i++){
                    
                    if (s_node[i]["qr-id"] == qr_id){
                        
                        node_id = s_node[i]["node"];
                        s_floor_no = s_node[i]["floor"];

                        map_node = map_nodes["floor"+s_floor_no];
                        
                            
                        

                        
                    }
                    
                    
                }

                send_Json_for_directions(0,6,s_floor_no,node_id,map_node,route_table);

                

                
            },
            error: function (result) {
                alert("Err");
                console.log(result);
            },
        }
    );

    // $.get("http://localhost:3000/getBuilding/:123", {number: 345} , function(data){
    //     // Display the returned data in browser
    //     console.log(data);
    //     alert(JSON.stringify(data));
    // });
    
}



</script>
</body>
</html>