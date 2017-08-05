<template>
  <div>
    <filereader @onLoad="parseFile" />
    <router-link class="router-link" to="/history">History</router-link>
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
import timecount from '@/components/TimeCount'
import filereader from '@/components/FileReader'

export default {
  data() {
    return {
      sharedState: store.state,
    }
  },
  methods: {
    parseFile(content) {

      this.loadImport(
        this.prepContent(
          this.parseContent(content)
        )
      )
        ;
    },
    loadImport(rows) {
      rows.sort(function (a, b) {
        return a.date - b.date;
      });
      for (var i = 1; i < rows.length; i++) {
        store.addFeedItem(rows[i]);
      }
    },
    prepContent(rows) {
      var objects = [];
      for (var i = 1; i < rows.length; i++) {
        var dateParts = rows[i]['Start Time'].split(/ |\/|:/);
        var hour = parseInt(dateParts[3], 10);
        if (dateParts[5] === 'PM') {
          hour += 12;
        }
        var month = parseInt(dateParts[1], 10) - 1;
        var date = new Date(dateParts[2], month, dateParts[0], hour, dateParts[4])
        var durationParts = rows[i]['Duration'].split(/:/);
        var duration = parseInt(durationParts[1], 10) + (parseInt(durationParts[0], 10) * 60);
        var obj = {
          date: date.getTime() / 1000, // "15/07/2017 11:08s AM"
          side: rows[i]['Side'].toLowerCase(),
          duration: duration, // "25:39"
        };

        objects.push(obj);
      }

      return objects;
    },
    parseContent(content) {
      var contentLines = content.split(/\r\n|\n/);
      // @TODO: make sure we have a content :)
      var headers = contentLines[0].split(',');
      var lines = [];
      // start at 1, skip headers
      for (var i = 1; i < contentLines.length; i++) {
        var data = contentLines[i].split(',');
        if (data.length == headers.length) {
          var row = {};
          for (var j = 0; j < headers.length; j++) {
            row[headers[j]] = data[j];
          }
          lines.push(row);
        }
      }

      return lines;
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
    filereader,
  }
}
</script>
<style scoped>
.router-link {
  margin-bottom: 20px;
  display: block;
}
</style>
