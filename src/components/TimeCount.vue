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
    this.interval = window.setInterval(() => {
      this.updateNow();
    }, 1000);
  },
  beforeDestroy: function() {
    clearInterval(this.interval);
  },
  props: {
    startTime: {
      type: Number,
      coerce: str => Math.trunc(Date.parse(str) / 1000)
    },
  },
  filters: {
    two_digits
  }
}
</script>
