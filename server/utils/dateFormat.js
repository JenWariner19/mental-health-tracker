
const moment = require('moment-timezone');

const addDateSuffix = (date) => {
    let dateStr = date.toString();

    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};

module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const timezone = 'America/Chicago'; // Modify this to your desired timezone

    const momentObj = moment.tz(timestamp, timezone);
    
    const formattedMonth = monthLength === 'short' ? momentObj.format('MMM') : momentObj.format('MMMM');
    
    const dayOfMonth = dateSuffix ? addDateSuffix(momentObj.date()) : momentObj.date();

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${momentObj.format('YYYY')} at ${momentObj.format('hh:mm A')}`;

    return formattedTimeStamp;
};