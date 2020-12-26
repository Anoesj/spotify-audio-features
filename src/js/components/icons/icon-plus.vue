<template>
  <span
    class="icon-plus"
    :class="{
      'added': added,
      'clickable': clickable,
    }"
    @click.stop="$emit('clicked')"
  ></span>
</template>

<script>
export default {
  props: {
    clickable: {
      type: Boolean,
      default: true,
    },
    added: {
      type: Boolean,
      default: false,
    },
  },
};
</script>