<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="list"
      item-key="id"
      @update:options="consultarConfig"
      :loading="loading"
      loading-text="Carregando as configurações."
      no-data-text="Não há configurações até o momento."
      no-results-text="Não há configurações com estes dados."
      :footer-props="{
        pageText: '{0}-{1} de {2}',
        itemsPerPageText: 'Linhas por página',
        itemsPerPageOptions: [10, 30, 50, 100],
      }"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-row>
            <v-col>
              <v-text-field
                @input="filterSearch"
                append-icon="mdi-magnify"
                label="Pesquisar por Responsável, e-mail ou Município"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row justify="end" align="center" dense>
          <v-col>
            <v-btn
              text
              small
              color="#F54D09"
              :to="{ name: 'tenant-config-edit', params: { id: item.id, edit: true } }"
            >EDITAR</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import TenantConfigService from '@/services/TenantConfigService';
import TenantConfig from '@/entities/TenantConfig';
import ErrorService from '@/services/ErrorService';

export default {
  data: () => ({
    items: [],
    loading: true,
    totalConfig: 0,
    configs: [],
    filter: '',
    filterCons: null,
    headers: [
      { text: 'Responsável', value: 'nome', sortable: false },
      { text: 'E-mail', value: 'email', sortable: false },
      { text: 'Município', value: 'municipio', sortable: false },
      { sortable: false, value: 'actions', width: '240px' },
    ],
  }),
  computed: {
    list() {
      if (this.filter) {
        const regex = new RegExp(this.filter, 'i');
        return this.configs.filter((c) => regex.test(c.nome) || regex.test(c.email) || regex.test(c.municipio));
      }
      return this.configs;
    },
  },
  methods: {
    consultarConfig() {
      this.loading = true;
      TenantConfigService.findAll()
        .then(({ data }) => {
          this.configs = data.map((d) => new TenantConfig(d));
        })
        .catch((error) => {
          this.$emit('erro:consultaUsuario', ErrorService.getMessage(error));
        })
        .finally(() => { this.loading = false; });
    },
    filterSearch(search) {
      this.filter = search;
      this.filterUsuarios();
    },
  },
  created() {
    this.consultarConfig();
  },
};
</script>
