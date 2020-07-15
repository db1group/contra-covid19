<template>
  <section style="margin-top: 45px;">
    <controle-leitos-form :id="unidadeId"  />
  </section>
</template>

<script>
import ControleLeitosForm from '@/components/ControleLeitos/ControleLeitosForm.vue';

export default {
  components: {
    ControleLeitosForm,
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
