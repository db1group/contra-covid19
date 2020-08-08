<template>
  <section style="margin-top: 45px;">
    <config-form :id="configId" />
  </section>
</template>

<script>
import ConfigForm from '@/components/TenantConfig/ConfigForm.vue';

export default {
  components: {
    ConfigForm,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    configId: null,
  }),
  methods: {
    editarConfig(id) {
      this.configId = id;
    },
  },
  beforeRouteEnter(to, from, next) {
    const { id, edit } = to.params;
    let enter = true;
    if (edit) {
      enter = (vm) => vm.editarConfig(id);
    }
    next(enter);
  },
};
</script>
