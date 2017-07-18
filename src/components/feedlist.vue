<template>
  <ul>
    <li v-for="item in items">
      {{ item.side }} => {{ item.date }} ( {{ item.duration }}s)
    </li>
  </ul>
</template>

<script>
export default {
  name: 'feedlist',
  props: ['items']
}
</script>
