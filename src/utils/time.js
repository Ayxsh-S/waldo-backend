function formatMs(ms) {
    const totalSeconds = Math.floor(ms/1000);
    const minutes = Math.floor(totalSeconds/60);
    const seconds = totalSeconds%60;
    const hundredths = Math.floor((ms%1000)/10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
}

module.exports = { formatMs };