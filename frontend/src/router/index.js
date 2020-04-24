import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotificacaoForm from '../views/NotificacaoForm.vue';
import NotificacaoCons from '../views/NotificacaoCons.vue';
import EvolucaoForm from '../views/EvolucaoForm.vue';
import Configuration from '../configuration';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: Home,
  },
  {
    path: '/notificacoes',
    name: 'notificacao-cons',
    component: NotificacaoCons,
  },
  {
    path: '/notificacoes/cadastro',
    name: 'notificacao-form',
    component: NotificacaoForm,
  },
  {
    path: '/notificacoes/:id/evolucoes',
    name: 'evolucao-form',
    component: EvolucaoForm,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: Configuration.value('VUE_APP_BASE_URL'),
  routes,
});

export default router;
