<template>
<div>
    <span>{{ hours | two_digits }}</span>:
    <span>{{ minutes | two_digits }}</span>:
    <span>{{ seconds | two_digits }}</span>
</div>
</template>

<script>
import two_digits from '../filters/two_digits'

export default {
  name: 'timecount',
  methods: {
    getNow: function() {
      return Math.trunc((new Date()).getTime() / 1000);
    },
    updateNow: function() {
      this.now = this.getNow();
    },
    update: function() {
      const period = this.autoUpdate * 1000
      this.interval = window.setInterval(() => {
        this.updateNow();
      }, period);
    },
    stopUpdate() {
      clearInterval(this.interval)
      this.interval = null
    }
  },
  data: function() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
    };
  },
  computed: {
    seconds: function() {
      return (this.now - this.startTime) % 60;
    },
    minutes: function() {
      return Math.trunc((this.now - this.startTime) / 60) % 60;
    },
    hours: function() {
      return Math.trunc((this.now - this.startTime) / 60 / 60) % 60;
    },
  },
  mounted: function() {
    if (this.autoUpdate) {
      this.update();
    }
  },
  beforeDestroy: function() {
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
    }
  },
  filters: {
    two_digits
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
