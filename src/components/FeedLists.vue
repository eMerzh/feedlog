<template>
  <div class="container">
    <router-link to="/">Back to main</router-link>
    <div class="card mb-3" v-for="(filteredItems, groupedDate) in DaysItems">
      <div class="card-block">
        <div class="row">
          <div class="col text-left">
            <small class="text-muted">{{ groupedDate }}</small>
          </div>
          <div class="col text-right">
            <small class="text-muted">{{ filteredItems.length }} items</small>
          </div>
        </div>

        <table class="table">
          <tr v-for="(item, index) in filteredItems" v-bind:class="{'table-active': item.isRunning}">
            <td>
              <span class="badge badge-default">
                {{ item.side }}
              </span>
            </td>
            <td>
              {{ formatDate(item.date) }}
            </td>
            <td>
              <span class="text-mutated">
                {{ item.duration }}s
              </span>
            </td>
            <td>
              <button class="btn btn-outline-danger" v-on:click="removeRow(index, item)">
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
import { groupBy, orderBy, slice } from 'lodash';

/**
 * Return a date object from an epoch
 * @param  {number} epoch the number of seconds from 1970
 * @return  {Date} a Date object
 */
function getDateFromEpoch(epoch) {
  var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(epoch);

  return date;
}


export default {
  data() {
    return {
      sharedState: store.state,
    };
  },
  methods: {
    formatDate(epoch) {
      var date = getDateFromEpoch(epoch);
      var options = {
        year: "numeric", month: "numeric",
        day: "numeric", hour: "2-digit", minute: "2-digit"
      };
      return date.toLocaleTimeString("en-GB", options);
    },
    removeRow: function (index, item) {
      store.removeFeedRow(index);
    },
  },

  computed: {
    DaysItems: function () {
      return groupBy(
        orderBy(this.sharedState.feedItems, ['date'], ['desc']),
        // Hack to get the date as YYYY-MM-DD
        (i) => getDateFromEpoch(i.date).toISOString().split('T')[0]
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
ul {
  list-style-type: none;
  padding: 0;
}
</style>
