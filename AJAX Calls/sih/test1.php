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
        <input type="submit">
    </form>
<script>
   $(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://localhost/sih/test2.php?inp1=fdfdf",
        // dataType: 'json',
        success: function(data) {
            alert(data);
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