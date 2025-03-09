
import cv from 'opencv.js';

let video = document.createElement('video');
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');

function startVideo() {
    const videoElement = document.getElementById('videoElement');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            requestAnimationFrame(processVideo);
        })
        .catch(err => {
            console.error("Error accessing webcam: ", err);
        });
}

function processVideo() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let src = cv.imread(canvas);
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(src, src, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
    cv.Canny(src, dst, 100, 200, 3, false);
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete();
    requestAnimationFrame(processVideo);
}

function recognizeGesture() {
    // Implement gesture recognition logic here
}

startVideo();
