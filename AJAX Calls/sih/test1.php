<?php echo"Hello"?>

<html>
<head>
    <script
                src="https://code.jquery.com/jquery-3.4.1.js"
                integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
                crossorigin="anonymous">
    </script>
</head>
<body>
    <form method="GET" action="test2.php">
        <input type="text" name="inp1">
        <input type="button" id="sub">
    </form>
<script>
   $("#sub").click(function(){
    $.ajax({
        type: "GET",
        url: "../api/challenges/score_read.php",
        // dataType: 'json',
        success: function(data) {
            var parsed = JSON.parse(data);
            alert(parsed[0].name);
        },
        error: function (result) {
            alert("Err");
            console.log(result);
        },
    });
});




</script>
</body>
</html>