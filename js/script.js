const ids = [
    'drums-1',
    'drums-2',
    'drums-3',
    'drums-4',
    'drums-5',
    'drums-6',
    'drums-7',
    'drums-8',
    'drums-9'
];


let wavesurfers = [];
let togglers = new Array(ids.length).fill(true);


function onLoad() {

    ids.forEach((n, i) => {
        const data = document.querySelector("#" + n);
        if (data !== null) {
            const waveserferNumber = i * 2;
            const element = document.getElementById(n);
            if (data.dataset.type === 'looper') {
                element.classList.add("audioLooper");
                element.insertAdjacentHTML('afterbegin',
                    ` 
                <div style="grid-area: d;" class="audioPlrName">
                <p><b>${data.dataset.name}</b></p>
                </div>
                <button onclick="play(${waveserferNumber})" class="transportBtn" style="grid-area: a;">
                <img id="transportImg${i}" src="./img/button_play.svg" class="playerButtonImg">
                </button>
                <button onclick="bypass(${waveserferNumber})" class="transportBtn" style="grid-area: b;">
                    <img id="bypassImg${i}" src="./img/button_bypass_off.svg" class="playerButtonImg">
                </button>
                    <div id="waveform_w${i}" style="grid-area: c; margin-left: 10px; margin-top: 2px"></div>
                    <div id="waveform_d${i}" style="grid-area: c; margin-left: 10px; margin-top: 2px"></div>
            `
                );
            } else if (data.dataset.type === 'player') {
                element.classList.add("audioPlayer");
                element.insertAdjacentHTML('afterbegin',
                    ` 
                <div style="grid-area: d;" class="audioPlrName">
                <p><b>${data.dataset.name}</b></p>
                </div>
                <button onclick="play(${waveserferNumber})" class="transportBtn" style="grid-area: a;">
                    <img id="transportImg${i}" src="./img/button_play.svg" class="playerButtonImg">
                </button>
                    <div id="waveform_w${i}" style="grid-area: c; margin-left: 10px; margin-top: 2px; "></div>
                `
                );
            }

            let containerName = "#waveform_w" + String(i);
            let z4_color = getComputedStyle(document.documentElement).getPropertyValue('--z4-blue');

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
            if (data.dataset.type === 'looper') {
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
                wavesurfers[waveserferNumber + 1].load(data.dataset.wet);
                wavesurfers[waveserferNumber + 1].toggleInteraction();
                wavesurfers[waveserferNumber + 1].setVolume(0);
                document.getElementById("waveform_w" + String(i)).style.opacity = "0.0";
                document.getElementById("waveform_d" + String(i)).style.opacity = "0.0";
                setTimeout(tm, 500);
                function tm() {
                    document.getElementById("waveform_w" + String(i)).style.opacity = "1";
                    document.getElementById("waveform_d" + String(i)).style.opacity = "0";
                }
            } else {
                wavesurfers.push(null);
            }

            wavesurfers[waveserferNumber].load(data.dataset.dry);

            wavesurfers[waveserferNumber].on('finish', function () {
                play(waveserferNumber);
            });

        } else {
            wavesurfers.push(null);
            wavesurfers.push(null);
        }
    })
    onResize();
}



function play(number) {
    if (!wavesurfers[number].isPlaying()) {
        wavesurfers[number].play();

        if (wavesurfers[number + 1] != null)
            wavesurfers[number + 1].play();

        for (let i = 0; i < ids.length; i++) {
            if (document.getElementById("transportImg" + String(i)) != null) {
                document.getElementById("transportImg" + String(i)).src = "/img/button_play.svg";
            }
        }

        document.getElementById("transportImg" + String(number / 2)).src = "/img/button_pause.svg";

        wavesurfers.forEach((n, i) => {
            if (n !== null)
                if (i != number) {
                    n.pause();
                }
        });


    } else {
        wavesurfers[number].pause();

        if (wavesurfers[number + 1] != null)
            wavesurfers[number + 1].pause();
        document.getElementById("transportImg" + String(number / 2)).src = "/img/button_play.svg";

    }
}


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

    document.getElementById("testPenis").innerHTML = window.innerWidth.toString(10) + ' x ' + window.innerHeight.toString(10);

    let x = document.getElementById("navbarElements");

    if (window.innerWidth <= 860 && window.innerWidth >= 500) { //tablet size
        x.style.display = "none";
        wavesurfers.forEach((n, i) => {
            if (n !== null)
                n.setHeight(50);
        });
    } else if (window.innerWidth <= 500) { //phone size
        wavesurfers.forEach((n, i) => {
            if (n !== null)
                n.setHeight(40);
        });
    }
    else if (window.innerWidth >= 1980) { //more than 2k browser window
        let coverImg = document.getElementById("coverImg");
        coverImg.style.width = window.innerWidth.toString(10) + "px";
        coverImg.style.height = "100%";
        let coverImgStyle = window.getComputedStyle(coverImg);
        let heightImg = coverImgStyle.getPropertyValue('height');
        let bigHeader = document.getElementById("bigHeader");

        let marginTop = (parseInt(heightImg, 10) / 1000 - 1) * 750 + 650;
        bigHeader.style.margin = marginTop.toString(10) + "px 0px 0px 0px";

        let bigheaderStyle = window.getComputedStyle(bigHeader);
        let fontSize = 16 + ((window.innerWidth / 1980) - 1) * 18;
        bigHeader.style.fontSize = fontSize.toString(10) + "px";
    } else {
        x.style.display = "grid";
        wavesurfers.forEach((n, i) => {
            if (n !== null)
                n.setHeight(70);
        });
    }

}

function showNavElements() {
    let x = document.getElementById("navbarElements");
    if (x.style.display === "none") {
        x.style.display = "grid";
    } else {
        x.style.display = "none";
    }
}