import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import setHotjar from './hotjar';
import keycloak from './services/KeycloakService';
import FormatDocument from './plugins/document-mask';
import FormatPhone from './plugins/phone-mask';
import store from './store/index';

Vue.config.productionTip = false;

setHotjar();
keycloak.init({
  onLoad: 'login-required',
}).then(() => {
  Vue.use(FormatDocument);
  Vue.use(FormatPhone);
  Vue.use(Vuex);
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
});
