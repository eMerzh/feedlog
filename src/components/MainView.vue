<template>
  <div>
    <router-link to="/history">History</router-link>
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
        <div class="jumbotron" v-if="latestFeeding">
          <p class="lead">Last feeding</p>
          <h1 class="display-3">
            <timecount :startTime="latestFeeding.date" :auto-update="1" :precision="2"></timecount>
            ago
            <small class="badge badge-default badge-pill">{{ latestFeeding.side }}</small>
          </h1>
        </div>
        <div v-else>
          No Feeding registered yet
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import store from '@/store';
import timecount from '@/components/TimeCount'
import two_digits from '../filters/two_digits'

export default {
  data() {
    return {
      isStarted: false,
      startedTime: null,
      selectedSide: 'left',
      sharedState: store.state,
    }
  },
  methods: {
    getNow: function () {
      return Math.trunc((new Date()).getTime() / 1000);
    },

    start: function (side) {
      this.isStarted = true;
      this.selectedSide = side;
      this.startedTime = this.getNow();
    },

    stop: function () {
      this.isStarted = false;
      store.addFeedItem(
        { date: this.startedTime, side: this.selectedSide, duration: this.getNow() - this.startedTime }
      );
    },
  },
  computed: {
    latestFeeding: function () {
      return this.sharedState.feedItems[this.sharedState.feedItems.length - 1];
    },
  },
  components: {
    timecount,
  },
  filters: {
    two_digits,
  }
}
</script>
