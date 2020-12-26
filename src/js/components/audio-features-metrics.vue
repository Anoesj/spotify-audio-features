<template>
  <div class="audio-features-metrics">
    <h2>Stats</h2>
    <audio-feature-metric
      v-for="(audioFeatureData, audioFeatureID) of inputData"
      :key="audioFeatureID"
      :audioFeatureID="audioFeatureID"
      :audioFeatureData="audioFeatureData"
      :statType="statType"
    />
  </div>
</template>

<script>
export default {
  props: [
    'inputData',
  ],

  data () {
    return {
      useMedian: true,
    };
  },

  computed: {
    statType () {
      return this.useMedian ? 'median' : 'average';
    },
  },
}
</script>
