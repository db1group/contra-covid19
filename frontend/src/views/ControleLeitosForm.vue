<template>
  <section style="margin-top: 45px;">
    <header-controle-leitos />
    <controle-leitos-form :id="unidadeId"  />
  </section>
</template>

<script>
import ControleLeitosForm from '@/components/ControleLeitos/ControleLeitosForm.vue';
import HeaderControleLeitos from '@/components/ControleLeitos/HeaderControleLeitos.vue';

export default {
  components: {
    ControleLeitosForm,
    HeaderControleLeitos,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    unidadeId: null,
  }),
  methods: {
    editarUnidade(id) {
      this.unidadeId = id;
    },
  },
  beforeRouteEnter(to, from, next) {
    const { id, edit } = to.params;
    let enter = true;
    if (edit) {
      enter = (vm) => vm.editarUnidade(id);
    }
    next(enter);
  },
};
</script>
