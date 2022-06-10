const ids = [
    'drums-1',
    'drums-2',
    'drums-3'
];

let wavesurfers = [];
let togglers = new Array(ids.length).fill(true);


function onLoad() {

    ids.forEach((n, i) => {
        const data = document.querySelector("#" + n);
        const element = document.getElementById(n);
        const waveserferNumber = i * 2;
        element.insertAdjacentHTML('afterbegin',
            ` 
                <div style="grid-area: d;" class="audioPlrName">
                <p><b>${data.dataset.name}</b></p>
                </div>
                <button onclick="play(${waveserferNumber})" class="transportBtn" style="grid-area: a;">
                    <img id="transportImg${i}" src="./img/button_play.svg" height="60">
                </button>
                <button onclick="bypass(${waveserferNumber})" class="transportBtn" style="grid-area: b;">
                    <img id="bypassImg${i}" src="./img/button_bypass_off.svg" height="60">
                </button>
                    <div id="waveform_w${i}" style="grid-area: c; margin-left: 10px"></div>
                    <div id="waveform_d${i}" style="grid-area: c; margin-left: 10px"></div>
            `
        );
        let containerName = "#waveform_w" + String(i);
        let z4_color = getComputedStyle(document.documentElement).getPropertyValue('--z4-blue');
        console.log(z4_color);

        wavesurfers.push(new WaveSurfer.create({
            container: containerName,
            waveColor: z4_color,
            progressColor: 'rgb(81,75,140)',
            pixelRatio: 4,
            responsive: true,
            height: 70,
            barWidth: 4,
            cursorWidth: 4,
            cursorColor: 'rgba(116,113,156,0.2)',
            barRadius: 9,
        }));
        containerName = "#waveform_d" + String(i);

        wavesurfers.push(new WaveSurfer.create({
            container: containerName,
            waveColor: z4_color,
            progressColor: 'rgba(111,105,170)',
            pixelRatio: 4,
            responsive: true,
            height: 70,
            barWidth: 4,
            cursorWidth: 4,
            cursorColor: 'rgba(116,113,156,0.2)',
            barRadius: 9,
        }));
        wavesurfers[waveserferNumber].load(data.dataset.dry);
        wavesurfers[waveserferNumber + 1].load(data.dataset.wet);

        wavesurfers[waveserferNumber].on('finish', function () {
            play(waveserferNumber);
        });

        // wavesurfers[waveserferNumber + 1].setDisabledEventEmissions(['interaction']);
        wavesurfers[waveserferNumber + 1].toggleInteraction();
        wavesurfers[waveserferNumber + 1].setVolume(0);

        document.getElementById("waveform_w" + String(i)).style.opacity = "0.0";
        document.getElementById("waveform_d" + String(i)).style.opacity = "0.0";

        setTimeout(tm, 500);
        function tm() {
            document.getElementById("waveform_w" + String(i)).style.opacity = "1";
            document.getElementById("waveform_d" + String(i)).style.opacity = "0";
        }
    })

    onResize();
}



function play(number) {
    if (!wavesurfers[number].isPlaying()) {
        wavesurfers[number].play();
        wavesurfers[number + 1].play();
        document.getElementById("transportImg" + String(number / 2)).src = "/img/button_pause.svg";
    } else {
        wavesurfers[number].pause();
        wavesurfers[number + 1].pause();
        document.getElementById("transportImg" + String(number / 2)).src = "/img/button_play.svg";
    }
    // isPlaying = !isPlaying;
}

//let toggle = true;

function bypass(number) {
    if (!togglers[number / 2]) {
        wavesurfers[number].setVolume(1);
        wavesurfers[number + 1].setVolume(0);
        document.getElementById("waveform_w" + String(number / 2)).style.opacity = "1.0";
        document.getElementById("waveform_d" + String(number / 2)).style.opacity = "0.0";
        document.getElementById("bypassImg" + String(number / 2)).src = "/img/button_bypass_off.svg";
    }
    else {
        wavesurfers[number].setVolume(0);
        wavesurfers[number + 1].setVolume(1);
        document.getElementById("waveform_w" + String(number / 2)).style.opacity = "0.0";
        document.getElementById("waveform_d" + String(number / 2)).style.opacity = "1.0";
        document.getElementById("bypassImg" + String(number / 2)).src = "/img/button_bypass_on.svg";
    }
    togglers[number / 2] = !togglers[number / 2];
}

function onResize() {
    let x = document.getElementById("navbarElements");
    if (window.innerWidth <= 785) {
        x.style.display = "none";
    } else {
        x.style.display = "grid";
    }
    x = document.getElementById("backgroundImage");
    x.style.height = window.innerWidth.toString(10) + "px";

    x = document.getElementById("bigTanhx");
    let fontSize = window.innerWidth / 13;
    x.style.fontSize = fontSize.toString(10) + "px";
}

function showNavElements() {
    let x = document.getElementById("navbarElements");
    if (x.style.display === "none") {
        x.style.display = "grid";
    } else {
        x.style.display = "none";
    }
}