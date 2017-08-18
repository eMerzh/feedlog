<template>
  <div class="container-fluid">
    <div class="card mb-3" v-for="(filteredItems, groupedDate) in DaysItemsLimited">
      <div class="card-block">
        <div class="row">
          <div class="col text-left block-date">
            <span class="text-muted">{{ groupedDate }}</span>
          </div>
          <div class="col text-right block-items-count">
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
    <button class="btn btn-secondary" @click="displayMore" v-if="originalDaysNumber >= daysToDisplay">
      More
    </button>
  </div>
</template>

<script>
import store from '@/store';
import timecount from '@/components/TimeCount'
import { getDateFromEpoch } from '@/utils'

import findIndex from 'lodash/findIndex';
import forEachRight from 'lodash/forEachRight';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import slice from 'lodash/slice';


export default {
  components: {
    timecount,
  },
  data() {
    return {
      daysToDisplay: 3,
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
    displayMore() {
      this.daysToDisplay += 3;
    }
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
    originalDaysNumber() {
      return Object.keys(this.DaysItems).length;
    },
    DaysItemsLimited() {
      var allkeys = Object.keys(this.DaysItems);
      var results = {};
      allkeys.forEach((date) => {
        if (Object.keys(results).length > this.daysToDisplay) {
          return;
        }
        results[date] = this.DaysItems[date];
      });
      return results;
    },
    totalFeedItemsLength: function () {
      return this.sharedState.feedItems.length;
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block-date {
  margin-left: 15px;
}

.block-items-count {
  margin-right: 15px;
}

.table {
  table-layout: fixed;
}
</style>
