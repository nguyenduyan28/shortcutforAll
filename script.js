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
let timer;
let isRunning = false;
let isStudyTime = true;
let studyDuration = 25 * 60; // 25 minutes in seconds
let breakDuration = 5 * 60; // 5 minutes in seconds
let currentTime = studyDuration;

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
    const seconds = (currentTime % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (currentTime > 0) {
                currentTime--;
                updateTimerDisplay();
            } else {
                isStudyTime = !isStudyTime;
                currentTime = isStudyTime ? studyDuration : breakDuration;
                document.getElementById('status').textContent = isStudyTime ? 'Study Time' : 'Break Time';
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    isStudyTime = true;
    currentTime = studyDuration;
    document.getElementById('status').textContent = 'Study Time';
    updateTimerDisplay();
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);

updateTimerDisplay(); // Initialize display