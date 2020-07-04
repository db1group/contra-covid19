import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotificacaoForm from '../views/NotificacaoForm.vue';
import NotificacaoCons from '../views/NotificacaoCons.vue';
import FechamentoDiario from '../views/FechamentoDiario.vue';
import EvolucaoForm from '../views/EvolucaoForm.vue';
import NotificacaoExportar from '../views/NotificacaoExportar.vue';
import UnidadeSaudeCons from '../views/UnidadeSaudeCons.vue';
import UnidadeSaudeForm from '../views/UnidadeSaudeForm.vue';
import ControleLeitosCons from '../views/ControleLeitosCons.vue';
import ControleLeitosForm from '../views/ControleLeitosForm.vue';

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
    path: '/notificacoes/:id/view',
    name: 'notificacao-view',
    component: NotificacaoForm,
  },
  {
    path: '/notificacoes/:id/edit',
    name: 'notificacao-edit',
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
  {
    path: '/fechamento',
    name: 'fechamento-diario',
    component: FechamentoDiario,
  },
  {
    path: '/unidades-saude',
    name: 'unidades-saude-cons',
    component: UnidadeSaudeCons,
  },
  {
    path: '/unidades-saude/cadastro',
    name: 'unidades-saude-form',
    component: UnidadeSaudeForm,
  },
  {
    path: '/unidades-saude/:id/edit',
    name: 'unidades-saude-edit',
    component: UnidadeSaudeForm,
    props: { edit: true },
  },
  {
    path: '/controle-leitos',
    name: 'controle-leitos-cons',
    component: ControleLeitosCons,
  },
  {
    path: '/controle-leitos/cadastro',
    name: 'controle-leitos-form',
    component: ControleLeitosForm,
  },
  {
    path: '/controle-leitos/:id/edit',
    name: 'controle-leito-edit',
    component: ControleLeitosForm,
    props: { edit: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
