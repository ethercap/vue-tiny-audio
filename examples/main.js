import Vue from 'vue';
import App from './App.vue';
import router from './router';

import VueAudio from '@/index.js';
Vue.use(VueAudio);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')