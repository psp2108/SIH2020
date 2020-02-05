$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "test2.php?inp1=fdfdf",
        dataType: 'json',
        success: function(data) {
            alert("Data Sent");
        },
        error: function (result) {
            console.log(result);
        },
    });
});