script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://code.jquery.com/jquery-3.4.1.js';

script.crossorigin = 'anonymous';
document.head.appendChild(script);



function ret_dest_list(data){
    
    var no_of_floors = data["meta-data"]["total-floors"];
    console.log(no_of_floors);
    var destOnFloors = {}; 
    var temp;

    for(i = 0 ; i < no_of_floors ; i++){
        floor = "floor"+i.toString();

        
        var d1 = data["floor-destination"][floor];
        temp = d1.destinations.filter(function (a){
            return a.type=="destination";
        })
    
        // Create the Floor Object
        destOnFloors[floor] = [];

        // Loop and Add the Destinations
        for(j=0;j<temp.length;j++){
            destOnFloors[floor][j] = {};
            destOnFloors[floor][j]["name"] = temp[j]["name"];
            destOnFloors[floor][j]["node"] = temp[j]["node"];
        }
    }
    // Response | List of Destinations
    console.log(destOnFloors);
    return(destOnFloors);
}