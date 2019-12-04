//get our element
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
//const volume = player.querySelector('.player__slider');
const toogle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
console.log(progressBar);
//console.log(ranges);
function tooglePlay() {
    if (video.paused) {
        video.play();
        toogle.innerHTML = "||";
    }
    else {
        video.pause();
        toogle.innerHTML = "►";
    }

}
function scrub(e){
    console.log('e.offsetX = '+ e.offsetX);
    console.log('progress.offsetWidth= '+progress.offsetWidth);
    const scrubTime = (e.offsetX /progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}
function Skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
};
function handleUpdate(){
   // console.log(this.name);
   // console.log(this.value);
    video[this.name] = this.value;
};
function handProcess(){
    //console.log( "vao hand process");
    const percent =(video.currentTime / video.duration)*100;
    //console.log( "percent= "+percent);
   // console.log( progressBar.style.flexBasics);
    progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('click', tooglePlay);
toogle.addEventListener('click', tooglePlay);
video.addEventListener('timeupdate',handProcess);
skipButtons.forEach(button => button.addEventListener('click',Skip));
ranges.forEach(button=> button.addEventListener('click',handleUpdate));
progress.addEventListener('click',scrub);
