<template>
  <section style="margin-top: 45px;">
    <unidade-saude-form :id="unidadeId" />
  </section>
</template>

<script>
import UnidadeSaudeForm from '@/components/UnidadeSaude/UnidadeSaudeForm.vue';

export default {
  components: {
    UnidadeSaudeForm,
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
