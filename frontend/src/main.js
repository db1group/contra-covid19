import Vue from 'vue';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Configuration from './configuration';

Vue.config.productionTip = false;

console.log(`Valor da env: ${process.env.VUE_APP_ANY_VARIABLE}`);

Vue.use(VueKeyCloak, {
  config: {
    url: `${Configuration.value('VUE_APP_KEYCLOAK_URL')}`,
    realm: `${Configuration.value('VUE_APP_KEYCLOAK_REALM')}`,
    clientId: `${Configuration.value('VUE_APP_KEYCLOAK_CLIENT_ID')}`,
  },
  onReady: () => new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app'),
});
