 <template>
  <v-container fluid>
    <header-title :title="'Controle Leito Perfil'" backRoute="controle-leitos-cons" />
    <confirm-dialog
      v-model="removingControleLeitoPerfilDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> esse controle de leito perfil?
        </div>
      </div>
    </confirm-dialog>
    <v-data-table :headers="headers" :items="leitosPerfis">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Novo Perfil</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Novo Perfil</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="perfil.causa" label="Causa"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="perfil.perfilNome" label="Perfil"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelNovoPerfil">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="saveNovoPerfil">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.causa="props">
        <v-edit-dialog :return-value.sync="props.item.causa" @save="save(props.item)" @open="open">
          {{ props.item.causa }}
          <template v-slot:input>
            <v-text-field v-model="props.item.causa" label="Edit" single-line counter></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.perfilNome="props">
        <v-edit-dialog
          :return-value.sync="props.item.perfilNome"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.perfilNome }}
          <template v-slot:input>
            <v-text-field v-model="props.item.perfilNome" label="Edit" single-line counter></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtEnfermariaCovid="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtEnfermariaCovid"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtEnfermariaCovid }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtEnfermariaCovid"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTIAdultaCovid="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTIAdultaCovid"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTIAdultaCovid }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTIAdultaCovid"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTIPedCovid="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTIPedCovid"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTIPedCovid }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTIPedCovid"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTINeoCovid="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTINeoCovid"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTINeoCovid }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTINeoCovid"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtEnfermariaNormal="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtEnfermariaNormal"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtEnfermariaNormal }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtEnfermariaNormal"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTIAdultaNormal="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTIAdultaNormal"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTIAdultaNormal }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTIAdultaNormal"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTIPedNormal="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTIPedNormal"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTIPedNormal }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTIPedNormal"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTINeoNormal="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTINeoNormal"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTINeoNormal }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTINeoNormal"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtEnfermariaPrivado="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtEnfermariaPrivado"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtEnfermariaPrivado }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtEnfermariaPrivado"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTIAdultaPrivado="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTIAdultaPrivado"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTIAdultaPrivado }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTIAdultaPrivado"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTIPedPrivado="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTIPedPrivado"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTIPedPrivado }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTIPedPrivado"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.ControleLeito.qtUTINeoPrivado="props">
        <v-edit-dialog
          :return-value.sync="props.item.ControleLeito.qtUTINeoPrivado"
          @save="save(props.item)"
          @open="open"
        >
          {{ props.item.ControleLeito.qtUTINeoPrivado }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.ControleLeito.qtUTINeoPrivado"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row justify="end" align="center" dense>
          <v-col>
            <v-btn text small color="red" @click="showExclusionConfirmDialog(item)">EXCLUIR</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import ConfirmDialog from '@/components/commons/ConfirmDialog.vue';
import ControleLeitoPerfilService from '@/services/ControleLeitoPerfilService';
import ControleLeitoService from '@/services/ControleLeitoService';
import HeaderTitle from '@/components/commons/HeaderTitle.vue';
import ControleLeitoPerfil from '@/entities/ControleLeitoPerfil';
import ErrorService from '@/services/ErrorService';

export default {
  components: { ConfirmDialog, HeaderTitle },
  data: () => ({
    items: [],
    loading: true,
    snack: false,
    snackColor: '',
    snackText: '',
    totalLeitos: 0,
    pagination: {},
    dialog: false,
    headers: [
      {
        text: 'Causa', align: 'start', sortable: true, value: 'causa',
      },
      {
        text: 'Perfil', align: 'start', sortable: true, value: 'perfilNome',
      },
      {
        text: 'EnfermariaCovid', value: 'ControleLeito.qtEnfermariaCovid',
      },
      {
        text: 'UTIAdultaCovid', value: 'ControleLeito.qtUTIAdultaCovid', sortable: true,
      },
      {
        text: 'UTIPedCovid', value: 'ControleLeito.qtUTIPedCovid', sortable: true,
      },
      {
        text: 'UTINeoCovid', value: 'ControleLeito.qtUTINeoCovid', sortable: true,
      },
      {
        text: 'EnfermariaNormal', value: 'ControleLeito.qtEnfermariaNormal', sortable: true,
      },
      {
        text: 'UTIAdultaNormal', value: 'ControleLeito.qtUTIAdultaNormal', sortable: true,
      },
      {
        text: 'UTIPedNormal', value: 'ControleLeito.qtUTIPedNormal', sortable: true,
      },
      {
        text: 'UTINeoNormal', value: 'ControleLeito.qtUTINeoNormal', sortable: true,
      },
      {
        text: 'EnfermariaPrivado', value: 'ControleLeito.qtEnfermariaPrivado', sortable: true,
      },
      {
        text: 'UTIAdultaPrivado', value: 'ControleLeito.qtUTIAdultaPrivado', sortable: true,
      },
      {
        text: 'UTIPedPrivado', value: 'ControleLeito.qtUTIPedPrivado', sortable: true,
      },
      {
        text: 'UTINeoPrivado', value: 'ControleLeito.qtUTINeoPrivado', sortable: true,
      },
      {
        sortable: false, value: 'actions', width: '240px',
      },
    ],
    perfil: {
      causa: '',
      perfilNome: '',
      ControleLeito: {
        qtEnfermariaCovid: 0,
        qtUTIAdultaCovid: 0,
        qtUTIPedCovid: 0,
        qtUTINeoCovid: 0,
        qtEnfermariaNormal: 0,
        qtUTIAdultaNormal: 0,
        qtUTIPedNormal: 0,
        qtUTINeoNormal: 0,
        qtEnfermariaPrivado: 0,
        qtUTIAdultaPrivado: 0,
        qtUTIPedPrivado: 0,
        qtUTINeoPrivado: 0,
      },
    },
    defaultPerfil: {
      causa: '',
      perfilNome: '',
      ControleLeito: {
        qtEnfermariaCovid: 0,
        qtUTIAdultaCovid: 0,
        qtUTIPedCovid: 0,
        qtUTINeoCovid: 0,
        qtEnfermariaNormal: 0,
        qtUTIAdultaNormal: 0,
        qtUTIPedNormal: 0,
        qtUTINeoNormal: 0,
        qtEnfermariaPrivado: 0,
        qtUTIAdultaPrivado: 0,
        qtUTIPedPrivado: 0,
        qtUTINeoPrivado: 0,
      },
    },
    leitosPerfis: [],
    filter: '',
    filterCons: null,
    user: {},
    removingControleLeitoPerfilDialog: {
      showDialog: false,
      id: null,
    },
  }),
  methods: {
    salvaControleLeitoPerfil() {
      ControleLeitoService.findByControleLeitoId(
        this.user.unidadeSaudeId,
        this.$route.params.id,
      ).then((response) => {
        const controleLeitoPerfil = new ControleLeitoPerfil(this.perfil, response.data.ControleLeito);
        controleLeitoPerfil.setPerfilCausa(this.perfil.perfilNome, this.perfil.causa);
        controleLeitoPerfil.setControleLeito(this.perfil.ControleLeito);
        const { id, ...perfil } = controleLeitoPerfil;
        ControleLeitoPerfilService.save(perfil, this.$route.params.id)
          .then(() => {
            this.consultaControleLeitosPerfis();
            this.cancelNovoPerfil();
          })
          .catch((error) => {
            this.callSnackMessage('error', ErrorService.getMessage(error));
          })
          .finally(() => {
            this.callSnackMessage('success', 'Controle de leito Perfil salvo com sucesso.');
          });
      });
    },
    consultaControleLeitosPerfis() {
      this.loading = true;
      ControleLeitoPerfilService.findAllControleLeitosPerfilByControleLeito(this.$route.params.id)
        .then(({ count, data }) => {
          this.totalLeitos = count;
          this.leitosPerfis = data.map((d) => new ControleLeitoPerfil(d));
          this.leitosPerfis.forEach((leitoPerfil) => {
            leitoPerfil.setPerfilCausa(leitoPerfil.perfilNome, leitoPerfil.causa);
            ControleLeitoPerfilService.findByControleLeitoId(this.$route.params.id, leitoPerfil.id)
              .then((response) => {
                leitoPerfil.setControleLeito(response.data.ControleLeito);
              })
              .catch((error) => {
                this.callSnackMessage('error', ErrorService.getMessage(error));
              });
          });
          this.loading = false;
        })
        .catch((error) => {
          this.callSnackMessage('error', ErrorService.getMessage(error));
        });
    },
    atualizarControleLeitoPerfil(leitoPerfil) {
      const { id, ControleLeito, ...perfil } = leitoPerfil;
      const {
        id: idControle,
        createdAt: createdAtControle,
        updatedAt: updatedAtControle,
        ...controle
      } = ControleLeito;
      const perfilUpdate = { ...perfil, ControleLeito: controle };
      ControleLeitoPerfilService.update(this.$route.params.id, leitoPerfil.id, perfilUpdate)
        .then(() => {
          this.callSnackMessage('success', 'Controle de leito Perfil atualizado com sucesso.');
        })
        .catch((error) => {
          this.callSnackMessage('error', ErrorService.getMessage(error));
        })
        .finally(() => {
          this.loading = false;
        });
    },
    confirmExclusion() {
      this.excluirItem(this.removingControleLeitoPerfilDialog.id);
    },
    excluirItem(id) {
      ControleLeitoPerfilService.delete(this.$route.params.id, id)
        .then(() => {
          this.callSnackMessage('success', 'Controle de leito Perfil excluído com sucesso.');
        })
        .catch((error) => {
          this.callSnackMessage('error', ErrorService.getMessage(error));
        })
        .finally(() => {
          this.loading = false;
          this.consultaControleLeitosPerfis();
        });
    },
    showExclusionConfirmDialog({ id }) {
      this.removingControleLeitoPerfilDialog.showDialog = true;
      this.removingControleLeitoPerfilDialog.id = id;
    },
    carregarControleLeitoPerfil() {
      this.consultaControleLeitosPerfis();
    },
    save(event) {
      this.atualizarControleLeitoPerfil(event);
    },
    cancel() {
      this.callSnackMessage('error', 'Cancelado');
    },
    open() {
      this.callSnackMessage('info', 'Edição disponível');
    },
    saveNovoPerfil() {
      this.salvaControleLeitoPerfil();
    },
    cancelNovoPerfil() {
      this.dialog = false;
      this.$nextTick(() => {
        this.callSnackMessage('error', 'Cancelado');
      });
    },
    callSnackMessage(type, message) {
      this.snack = true;
      this.snackColor = type;
      this.snackText = message;
    },
  },
  created() {
    this.user = this.$store.state.user;
    this.consultaControleLeitosPerfis();
  },
};
</script>
