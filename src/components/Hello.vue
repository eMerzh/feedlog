<template>
  <div class="hello">
    <feedlist :items="feedItems" />
    <template v-if="isStarted">
        <timecount :startTime="startedTime"></timecount>
        <button @click="stop()">Stop</button>
    </template>
    <template v-else>
      <button @click="start('left')">Left</button>
      <button @click="start('right')">Right</button>
    </template>


  </div>
</template>

<script>
import feedlist from '@/components/feedlist'
import timecount from '@/components/TimeCount'

export default {
  name: 'hello',
  data () {
    return {
      isStarted: false,
      startedTime: null,
      selectedSide: 'left',
      feedItems: [
        {date: Math.trunc((new Date()).getTime() / 1000), side: 'left'},
        {date: Math.trunc((new Date()).getTime() / 1000), side: 'left'},
      ],
    }
  },
  methods: {
    getNow: function() {
      return Math.trunc((new Date()).getTime() / 1000);
    },

    start: function(side) {
      this.isStarted = true;
      this.selectedSide = side;
      this.startedTime = this.getNow();
    },

    stop: function() {
      this.isStarted = false;
      this.feedItems.push(
        {date: this.startedTime, side:this.selectedSide, duration: this.getNow() - this.startedTime}
      );
    },

  },
  components: {
    feedlist,
    timecount,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

button {
  color: #42b983;
}
</style>
