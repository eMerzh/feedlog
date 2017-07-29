<template>
  <div>
    <router-link to="/">Back to main</router-link>

    <ul class="list-group">
      <li class="list-group-item" v-for="item in filteredItems">
        {{ item.side }} => {{ item.date }} ( {{ item.duration }}s)
      </li>
      <span v-if="filteredItems.length < feedItemsLength">More ... </span>
    </ul>
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
