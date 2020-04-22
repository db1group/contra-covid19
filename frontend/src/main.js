import Vue from 'vue';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueKeyCloak, {
  config: {
    url: `${process.env.VUE_APP_KEYCLOAK_URL}`,
    realm: `${process.env.VUE_APP_REALM || 'notificasaude'}`,
    clientId: `${process.env.VUE_APP_CLIENT_ID || 'webapp'}`,
  },
  onReady: () => new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app'),
});
