const container = document.querySelector('.background');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const singerSpotify = document.querySelector('.spotify .singer');
const play = document.querySelector('#controls #play');
const prev = document.querySelector('#controls #prev');
const next = document.querySelector('#controls #next');
const duration = document.querySelector('#duration');
const currentTime = document.querySelector('#current-time');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
const ul = document.querySelector('ul');
const player = new MusicPlayer(MusicList);

window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.MusicList);
    isPlayingNow();
})

let displayMusic = (music) => {
    image.src = `${music.img}`;
    audio.src = "mp3/" + music.file;
    title.innerText = music.getMusicName();
    singer.innerText = music.singer;
    singerSpotify.innerText = music.singer;
    // container.style.backgroundImage = `url('${music.singerImage}')`;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? musicPause() : musicPlay();
});
prev.addEventListener('click', () => { prevMusic(); });
next.addEventListener('click', () => { nextMusic(); });

const prevMusic = () => {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    musicPlay();
    isPlayingNow();
};
const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    musicPlay();
    isPlayingNow();
}


const musicPause = () => {
    container.classList.remove("playing");
    play.querySelector('i').classList = "fa-solid fa-play";
    audio.pause();
};

const musicPlay = () => {
    container.classList.add("playing");
    play.querySelector('i').classList = "fa-solid fa-pause";
    audio.play();
};

const calculateTime = (totalSecond) => {
    const dakika = Math.floor(totalSecond / 60);
    const saniye = Math.floor(totalSecond % 60);
    const güncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`
    const sonuc = `${dakika}:${güncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () => {
    // music total second
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

let volumeState = "muted";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        audio.muted = true;
        volumeState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        volumeState = "notMuted";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if (volumeState == "notMuted") {
        audio.muted = true;
        volumeState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        volumeState = "notMuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index=${i} onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-item-center">
                <span class="mr-5">${list[i].getMusicName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill mr-5"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;
        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })
    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    musicPlay();
    isPlayingNow();
}

const isPlayingNow = () => {
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing");
        }
        if (li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})











