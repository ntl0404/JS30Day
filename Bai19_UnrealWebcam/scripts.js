

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error('oh no', err);
        })
}
function paintToCanavas() {
    const width = video.videoWidth;
    const Height = video.videoHeight;
    canvas.width = width;
    canvas.height = Height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, Height);
        let pixels = ctx.getImageData(0, 0, width, Height);
         //pixels = redEffect(pixels);
        //pixel = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0, 0);
       // debugger;
    }, 16);
}
function takePhoto() {
    //play the sound
    snap.currentTime = 0;
    snap.play();
    //take the date out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src='${data}' alt='Handsome man' />`
    link.textContent = 'Download Image';
    strip.insertBefore(link, strip.firstChild);
}
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }
    return pixels;
}
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // red
        pixels.data[i + 100] = pixels.data[i + 1]; // green
        pixels.data[i - 550] = pixels.data[i + 2]; // blue
    }
    return pixels;
}
function Green(pixels) {

}
getVideo();
video.addEventListener('canplay', paintToCanavas);