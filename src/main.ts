import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlay, faPause, faRotate, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

library.add(faPlay, faPause, faRotate, faUser, faSpotify )

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component('v-icon', FontAwesomeIcon)
app.mount('#app');
