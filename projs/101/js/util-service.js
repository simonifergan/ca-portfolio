// Turn timestamp into a MM/DD/YY HH:MM with 0 if < 9
function stringifyTimestamp(timestamp) {
    let date = new Date(timestamp);
    let month = getWithZero(date.getMonth() + 1);
    let day = getWithZero(date.getDay());
    let year = getWithZero(date.getFullYear());
    let hours = getWithZero(date.getHours());
    let minutes = getWithZero(date.getMinutes());

    return `${month}/${day}/${year} ${hours}:${minutes}`;

}

function getWithZero(num) {
    return num = (num < 10) ? '0' + num : num;
} 