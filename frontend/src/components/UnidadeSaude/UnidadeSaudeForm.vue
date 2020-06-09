 <template>
  <v-container fluid>
    <v-form ref="form">
      <v-row align="center">
        <v-col>
          <v-text-field label="Unidade de Saúde" validate-on-blur required autofocus />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row align="center" justify="end">
          <v-col cols="auto">
            <v-btn color="primary" rounded @click="cadastrarUnidade">Salvar</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </v-container>
</template>
