<template>
  <section style="margin-top: 45px;">
    <usuario-form :id="usuarioId" />
  </section>
</template>

<script>
import UsuarioForm from '@/components/Usuario/UsuarioForm.vue';

export default {
  components: {
    UsuarioForm,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    usuarioId: null,
  }),
  methods: {
    editarUsuario(id) {
      this.usuarioId = id;
    },
  },
  beforeRouteEnter(to, from, next) {
    const { id, edit } = to.params;
    let enter = true;
    if (edit) {
      enter = (vm) => vm.editarUsuario(id);
    }
    next(enter);
  },
};
</script>
