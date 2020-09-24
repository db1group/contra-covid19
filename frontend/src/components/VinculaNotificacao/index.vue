 <template>
  <v-container fluid>
    <v-card class="mx-auto" :loading="loading">
      <v-card-title>
        <h3 class="primary--text">Vincular Notificação</h3>
      </v-card-title>
      <v-form ref="form" class="ma-2">
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              v-model="filter"
              @input="filterSearch"
              append-icon="mdi-magnify"
              label="Pesquisar por Documento ou Nome"
              single-line
              hide-details
              autofocus
            />
          </v-col>
        </v-row>

        <h3>Notificações abertas Notifica Saúde</h3>
        <v-card min-height="130">
          <v-list>
            <v-list-item-group v-model="notificacaoId" mandatory>
              <v-list-item
                v-for="(item, i) in notificacoes.items"
                :key="i" :value="item.id"
              >
                <v-list-item-content>
                  <v-list-item-title><strong>Paciente: {{item.nome}}</strong></v-list-item-title>
                  <v-list-item-subtitle>Data da Notificação: {{item.dataNotificacao}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <h3>Notificações no estado</h3>
        <v-card min-height="130">
          <v-list>
            <v-list-item-group v-model="notificacaoEstadoId" mandatory>
              <v-list-item
                v-for="(item, i) in notificacoesEstado.items"
                :key="i" :value="item.id"
              >
                <v-list-item-content>
                  <v-list-item-title><strong>Paciente: {{item.paciente}}</strong></v-list-item-title>
                  <v-list-item-subtitle>Data da Notificação: {{item.data_notificacao}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn
                color="primary"
                rounded
                @click="vincularNotificacao"
                :loading="loading"
              >Vincular</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import keycloak from '@/services/KeycloakService';
import NotificacaoService from '@/services/NotificacaoService';
import NotificacaoConsulta from '@/entities/NotificacaoConsulta';
import ErrorService from '@/services/ErrorService';

export default {
  data: () => ({
    notificacaoId: null,
    notificacaoEstadoId: null,
    loading: false,
    filter: null,
    filterCons: null,
    isSecretariaSaude: false,
    notificacoes: {
      items: [],
      loading: false,
    },
    notificacoesEstado: {
      items: [],
      loading: false,
    },
  }),
  watch: {
    notificacaoId(notificacaoId) {
      if (!notificacaoId) return;
      this.searchNotificacoesEstado(notificacaoId);
    },
  },
  methods: {
    vincularNotificacao() {
      if (!this.notificacaoId || !this.notificacaoEstadoId) {
        this.$emit('erro:vincNotificacao', 'Seleciona as notificações a serem vinculadas.');
        return;
      }
      this.loading = true;
      NotificacaoService.vinculaNotificacaoEstado(this.notificacaoId, this.notificacaoEstadoId)
        .then(() => {
          this.filter = null;
          this.notificacoes.items = [];
          this.notificacoesEstado.items = [];
          this.$emit('success:vincNotificacao', 'Notificação vinculada com sucesso!');
        })
        .catch((error) => {
          this.$emit('erro:vincNotificacao', ErrorService.getMessage(error));
        })
        .finally(() => { this.loading = false; });
    },
    filterSearch(search = '') {
      this.filter = search;
      this.filterNotificacoes();
    },
    filterNotificacoes() {
      clearTimeout(this.filterCons);
      this.filterCons = setTimeout(() => {
        this.consultarNotificacoes();
      }, 500);
    },
    consultarNotificacoes() {
      const search = this.filter;
      const status = 'ABERTA';
      const options = {
        page: 1,
        itemsPerPage: 5,
        sortBy: 'createdAt',
        sortDesc: 'true',
        search,
        status,
      };
      if (search.trim() === '') {
        this.notificacoes.items = [];
        return;
      }
      this.loading = true;
      NotificacaoService.findAll(options)
        .then(({ data }) => {
          this.notificacaoId = null;
          this.notificacoes.items = data.map((d) => new NotificacaoConsulta(d));
        })
        .catch((error) => {
          this.notificacaoId = null;
          this.$emit('erro:vincNotificacao', ErrorService.getMessage(error));
        })
        .finally(() => { this.loading = false; });
    },
    searchNotificacoesEstado(notificacaoId) {
      this.loading = true;
      NotificacaoService.findNotificacoesEstado(notificacaoId)
        .then(({ data }) => {
          this.notificacoesEstado.items = data;
        })
        .catch((error) => {
          this.$emit('erro:vincNotificacao', ErrorService.getMessage(error));
        })
        .finally(() => { this.loading = false; });
    },
  },
  created() {
    this.isSecretariaSaude = keycloak.realmAccess.roles.includes('SECRETARIA_SAUDE');
  },
};
</script>
