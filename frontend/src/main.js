import Vue from 'vue';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Configuration from './configuration';
import onReadyApp from './ready';
import setHotjar from './hotjar';
import Logged from './plugins/logged';
import FormatDocument from './plugins/document-mask';
import FormatPhone from './plugins/phone-mask';

Vue.config.productionTip = false;

setHotjar();
const loggedReady = (scoped) => {
  onReadyApp(scoped);
  new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
};

Vue.use(FormatDocument);
Vue.use(FormatPhone);
Vue.use(VueKeyCloak, {
  config: {
    url: `${Configuration.value('VUE_APP_KEYCLOAK_URL')}`,
    realm: `${Configuration.value('VUE_APP_KEYCLOAK_REALM')}`,
    clientId: `${Configuration.value('VUE_APP_KEYCLOAK_CLIENT_ID')}`,
  },
  onReady: (kc) => {
    Vue.use(Logged, {
      keycloak: kc,
      onReady: loggedReady,
    });
  },
});
