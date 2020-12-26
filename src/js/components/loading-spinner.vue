<template>
  <div class="loading-spinner" :class="type"></div>
</template>

<script>
export default {
  props: {
    'type': {
      type: String,
      default: 'small',
    },
  },
};
</script>
