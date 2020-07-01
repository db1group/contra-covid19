 <template>
  <v-container fluid>
    <!-- <confirm-dialog
      v-model="removingUnidadeDialog.showDialog"
      confirm-color="error"
      @confirm="confirmExclusion"
    >
      <div class="pa-5">
        <h4 class="headline">Confirmação</h4>
        <div class="mt-3">
          Deseja mesmo
          <span class="font-weight-bold">excluir</span> A Notificação de Leito?
        </div>
      </div>
    </confirm-dialog> -->
    <v-data-table :headers="headers" :items="leitos">
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field v-model="props.item.name" label="Edit" single-line counter></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.iron="props">
        <v-edit-dialog
          :return-value.sync="props.item.iron"
          large
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <!-- <div>{{ props.item.iron }}</div> -->
          <template v-slot:input>
            <div class="mt-4 title">Update Iron</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="props.item.iron"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{  }">
        <v-row justify="end" align="center" dense>
          <v-col>
            <v-btn text small color="#F54D09" :to="{ name: 'perfil' }">PERFIL</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>

export default {
  data: () => ({
    snack: false,
    snackColor: '',
    snackText: '',
    pagination: {},
    headers: [
      {
        text: 'Data da Notificação',
        align: 'start',
        sortable: false,
        value: 'dtNotificacaoo',
      },
      { text: 'Unidade Saúde', value: 'unidadeSaude' },
      { text: 'Data cadastro', value: 'dataCadastro' },
    ],
    leitos: [
      {
        dtNotificacaoo: '24/04/2020',
        unidadeSaude: 'Santa casa de Maringa',
        dataCadastro: '24/04/2020',
      },
    ],
  }),
  methods: {
    save() {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Data saved';
    },
    cancel() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Canceled';
    },
    open() {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Dialog opened';
    },
    close() {
      console.log('Dialog closed');
    },
  },
};
</script>
