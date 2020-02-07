script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-3.4.1.js';

script.crossorigin = 'anonymous';
document.head.appendChild(script);

var global_data;
var qr_id;
var route_table;
var decode_qr = [
    48,  48, 52, 52, 53, 45,  48,  50,
    45,  48, 48, 50,  0,  9,   0,  64,
    48,  16,  5,  0,  0, 83, 168, 251,
   255, 192
];
 
function step1_user(decode_qr){
    var decoded_obj = postDecode(decode_qr);
    var building_id = decoded_obj["building-id"];
    qr_id = decoded_obj["qr-id"];
    route_table = decoded_obj["path-table"];

    $.ajax({
        type: "GET",
        url: "https://28635f3f.ngrok.io/getBuilding/"+building_id,
        dataType: 'json',
        data:{
            //"building_id": building_id
        },
        success: function(data) {
            global_data=data;
            var dest_list = ret_dest_list(data);
            return(dest_list);
        },
        error: function (result) {
            console.log(result);
        },
    
    });
}

function step2_user(d_floor_no,d_node_no){

    var s_node_no;
    var s_floor_no;
    var s_node = data["source-node"];
    var map_nodes = data["meta-data"]["maps"];
    var map_node;
    
    for(i = 0 ; i < s_node.length ; i++){
        
        if (s_node[i]["qr-id"] == qr_id){
            
            s_node_no = s_node[i]["node"];
            s_floor_no = s_node[i]["floor"];

            map_node = map_nodes["floor"+s_floor_no];
            
        }
        
    }

    // Response to NEEL
    return send_Json_for_directions(d_floor_no,d_node_no,s_floor_no,s_node_no,map_node,route_table);
}