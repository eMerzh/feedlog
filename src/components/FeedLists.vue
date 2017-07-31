<template>
  <div class="container">
    <router-link to="/">Back to main</router-link>

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
      <!-- TODO: dummy Page -->
      <button class="btn btn-default" v-if="filteredItems.length < totalFeedItemsLength" @click="showMore">
        More ...
      </button>
    </table>
  </div>
</template>

<script>
import store from '@/store';
import { orderBy, slice } from 'lodash';

export default {
  data() {
    return {
      feedItemsLength: 10,
      sharedState: store.state,
    };
  },
  methods: {
    formatDate(epoch) {
      var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(epoch);
      var options = {
        year: "numeric", month: "numeric",
        day: "numeric", hour: "2-digit", minute: "2-digit"
      };
      return date.toLocaleTimeString("en-GB", options);
    },
    removeRow: function (index, item) {
      store.removeFeedRow(index);
    },
    showMore() {
      this.feedItemsLength = this.feedItemsLength + 10;
    }
  },
  computed: {
    filteredItems: function () {
      return slice(
        orderBy(this.sharedState.feedItems, ['date'], ['desc']),
        0, this.feedItemsLength
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
