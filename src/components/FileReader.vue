<template>
  <input type="file" @change="onFileChange">
</template>

<script>
export default {
  data() {
    return { file: null };
  },
  methods: {
    onFileChange(event) {
      var files = event.target.files || event.dataTransfer.files;

      if (!files.length)
        return;
      this.loadContent(files[0]);
      event.target.value = '';

    },
    loadContent(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        this.$emit('onLoad', e.target.result);
        this.file = null;
      };
      reader.readAsText(file);
    },
  }
};
</script>
