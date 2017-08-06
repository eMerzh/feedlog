<template>
  <div>
    <template v-if="isStarted">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <button class="btn btn-danger btn-lg btn-block" @click="stop()">Stop</button>
          </div>
        </div>
        <div class="jumbotron">
          <p class="lead">Started since :</p>
          <h1 class="display-4">
            <timecount :startTime="startedTime"></timecount>
            <br />
            <small class="badge badge-primary badge-pill">{{ selectedSide }}</small>
          </h1>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container-fluid">
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
          <h1 class="display-5">
            <timecount :startTime="latestFeeding.date" :auto-update="1" :precision="2" :length="2"></timecount>
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
import timecount from '@/components/TimeCount';

export default {
  data() {
    return {
      sharedState: store.state,
      navBarShown: false,
    }
  },
  methods: {
    toggleNavbar() {
      this.navBarShown = !this.navBarShown;
    },
    getNow: function () {
      return Math.trunc((new Date()).getTime() / 1000);
    },

    start: function (side) {
      store.startFeeding(side, this.getNow());
    },

    stop: function () {
      store.stopFeeding(this.getNow() - this.startedTime);
    },
  },
  computed: {
    latestFeeding() {
      return this.sharedState.feedItems[this.sharedState.feedItems.length - 1];
    },
    isStarted() {
      return this.latestFeeding && this.latestFeeding.isRunning;
    },
    startedTime() {
      if (this.isStarted) {
        return this.latestFeeding.date;
      }
    },
    selectedSide() {
      if (this.isStarted) {
        return this.latestFeeding.side;
      }
    },
  },
  components: {
    timecount,
  }
}
</script>
<style scoped>
.router-link {
  margin-bottom: 20px;
  display: block;
}
</style>
