import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotificacaoForm from '../views/NotificacaoForm.vue';
import NotificacaoCons from '../views/NotificacaoCons.vue';
import EvolucaoForm from '../views/EvolucaoForm.vue';
import NotificacaoExportar from '../views/NotificacaoExportar.vue';

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
    path: '/notificacoes/:id',
    name: 'notificacao-view',
    component: NotificacaoForm,
  },
  {
    path: '/notificacoes/:id/evolucoes',
    name: 'evolucao-form',
    component: EvolucaoForm,
  },
  {
    path: '/notificacoes/exportar',
    name: 'exportar',
    component: NotificacaoExportar,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (router.app.$keycloak.authenticated) {
      next();
    } else {
      const loginUrl = router.app.$keycloak.createLoginUrl();
      window.location.replace(loginUrl);
    }
  } else {
    next();
  }
});

export default router;
