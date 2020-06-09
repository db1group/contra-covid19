<template>
  <section style="margin-top: 45px;">
    <header-title :title="title" backRoute="unidades-saude-cons" />
    <unidade-saude-form />
  </section>
</template>

<script>
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import UnidadeSaudeForm from '@/components/UnidadeSaude/UnidadeSaudeForm.vue';
import StateForm from '@/entities/StateForm';

export default {
  components: {
    HeaderTitle,
    UnidadeSaudeForm,
  },
  data: () => ({
    stateForm: StateForm.NEW,
  }),
  computed: {
    title() {
      switch (this.stateForm) {
        case StateForm.VIEW: return 'Visualizar Unidade de Saúde';
        case StateForm.EDIT: return 'Editar Unidade de Saúde';
        default: return 'Cadastrar Unidade de Saúde';
      }
    },
  },
  methods: {

  },
};
</script>
