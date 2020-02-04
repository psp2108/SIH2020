$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "../api/doctor/read_single.php?id=<?php echo $_GET['id']; ?>",
        dataType: 'json',
        success: function(data) {
            $('#name').val(data['name']);
            $('#email').val(data['email']);
            $('#password').val(data['password']);
            $('#phone').val(data['phone']);
            $('#gender'+data['gender']).prop("checked", true);
            $('#specialist').val(data['specialist']);
        },
        error: function (result) {
            console.log(result);
        },
    });
});