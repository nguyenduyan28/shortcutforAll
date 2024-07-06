let audioContext;
let whiteNoiseNode;
let noiseDuration = 1800000; // Duration to play white noise (30 minutes)
let intervalDuration = 300000; // Interval duration (5 minutes)
let intervalID;

function startWhiteNoise() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const bufferSize = 2 * audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    whiteNoiseNode = audioContext.createBufferSource();
    whiteNoiseNode.buffer = buffer;
    whiteNoiseNode.loop = true;
    whiteNoiseNode.connect(audioContext.destination);
    whiteNoiseNode.start();

    setTimeout(stopWhiteNoise, noiseDuration);
}

function stopWhiteNoise() {
    if (whiteNoiseNode) {
        whiteNoiseNode.stop();
        whiteNoiseNode = null;
    }

    // Schedule the next start after the interval duration
    setTimeout(startWhiteNoise, intervalDuration);
}

document.getElementById('startButton').addEventListener('click', () => {
    startWhiteNoise();
});

document.getElementById('stopButton').addEventListener('click', () => {
    clearTimeout(intervalID);
    stopWhiteNoise();
});
