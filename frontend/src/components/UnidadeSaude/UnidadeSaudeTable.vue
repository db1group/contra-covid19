<template>
  <v-container fluid>
    <confirm-dialog
      v-model="removingUnidadeDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> a unidade de saúde?
        </div>
      </div>
    </confirm-dialog>
    <v-data-table
      :headers="headers"
      :items="unidades"
      item-key="id"
      :server-items-length="totalUnidades"
      :options.sync="options"
      @update:options="consultarUnidades"
      :loading="loading"
      loading-text="Carregando as unidades de saúde."
      no-data-text="Não há unidades de saúde até o momento."
      no-results-text="Não há unidades de saúde com estes dados."
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
                label="Pesquisar por Unidade de Saúde ou CNES"
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
              v-if="isPermiteAlterar(item)"
              text
              small
              color="#F54D09"
              :to="{ name: 'unidades-saude-edit', params: { id: item.id, edit: true } }"
            >EDITAR</v-btn>
          </v-col>
          <v-col>
            <v-btn
              v-if="isSecretariaSaude"
              text
              small
              color="red"
              @click="showExclusionConfirmDialog(item)"
            >EXCLUIR</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue';
import UnidadeSaudeService from '@/services/UnidadeSaudeService';
import keycloak from '@/services/KeycloakService';
import UnidadeSaude from '@/entities/UnidadeSaude';

export default {
  components: { ConfirmDialog },
  data: () => ({
    items: [],
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['municipio', 'nome'],
      sortDesc: 'false',
    },
    totalUnidades: 0,
    unidadesSaudeUserLogged: [],
    isSecretariaSaude: false,
    unidades: [],
    filter: '',
    filterCons: null,
    headers: [
      { text: 'Municipio', value: 'municipio', sortable: false },
      { text: 'Unidade de Saúde', value: 'nome', sortable: false },
      { text: 'CNES', value: 'cnes', sortable: false },
      { sortable: false, value: 'actions', width: '240px' },
    ],
    removingUnidadeDialog: {
      showDialog: false,
      id: null,
    },
  }),
  methods: {
    consultarUnidades({ page, itemsPerPage } = this.options) {
      this.loading = true;
      const search = this.filter;
      UnidadeSaudeService.findAllUnidades({ page, itemsPerPage, search })
        .then(({ count, data }) => {
          this.totalUnidades = count;
          this.unidades = data.map((d) => new UnidadeSaude(d));
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaUnidadeSaude', data.error);
        });
    },
    showExclusionConfirmDialog({ id }) {
      this.removingUnidadeDialog.showDialog = true;
      this.removingUnidadeDialog.id = id;
    },
    confirmExclusion() {
      this.excluirItem(this.removingUnidadeDialog.id);
    },
    excluirItem(id) {
      UnidadeSaudeService.delete(id)
        .then(() => {
          const page = this.unidades.length === 1 ? 1 : this.options.page;
          this.options = { ...this.options, page };
          this.$emit('delete:unidadeSaude', 'Unidade de saúde excluída com sucesso.');
        })
        .then(() => {
          this.consultarUnidades();
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteUnidadeSaude', data.error);
        });
    },
    filterUnidades() {
      clearTimeout(this.filterCons);
      this.filterCons = setTimeout(() => {
        this.consultarUnidades({
          page: 1,
          itemsPerPage: this.options.itemsPerPage,
        });
      }, 500);
    },
    filterSearch(search) {
      this.filter = search;
      this.filterUnidades();
    },
    isPermiteAlterar(item) {
      return this.isUnidadeSaudePermitidaUserLogged(item.id)
        || this.isSecretariaSaude;
    },
    isUnidadeSaudePermitidaUserLogged(unidadeSaudeId) {
      return this.unidadesSaudeUserLogged.some((data) => data.id === unidadeSaudeId);
    },
    consultarUnidadesSaudeUsuario() {
      UnidadeSaudeService.findByUserEmail(keycloak.tokenParsed.email)
        .then(({ data }) => {
          this.unidadesSaudeUserLogged = data;
        })
        .finally(() => {
          this.consultarUnidades();
        });
    },
  },
  created() {
    this.isSecretariaSaude = keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    this.consultarUnidades();
    this.consultarUnidadesSaudeUsuario();
  },
};
</script>
