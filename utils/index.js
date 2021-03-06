export function toHHMMSS(secs) {
    let sec_num = secs;
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours) {
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    return hours+':'+minutes+':'+seconds;
    }

    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}