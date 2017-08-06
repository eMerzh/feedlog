<template>
  <div>
    <h2>
      Import from FeedLogger
    </h2>
    <label class="custom-file">
      <filereader @onLoad="parseFile" class="custom-file-input" />
      <span class="custom-file-control"></span>
    </label>

    <h2>Clear History</h2>
    <button class="btn btn-outline-danger" @click="clearHistory">Clear</button>
  </div>
</template>

<script>
import filereader from '@/components/FileReader';
import store from '@/store';

export default {
  methods: {
    clearHistory() {
      store.clearHistory();
    },
    parseFile(content) {
      this.loadImport(
        this.prepContent(
          this.parseContent(content)
        )
      );
    },
    loadImport(rows) {
      for (var i = 1; i < rows.length; i++) {
        store.addFeedItem(rows[i]);
      }
      store.sort();
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
      // @TODO: make sure we have a content :D
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
  },
  components: {
    filereader,
  }
}
</script>
<style scoped>
h2 {
  text-decoration: underline;
  text-decoration-color: lightgray;
  margin-bottom: 25px;
  margin-top: 25px;
}
</style>

