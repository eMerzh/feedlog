<template>
  <span>
    {{ humanizeDuration }}</span>
</template>

<script>
/**
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds   The number of seconds to be processed
 * @param  {number} precision The number of time elements
 * @return {string}           The phrase describing the the amount of time
 */
function forHumans(seconds, precision) {
  var levels = [
    [Math.floor(seconds / 31536000), 'years'],
    [Math.floor((seconds % 31536000) / 86400), 'days'],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
    [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
  ];
  var result = [];

  for (var i = 0, max = levels.length; i < max; i++) {
    var value = levels[i][0];
    if (value === 0) continue;

    // take unit from array and remove plural form if value is 1
    var unit = (value === 1 ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1]);
    result.push(` ${value} ${unit}`);
  };
  if (precision) {
    result = result.slice(0, precision);
  }
  return result.join(' ');
}

export default {
  name: 'timecount',
  methods: {
    getNow: function () {
      return Math.trunc((new Date()).getTime() / 1000);
    },
    updateNow: function () {
      this.now = this.getNow();
    },
    update: function () {
      const period = this.autoUpdate * 1000
      this.interval = window.setInterval(() => {
        this.updateNow();
      }, period);
    },
    stopUpdate() {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  data: function () {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
    };
  },
  computed: {
    humanizeDuration: function () {
      return forHumans(this.now - this.startTime, this.precision);
    }
  },
  mounted: function () {
    if (this.autoUpdate) {
      this.update();
    }
  },
  beforeDestroy: function () {
    this.stopUpdate();
  },
  props: {
    startTime: {
      type: Number,
      coerce: str => Math.trunc(Date.parse(str) / 1000)
    },
    autoUpdate: {
      type: Number,
      default: 1,
    },
    precision: {
      type: Number,
      default: 3,
    },
  },
  watch: {
    autoUpdate(newAutoUpdate) {
      this.stopUpdate()
      // only update when it's not falsy value
      // which means you cans set it to 0 to disable auto-update
      if (newAutoUpdate) {
        this.update()
      }
    }
  },
}
</script>
