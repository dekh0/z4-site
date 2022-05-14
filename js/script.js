
function showNavElements() {
    var x = document.getElementById("navbarElements");
    if (x.style.display === "none") {
        x.style.display = "grid";
    } else {
        x.style.display = "none";
    }
}

var wavesurfer1;
var wavesurfer2;

function onLoad() {
    wavesurfer1 = WaveSurfer.create({
        container: '#waveform1',
        waveColor: 'rgb(116,113,156)',
        progressColor: 'rgb(81,75,140)',
        pixelRatio: 4,
        responsive: true,
        height: 70,
        barWidth: 4,
        cursorWidth: 4,
        cursorColor: 'rgba(116,113,156,0.2)',
        barRadius: 9,
    });
    wavesurfer2 = WaveSurfer.create({
        container: '#waveform2',
        waveColor: 'rgb(101,95,160)',
        progressColor: 'rgba(111,105,170)',
        pixelRatio: 4,
        responsive: true,
        height: 70,
        barWidth: 4,
        cursorWidth: 4,
        cursorColor: 'rgba(116,113,156,0.2)',
        barRadius: 9,
    });

    wavesurfer1.load("audio/audio.wav");
    wavesurfer2.load("audio/audio2.wav");

    wavesurfer1.on('finish', function () {
        play();
    });

    onResize();

    document.getElementById("waveform1").style.opacity = "0.0";
    document.getElementById("waveform2").style.opacity = "0.0";

    setTimeout(tm, 300);
    function tm() {
        document.getElementById("waveform1").style.display = "block";
        document.getElementById("waveform2").style.display = "none";
        document.getElementById("waveform1").style.opacity = "1";
        document.getElementById("waveform2").style.opacity = "1";
    }
}


var isPlaying = false;

function play() {
    if (!isPlaying) {
        wavesurfer1.play();
        wavesurfer2.play();
        document.getElementById("transportImg").src = "/img/button_pause.svg";
    } else {
        wavesurfer1.pause();
        wavesurfer2.pause();
        document.getElementById("transportImg").src = "/img/button_play.svg";
    }
    isPlaying = !isPlaying;
}

var toggle = true;

function bypass() {
    if (!toggle) {
        console.log("1");
        wavesurfer1.setVolume(1);
        wavesurfer2.setVolume(0);
        document.getElementById("waveform1").style.display = "block";
        document.getElementById("waveform2").style.display = "none";
        document.getElementById("bypassImg").src = "/img/button_bypass_off.svg";
    }
    else {
        console.log("2");
        wavesurfer1.setVolume(0);
        wavesurfer2.setVolume(1);
        document.getElementById("waveform1").style.display = "none";
        document.getElementById("waveform2").style.display = "block";
        document.getElementById("bypassImg").src = "/img/button_bypass_on.svg";
    }
    toggle = !toggle;
}

function onResize() {
    var x = document.getElementById("navbarElements");
    if (window.innerWidth <= 785) {
        x.style.display = "none";
    } else {
        x.style.display = "grid";
    }
    x = document.getElementById("backgroundImage");
    x.style.height = window.innerWidth.toString(10) + "px";

    x = document.getElementById("bigTanhx");
    var fontSize = window.innerWidth / 13;
    x.style.fontSize = fontSize.toString(10) + "px";
}

