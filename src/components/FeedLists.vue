<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="item in filteredItems">
      {{ item.side }} => {{ item.date }} ( {{ item.duration }}s)
    </li>
    <span v-if="filteredItems.length < items.length">More ... </span>
  </ul>
</template>

<script>
export default {
  props: ['items'],
  computed: {
    filteredItems: function() {
      return this.items.slice(0, 4);
    }
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
