<template>
  <div class="container-fluid">
    <router-link class="router-link" to="/">Back to main</router-link>
    <div class="card mb-3" v-for="(filteredItems, groupedDate) in DaysItems">
      <div class="card-block">
        <div class="row">
          <div class="col text-left">
            <span class="text-muted">{{ groupedDate }}</span>
          </div>
          <div class="col text-right">
            <small class="text-muted">{{ filteredItems.length }} items</small>
          </div>
        </div>

        <table class="table">
          <tr v-for="(item, index) in filteredItems" v-bind:class="{'table-active': item.isRunning}">
            <td>
              <span class="badge badge-primary">
                {{ item.side }}
              </span>
              <br />
              <small>
                <timecount :startTime="item.date" :endTime="item.date + item.duration" :autoUpdate="0" :length="2" :precision="1"></timecount>
              </small>
            </td>
            <td>
              {{ formatTime(item.date) }}
              <div class="small text-muted" v-if="item.previousDate">
                after
                <timecount :startTime="item.previousDate" :endTime="item.date" :autoUpdate="0" :length="2"></timecount>
              </div>
            </td>
            <td>
              <button class="btn btn-outline-danger" v-on:click="removeRow(item)">
                🗑
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import timecount from '@/components/TimeCount'
import { getDateFromEpoch } from '@/utils'

import { findIndex, forEachRight, groupBy, orderBy, slice } from 'lodash';


export default {
  components: {
    timecount,
  },
  data() {
    return {
      sharedState: store.state,
      dateFormatOptions: {
        year: "numeric", month: "numeric",
        day: "numeric", hour: "2-digit", minute: "2-digit"
      }
    };
  },
  methods: {
    formatDateTime(epoch) {
      var date = getDateFromEpoch(epoch);
      return date.toLocaleTimeString("en-GB", this.dateFormatOptions);
    },
    formatDate(epoch) {
      // Hack to get the date as YYYY-MM-DD
      return this.formatDateTime(epoch).split(',')[0]
    },
    formatTime(epoch) {
      // Hack to get the date as YYYY-MM-DD
      return this.formatDateTime(epoch).split(',')[1]
    },
    removeRow: function (item) {
      store.removeFeedRow(
        findIndex(this.sharedState.feedItems, { 'date': item.date })
      );
    },
  },

  computed: {
    DaysItems: function () {
      var prevDate = null;
      return groupBy(
        forEachRight(
          orderBy(this.sharedState.feedItems, ['date'], ['desc']),
          (e) => {
            e.previousDate = prevDate;
            prevDate = e.date;
          }
        ),
        (i) => this.formatDate(i.date)
      );
    },
    totalFeedItemsLength: function () {
      return this.sharedState.feedItems.length;
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.router-link {
  margin-bottom: 20px;
  display: block;
}
</style>
