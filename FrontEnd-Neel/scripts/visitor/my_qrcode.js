// Adding All Additional Scripts
var x = ["grid.js","version.js","detector.js","formatinf.js","errorlevel.js","bitmat.js","datablock.js",
         "bmparser.js","datamask.js","rsdecoder.js","gf256poly.js","gf256.js","decoder.js","qrcode.js","findpat.js",
         "alignpat.js","databr.js"];
var i;
var script;
for(i=0; i<x.length; i++){
    script = document.createElement('script');
    script.type = 'text/javascript';

    script.src = 'scripts/visitor/additional/'+x[i];
    console.log('MESSAGE FROM : my_qrcode.js : adding additional/'+x[i]);
    document.head.appendChild(script);
}
// Adding All Additional Scripts

window.onload =  function() {
        /* Ask for "environnement" (rear) camera if available (mobile), will fallback to only available otherwise (desktop).
        * User will be prompted if (s)he allows camera to be started */
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }).then(function(stream) {
        var video = document.getElementById("video-preview");
        video.srcObject = stream;
        video.setAttribute("playsinline", true); /* otherwise iOS safari starts fullscreen */
        video.play();
        setTimeout(tick, 100); /* We launch the tick function 100ms later (see next step) */
    })
    .catch(function(err) {
        alert("You'll have to Allow us to access the camera to be able to route you. We promise we won't misuse it!"); /* User probably refused to grant access*/
    });
};

function tick() {
    var video                   = document.getElementById("video-preview");
    var qrCanvasElement         = document.getElementById("qr-canvas");
    var qrCanvas                = qrCanvasElement.getContext("2d");
    var width, height;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        qrCanvasElement.height  = video.videoHeight;
        qrCanvasElement.width   = video.videoWidth;
        qrCanvas.drawImage(video, 0, 0, qrCanvasElement.width, qrCanvasElement.height);
        try {
            var result = qrcode.decode();
            
            /* Video can now be stopped */
            video.pause();
            video.src = "";
            video.srcObject.getVideoTracks().forEach(track => track.stop());

            /* Display Canvas and hide video stream */
            qrCanvasElement.classList.remove("hidden");
            video.classList.add("hidden");

            handle_qr_callback(result);
        } catch(e) {
            /* No Op */
        }
    }

    /* If no QR could be decoded from image copied in canvas */
    if (!video.classList.contains("hidden"))
        setTimeout(tick, 100);
}

function handle_qr_callback(result){
    document.getElementById("qr-scanner-id").innerHTML = result;
}