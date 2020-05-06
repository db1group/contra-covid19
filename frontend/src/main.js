import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import setHotjar from './hotjar';
import keycloak from './services/KeycloakService';
import FormatDocument from './plugins/document-mask';
import FormatPhone from './plugins/phone-mask';

Vue.config.productionTip = false;

setHotjar();
keycloak.init({
  onLoad: 'login-required',
}).then(() => {
  Vue.use(FormatDocument);
  Vue.use(FormatPhone);
  new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
});
