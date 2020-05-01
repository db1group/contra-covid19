import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import setHotjar from './hotjar';
import keycloak from './services/KeycloakService';

Vue.config.productionTip = false;

setHotjar();

keycloak.init({
  onLoad: 'login-required',
}).then(() => {
  new Vue({
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
});
