<?php 
    echo"Hello";
?>

<html>
<head>
    
    <script src="JS_functions_dir_ret.js"></script>
    <script src="JS_functions.js"></script>
</head>
<body>
    <form method="GET" action="test2.php">
        <input type="text" name="inp1">
        <input type="button" id="sub" onclick="sendQR('12345-07-009')">
    </form>
<script>
function sendQR(QRid)
{
    var i = 0;
    var BRid = "";
    while(QRid[i] != '-' ){
       
       BRid += QRid[i];
       i++;
   }
//    alert(BRid)
    $.ajax(
        {
            type: "GET",
            url: "http://localhost:3000/getBuilding/:123",
            // url: "https://jsonplaceholder.typicode.com/posts",
            // dataType: "json",
            // data: {
            //          "BRid" : BRid
            //     },
            success: function(data) {
                //console.log(data);
                // var parsed = JSON.parse(data);
                // var parsed = data;             
                // //alert(JSON.stringify(parsed));
                // var floor_no=0;
                //alert(JSON.stringify(parsed["meta-data"]["maps"]["floor"+floor_no]));

                ret_dest_list(data);
                send_Json_for_directions();

                

                
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