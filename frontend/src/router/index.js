import Vue from 'vue';
import VueRouter from 'vue-router';
import NotificacaoForm from '../views/NotificacaoForm.vue';
import NotificacaoCons from '../views/NotificacaoCons.vue';
import EvolucaoForm from '../views/EvolucaoForm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'notificacao-cons',
    component: NotificacaoCons,
  },
  {
    path: '/notificacao/cadastro',
    name: 'notificacao-form',
    component: NotificacaoForm,
  },
  {
    path: '/notificacao/:id/evolucoes',
    name: 'evolucao-form',
    component: EvolucaoForm,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
