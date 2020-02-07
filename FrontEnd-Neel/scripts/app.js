function markDone(x){
    // Change class of instruction 1 as DONE
    document.getElementById(x).classList.add('number-done');
    document.getElementById(x).classList.remove('number');
    document.getElementById(x).innerHTML = "&#10004;";
}

function hideAndShow(showThis, hideThis){
    document.getElementById(hideThis).style.display = "none";
    document.getElementById(showThis).style.display = "block";
}

function changeTitle(id, titleStr){
    document.getElementById(id).innerHTML = titleStr+"<hr>";
}