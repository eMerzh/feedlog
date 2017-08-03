/**
 * Return a date object from an epoch
 * @param  {number} epoch the number of seconds from 1970
 * @return  {Date} a Date object
 */
export function getDateFromEpoch(epoch) {
  var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(epoch);

  return date;
}

/**
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds   The number of seconds to be processed
 * @param  {number} precision The number of time elements
 * @param  {number} nowLimit  The limit of second below witch the function will display "now" (default 0)
 * @param  {number} length    The length of labels. (1 =  large , 2 = small) default 1
 * @return {string}           The phrase describing the the amount of time
 */
export function forHumans(seconds, precision, nowLimit, length) {
  if (nowLimit == undefined) {
    nowLimit = 0;
  }
  if (length == undefined) {
    length = 1;
  }
  if (seconds < nowLimit) {
    return "Just now";
  }
  var levels = [
    [Math.floor(seconds / 31536000), "years", "y"],
    [Math.floor(seconds % 31536000 / 86400), "days", "days"],
    [Math.floor(seconds % 31536000 % 86400 / 3600), "hours", "h"],
    [Math.floor(seconds % 31536000 % 86400 % 3600 / 60), "minutes", "min"],
    [seconds % 31536000 % 86400 % 3600 % 60, "seconds", "sec"]
  ];
  var result = [];
  var indexToDrop = [];

  for (var i = 0, max = levels.length; i < max; i++) {
    var value = levels[i][0];
    // skip if 0 but only if we have nothing in.
    if (value === 0 && result.length === 0) continue;

    // take unit from array and remove plural form if value is 1 (and length != small)
    var unit =
      value === 1 && levels[i][length][levels[i][length].length - 1] == "s"
        ? levels[i][length].substr(0, levels[i][length].length - 1)
        : levels[i][length];
    result.push(` ${value} ${unit}`);
  }

  if (precision) {
    result = result.slice(0, precision);
  }
  // hacky drop last part
  for (var i = result.length - 1; i >= 0; i--) {
    if (result[i].substr(0, 3) == " 0 ") {
      result.splice(i, 1);
    }
  }
  return result.join(" ");
}
