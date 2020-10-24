const monthNames = [
    "January", "February", "March", "April",
    "May", "June","July", "August",
    "September", "October", "November", "December"
];

// eslint-disable-next-line
const weekNames = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
];

function addZero(i) {
    if(i < 10) {
        i = "0" + i;
    }
    return i;
}

function formatDate(date) {
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function formatDateLong(date) {
    const month = monthNames[date.getMonth()];
    const day = addZero(date.getDate());
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

function formatTime(date) {
    let hour = date.getHours();
    const period = hour > 11 ? 'PM' : 'AM';
    hour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const mins = addZero(date.getMinutes());
    return `${hour}:${mins} ${period}`;
}

function fullDateTime(date) {
    const dateFormatted = formatDateLong(date);
    const timeFormatted = formatTime(date);
    return `${dateFormatted} ${timeFormatted}`;
}

module.exports = {
    formatDate,
    formatDateLong,
    formatTime,
    fullDateTime
}