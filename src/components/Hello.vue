<template>
  <div class="hello">
    <feedlist :items="feedItems" />
    <template v-if="isStarted">
      <div class="container">
        <div class="row">
          <button class="btn btn-danger btn-lg btn-block" @click="stop()">Stop</button>
        </div>
        <div class="jumbotron">
          <p class="lead">Started since :</p>
          <h1 class="display-3">
            <timecount :startTime="startedTime"></timecount>
            <small class="badge badge-primary badge-pill">{{ selectedSide }}</small>
          </h1>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container">
        <div class="row">
          <div class="col">
            <button class="btn btn-outline-primary btn-block" @click="start('left')">Left</button>
          </div>
          <div class="col">
            <button class="btn btn-outline-primary btn-block" @click="start('right')">Right</button>
          </div>
        </div>
        <div class="jumbotron">
          <p class="lead">Last feeding</p>
          <h1 class="display-3">
            <timecount :startTime="latestFeeding.date" :auto-update="1" :precision="2"></timecount>
            ago
            <small class="badge badge-default badge-pill">{{ latestFeeding.side }}</small>
          </h1>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import feedlist from '@/components/feedlist'
import timecount from '@/components/TimeCount'
import two_digits from '../filters/two_digits'

export default {
  data () {
    return {
      isStarted: false,
      startedTime: null,
      selectedSide: 'left',
      feedItems: [
        {date: Math.trunc((new Date()).getTime() / 1000)- 60*60*6 - 64, side: 'left'},
        {date: Math.trunc((new Date()).getTime() / 1000) - 60*60*2 - 64, side: 'left'},
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
  computed: {
    latestFeeding: function() {
      return this.feedItems[this.feedItems.length - 1];
    },
  },
  components: {
    feedlist,
    timecount,
  },
  filters: {
    two_digits,
  }
}
</script>
