import moment from 'moment';
import 'moment-timezone';
function TimeAgo({ date }) {

    console.log("date",date)

    // Function to calculate time ago
    const now = moment();
    const postDate = moment(date);
    const diff = now.diff(postDate, 'minutes');

    if (diff < 60) {
        return diff + 'm';
    } else if (diff < 24 * 60) {
        const hours = Math.floor(diff / 60);
        return hours === 1 ? '1h' : hours + 'h';
    } else {
        const days = Math.floor(diff / (24 * 60));
        return days === 1 ? 'Yesterday' : days + 'd';
    }
}

export default TimeAgo