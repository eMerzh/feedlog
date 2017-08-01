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
 * @return {string}           The phrase describing the the amount of time
 */
export function forHumans(seconds, precision) {
  var levels = [
    [Math.floor(seconds / 31536000), "years"],
    [Math.floor(seconds % 31536000 / 86400), "days"],
    [Math.floor(seconds % 31536000 % 86400 / 3600), "hours"],
    [Math.floor(seconds % 31536000 % 86400 % 3600 / 60), "minutes"],
    [seconds % 31536000 % 86400 % 3600 % 60, "seconds"]
  ];
  var result = [];

  for (var i = 0, max = levels.length; i < max; i++) {
    var value = levels[i][0];
    if (value === 0) continue;

    // take unit from array and remove plural form if value is 1
    var unit =
      value === 1
        ? levels[i][1].substr(0, levels[i][1].length - 1)
        : levels[i][1];
    result.push(` ${value} ${unit}`);
  }
  if (precision) {
    result = result.slice(0, precision);
  }
  return result.join(" ");
}
