<template>
  <v-container fluid>
    <confirm-dialog
      v-model="removingUsuarioDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> o usuário?
        </div>
      </div>
    </confirm-dialog>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      item-key="id"
      :server-items-length="totalUsuarios"
      :options.sync="options"
      @update:options="consultarUsuarios"
      :loading="loading"
      loading-text="Carregando os usuários."
      no-data-text="Não há usuários até o momento."
      no-results-text="Não há usuários com estes dados."
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
                label="Pesquisar por Usuário, e-mail ou Unidade de Saúde"
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
              v-if="isSecretariaSaude"
              text
              small
              color="#F54D09"
              :to="{ name: 'usuario-edit', params: { id: item.id, edit: true } }"
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
import UserService from '@/services/UserService';
import keycloak from '@/services/KeycloakService';
import Usuario from '@/entities/Usuario';

export default {
  components: { ConfirmDialog },
  data: () => ({
    items: [],
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['unidadeSaudeNome', 'nome'],
      sortDesc: 'false',
    },
    totalUsuarios: 0,
    isSecretariaSaude: false,
    usuarios: [],
    filter: '',
    filterCons: null,
    headers: [
      { text: 'Usuário', value: 'nome', sortable: false },
      { text: 'E-mail', value: 'email', sortable: false },
      { text: 'Unidade de Saúde', value: 'unidadeSaudeNome', sortable: false },
      { sortable: false, value: 'actions', width: '240px' },
    ],
    removingUsuarioDialog: {
      showDialog: false,
      id: null,
    },
  }),
  methods: {
    consultarUsuarios({ page, itemsPerPage } = this.options) {
      this.loading = true;
      const search = this.filter;
      UserService.findAll({ page, itemsPerPage, search })
        .then(({ count, data }) => {
          this.totalUsuarios = count;
          this.usuarios = data.map((d) => new Usuario(d));
          this.loading = false;
        })
        .catch((error) => {
          const { data } = error.response || {};
          this.$emit('erro:consultaUsuario', data.error);
        });
    },
    showExclusionConfirmDialog({ id }) {
      this.removingUsuarioDialog.showDialog = true;
      this.removingUsuarioDialog.id = id;
    },
    confirmExclusion() {
      this.excluirItem(this.removingUsuarioDialog.id);
    },
    excluirItem(id) {
      UserService.delete(id)
        .then(() => {
          const page = this.usuarios.length === 1 ? 1 : this.options.page;
          this.options = { ...this.options, page };
          this.$emit('delete:usuario', 'Usuário excluído com sucesso.');
        })
        .then(() => {
          this.consultarUsuarios();
        })
        .catch((error) => {
          const { data } = error.response;
          this.$emit('erro:deleteUsuario', data.error);
        });
    },
    filterUsuarios() {
      clearTimeout(this.filterCons);
      this.filterCons = setTimeout(() => {
        this.consultarUsuarios({
          page: 1,
          itemsPerPage: this.options.itemsPerPage,
        });
      }, 500);
    },
    filterSearch(search) {
      this.filter = search;
      this.filterUsuarios();
    },
  },
  created() {
    this.isSecretariaSaude = keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
    this.consultarUsuarios();
  },
};
</script>
