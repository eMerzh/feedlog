<template>
  <span>
    {{ humanizeDuration }}</span>
</template>

<script>
import { forHumans } from '@/utils';

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
      if (this.endTime) {
        return forHumans(this.endTime - this.startTime, this.precision);
      } else {
        return forHumans(this.now - this.startTime, this.precision);
      }
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
    endTime: {
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
