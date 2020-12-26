<template>
  <div
    id="app"
    @dragenter.capture.prevent.stop="draggingOver = true"
    @dragover.capture.prevent.stop
    @dragleave.self.capture.prevent.stop="draggingOver = false"
    @drop.capture.prevent.stop="testDroppedData"
    :class="{
      'drag-over': draggingOver,
    }"
  >
    <header class="topbar">
      <topbar-search/>
      <topbar-collection/>
    </header>

    <test-links v-if="debug === true"/>

    <main class="results">
      <loading-spinner v-if="searching === true" type="large"/>

      <p v-if="searching === false && errored === true" v-html="errorMsg"></p>

      <component
        v-if="searching === false && errored === false"
        :is="currentView"
        v-bind="currentViewData"
      />
    </main>

    <footer class="branding-wrapper">
      <tool-branding/>
    </footer>

    <help-section-button/>
    <modals-container/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  created () {
    // Since Vuex actions are technically async, we can't assume 'setup' is done on mounted. That's why we use a watch.
    this.$store.dispatch('setup');
  },

  data () {
    return {
      draggingOver: false,
    };
  },

  computed: {
    ...mapState([
      'debug',
      'setupComplete',
      'searching',
      'errored',
      'errorMsg',
      'currentView',
      'currentViewData',
    ]),
  },

  watch: {
    // Since Vuex action 'setup' is technically async, we can't assume it is done on mounted. That's why we use a watch.
    setupComplete: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal === true) {
          // Instantly search prefilled track
          this.$store.dispatch('doSearch');

          // This only triggers when navigating back/forward
          window.addEventListener('popstate', (event) => {
            this.$store.commit('setSpotifyUrlFromSearchParams');
            this.$store.dispatch('doSearch');
          });
        }
      },
    },
  },

  methods: {
    testDroppedData (event) {
      try {
        const possibleSpotifyUrl = event.dataTransfer.getData('text/uri-list');

        if (possibleSpotifyUrl) {
          this.$store.dispatch('enterUrl', possibleSpotifyUrl);
        }
      }

      finally {
        this.draggingOver = false;
      }
    },
  },
}
</script>