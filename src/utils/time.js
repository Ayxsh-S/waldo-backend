function formatMs(ms) {
    const totalSeconds = Math.floor(ms/1000);
    const minutes = Math.floor(totalSeconds/60);
    const seconds = totalSeconds%60;
    const tenths = Math.floor((ms%1000)/100);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
}

module.exports = { formatMs };