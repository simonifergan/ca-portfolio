function getTimestampByDate(dateStr) {
    // format: MM-DD-YYYY
    return new Date(dateStr.split('-')).getTime();
}