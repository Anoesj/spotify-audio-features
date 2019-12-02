// ESM imports
import Vue from '/node_modules/vue/dist/vue.esm.browser.js';
import { mapState } from '/node_modules/vuex/dist/vuex.esm.browser.js';
import VueRangeSlider from '/node_modules/vue-range-component/dist/vue-range-slider.esm.js';

// Core
import { store } from './store.js';

// Views
import { ViewStart } from './views/view-start.js';
import { ViewTrack } from './views/view-track.js';
import { ViewAlbum } from './views/view-album.js';
import { ViewPlaylist } from './views/view-playlist.js';
import { ViewSearch } from './views/view-search.js';

// Components
import { SearchBar } from './components/search-bar.js';
import { ToolbarTestLinks } from './components/toolbar/toolbar-test-links.js';
import { ToolbarCollection } from './components/toolbar/toolbar-collection.js';
import { LoadingSpinner } from './components/loading-spinner.js';
import { SpotifyTrack } from './components/spotify-track.js';

import { AudioFeaturesOverview } from './components/audio-features-overview.js';
import { AudioFeaturesMetrics } from './components/audio-features-metrics.js';
import { AudioFeatureMetric } from './components/audio-feature-metric.js';

Vue.prototype.$listFormatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });

Vue.use(VueRangeSlider);

Vue.component('vue-multiselect', window.VueMultiselect.default); // no ESM option available

Vue.component('view-start', ViewStart);
Vue.component('view-track', ViewTrack);
Vue.component('view-album', ViewAlbum);
Vue.component('view-playlist', ViewPlaylist);
Vue.component('view-search', ViewSearch);

Vue.component('search-bar', SearchBar);
Vue.component('toolbar-test-links', ToolbarTestLinks);
Vue.component('toolbar-collection', ToolbarCollection);
Vue.component('loading-spinner', LoadingSpinner);
Vue.component('audio-features-metrics', AudioFeaturesMetrics);
Vue.component('audio-feature-metric', AudioFeatureMetric);
Vue.component('audio-features-overview', AudioFeaturesOverview);
Vue.component('spotify-track', SpotifyTrack);

// FIXME: dragstart -> can't select/right click or something.

new Vue({

  el: '#app',

  store,

  template:  `<div id="app"
                @dragenter.capture.prevent.stop="draggingOver = true"
                @dragover.capture.prevent.stop
                @dragleave.self.capture.prevent.stop="draggingOver = false"
                @drop.capture.prevent.stop="testDroppedData"
                :class="{
                  'drag-over': draggingOver,
                }"
              >
                <search-bar/>

                <section class="toolbar">
                  <toolbar-test-links/>
                  <toolbar-collection/>
                </section>

                <section class="results-panel">
                  <loading-spinner v-if="searching === true" type="large"/>

                  <p v-if="searching === false && errored === true" v-html="errorMsg"></p>

                  <component
                    v-if="searching === false && errored === false"
                    :is="currentView"
                    v-bind="currentViewData"
                  />
                </section>
              </div>`,

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

});
