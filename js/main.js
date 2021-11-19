let body = document.querySelector('body');
let container = document.querySelector('.container');
let audio = document.querySelector('audio');

let playIcon = document.querySelector('i.fa-play');
let pauseIcon = document.querySelector('i.fa-pause');
let stopIcon = document.querySelector('i.fa-stop');

let timeEnd = document.querySelector('.time.end');
let progressBar = document.querySelector('.time.progress.move');

let imagesNamesArray = ['01.png', '02.png', '03.png', '04.jpg', '05.jpg', '06.jpg'];
let imagesNamesArrayLength = imagesNamesArray.length;

let index = 0;

body.style.backgroundImage = `url(./assets/images/${imagesNamesArray[index]})`;
body.style.backgroundSize = "cover";
body.style.backgroundRepeat = "no-repeat"

let playAudio = (audio, progress, color) => {
    try {
        audio.play();
    } catch(error) {
        console.error(error);
    }
    this.style.color = `${color}`;
    progress.style.backgroundColor = `${color}`;
};

let pauseAudio = (audio, progress, color) => {
    try {
        audio.pause();
    } catch (err) {
        console.error(error);
    }
    this.style.color = `${color}`;
    progress.style.backgroundColor = `${color}`;
};

let stopAudio = (audio) => {
    try {
        audio.pause();
        audio.currentTime = 0;
    } catch (error) {
        console.error(error);
    }
};

let getAudioDuration = (audio) => {
    return Math.round(audio.duration);
}; 

let stopAnimation = (animatedObject) => {
    animatedObject.style.animationIterationCount = 0;
};

let stopImageCarousel = (htmlNode) => {
    htmlNode.style.backgroundImage = `url(./assets/images/${imagesNamesArray[0]})`;
    htmlNode.style.backgroundSize = "cover";
    htmlNode.style.backgroundRepeat = "no-repeat";
};

let convertSecondsInMinutes = (durationInSeconds) => {
    return Math.floor(durationInSeconds / 60);
};

let convertSecondsInMinutesAndSeconds = (durationInSeconds, minutes) => {
    return durationInSeconds - minutes * 60;
};

let getProgressBarPercentage = (audio, audioLength) => {
    return Math.round(100 *  audio.currentTime / audioLength);
};


setTimeout(() => {

    let audioDuration = getAudioDuration(audio);
    let TIME_BETWEEN_IMAGE_CHANGE = Math.round(audioDuration / imagesNamesArrayLength) * 1000;

    let minutes = convertSecondsInMinutes(audioDuration);
    let seconds = convertSecondsInMinutesAndSeconds(audioDuration, minutes);

    timeEnd.innerHTML = `${minutes} : ${seconds}`;

    setInterval(() => {
        let progression = getProgressBarPercentage(audio, audioDuration);
        progressBar.style.width = `${progression}%`;
    }, 1000);

    setInterval(() => {
        ++index;
    
        body.style.backgroundImage = `url(./assets/images/${imagesNamesArray[index % imagesNamesArrayLength]})`;
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
    
    }, TIME_BETWEEN_IMAGE_CHANGE);
    

    setTimeout(() => {
        stopAnimation(container);
        stopImageCarousel(body);
    }, audioDuration * 1000 - 3000);

}, 3000);

playIcon.addEventListener('click', () => {
    playAudio(audio, progressBar, "green");
    pauseIcon.style.color = "white";
    stopIcon.style.color = "white";
}); 

pauseIcon.addEventListener('click', () => {
    pauseAudio(audio, progressBar, "orange");
    playIcon.style.color = "white";
    stopIcon.style.color = "white";
});

stopIcon.addEventListener('click', () => {
    stopAudio(audio);
    playIcon.style.color = "white";
    pauseIcon.style.color = "white";
});



