const body = document.querySelector('body');
const container = document.querySelector('.container');
const audio = document.getElementsByTagName('audio')[0];
const timeEnd = document.querySelector('.time.end');
const progressBar = document.querySelector('.time.progress.move');

const imagesNamesArray = ['01.png', '02.png', '03.png', '04.jpg', '05.jpg', '06.jpg'];
const imagesNamesArrayLength = imagesNamesArray.length;

let index = 0;

body.style.backgroundImage = `url(./assets/images/${imagesNamesArray[index]})`;
body.style.backgroundSize = "cover";
body.style.backgroundRepeat = "no-repeat"

const playAudio = (audio) => {
    audio.play();
};

const getAudioDuration = (audio) => {
    console.log(audio.duration);
    return Math.round(audio.duration);
}; 

const stopAnimation = (animatedObject) => {
    animatedObject.style.animationIterationCount = 0;
};

const stopImageCarousel = (htmlNode) => {
    htmlNode.style.backgroundImage = `url(./assets/images/${imagesNamesArray[0]})`;
    htmlNode.style.backgroundSize = "cover";
    htmlNode.style.backgroundRepeat = "no-repeat";
};

const convertSecondsInMinutes = (durationInSeconds) => {
    return Math.floor(durationInSeconds / 60);
};

const convertSecondsInMinutesAndSeconds = (durationInSeconds, minutes) => {
    return durationInSeconds - minutes * 60;
};

const getProgressBarPercentage = (audio, audioLength) => {
    return Math.round(100 *  audio.currentTime / audioLength);
};

playAudio(audio);

setTimeout(() => {

    const audioDuration = getAudioDuration(audio);
    const TIME_BETWEEN_IMAGE_CHANGE = Math.round(audioDuration / imagesNamesArrayLength) * 1000;

    const minutes = convertSecondsInMinutes(audioDuration);
    const seconds = convertSecondsInMinutesAndSeconds(audioDuration, minutes);

    timeEnd.innerHTML = `${minutes} : ${seconds}`;

    setInterval(() => {
        const progression = getProgressBarPercentage(audio, audioDuration);
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





