<template>
<div>Hello {{ startTime }}
  {{ now - startTime }}
</div>
</template>

<script>
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
  mounted: function() {
    console.log('bol', this);
    window.setInterval(() => {
      this.updateNow();
    }, 3000);
  },
  props: {
    startTime: {
      type: Number,
      coerce: str => Math.trunc(Date.parse(str) / 1000)
    }
  }
}
</script>
