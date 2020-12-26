<template>
  <span class="icon-close clickable" :title="title" @click="$emit('close')"></span>
</template>

<script>
export default {
  props: {
    'title': {
      type: String,
      default: 'Close',
    },
  },
};
</script>