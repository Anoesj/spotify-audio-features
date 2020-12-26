// ESM imports
import { createApp } from 'vue';
import VueRangeSlider from 'vue-range-component/dist/vue-range-slider.esm.js';
import '../css/styles.css';

// Core
import App from './App.vue';
import { store } from './store.js';

// Views
import ViewStart from './views/view-start.vue';
import ViewTrack from './views/view-track.vue';
import ViewAlbum from './views/view-album.vue';
import ViewPlaylist from './views/view-playlist.vue';
import ViewSearch from './views/view-search.vue';

// Components
import TopbarSearch from './components/topbar/topbar-search.vue';
import TopbarCollection from './components/topbar/topbar-collection.vue';
import TestLinks from './components/test-links.vue';
import LoadingSpinner from './components/loading-spinner.vue';
import HelpSectionButton from './components/help-section-button.vue';
import SpotifyTrack from './components/spotify-track.vue';
import ToolBranding from './components/tool-branding.vue';

import IconCopyLink from './components/icons/icon-copy-link.vue';
import IconClose from './components/icons/icon-close.vue';
import IconPlay from './components/icons/icon-play.vue';
import IconPause from './components/icons/icon-pause.vue';
import IconDot from './components/icons/icon-dot.vue';
import IconPlus from './components/icons/icon-plus.vue';

import AudioFeaturesOverview from './components/audio-features-overview.vue';
import AudioFeaturesMetrics from './components/audio-features-metrics.vue';
import AudioFeatureMetric from './components/audio-feature-metric.vue';
import AudioFeatureTypeExplanation from './components/audio-feature-type-explanation.vue';

const app = createApp(App);

// Install custom extensions
app.use({
  install (app, options) {
    const listFormatter = new Intl.ListFormat('en', { style: 'short', type: 'conjunction' });
    app.config.globalProperties.$list = (...args) => listFormatter.format(...args);
  },
});

app.use(store);

const VueModal = window['vue-js-modal'].default;
console.log(VueModal);
// app.use(VueModal, {
//   dynamic: true,
// });

app.use(VueRangeSlider);

app.component('vue-multiselect', window.VueMultiselect.default); // no ESM option available

app.component('view-start', ViewStart);
app.component('view-track', ViewTrack);
app.component('view-album', ViewAlbum);
app.component('view-playlist', ViewPlaylist);
app.component('view-search', ViewSearch);

app.component('topbar-search', TopbarSearch);
app.component('topbar-collection', TopbarCollection);
app.component('test-links', TestLinks);
app.component('loading-spinner', LoadingSpinner);
app.component('help-section-button', HelpSectionButton);
app.component('spotify-track', SpotifyTrack);
app.component('tool-branding', ToolBranding);

app.component('icon-copy-link', IconCopyLink);
app.component('icon-close', IconClose);
app.component('icon-play', IconPlay);
app.component('icon-pause', IconPause);
app.component('icon-dot', IconDot);
app.component('icon-plus', IconPlus);

app.component('audio-features-metrics', AudioFeaturesMetrics);
app.component('audio-feature-metric', AudioFeatureMetric);
app.component('audio-features-overview', AudioFeaturesOverview);
app.component('audio-features-type-explanation', AudioFeatureTypeExplanation);

app.mount('body');
