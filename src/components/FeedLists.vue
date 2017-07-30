<template>
  <div class="container">
    <router-link to="/">Back to main</router-link>

    <table class="table">
      <tr v-for="item in filteredItems">
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
      </tr>
      <span v-if="filteredItems.length < feedItemsLength">More ... </span>
    </table>
  </div>
</template>

<script>
import store from '@/store';

export default {
  data () {
    return {
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
  },
  computed: {
    filteredItems: function() {
      return this.sharedState.feedItems.slice(0, 4);
    },
    feedItemsLength: function() {
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
