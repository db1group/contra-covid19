 <template>
  <v-container fluid>
    <v-card class="mx-auto" width="500">
      <v-card-title>
        <h3 class="primary--text">Unidade de Saúde</h3>
      </v-card-title>
      <v-form ref="form" class="ma-2 form-unid">
        <v-row align="center" dense>
          <v-col>
            <v-text-field
              label="Unidade de Saúde"
              :rules="rules.nome"
              validate-on-blur
              required
              autofocus
            />
          </v-col>
        </v-row>
        <v-row align="center" dense>
          <v-col cols="8">
            <v-autocomplete
              :value="unidade.municipioId"
              :rules="rules.municipioId"
              label="Município *"
              :items="municipios.items"
              item-text="nome"
              item-value="id"
              :loading="municipios.loading"
              no-data-text="Município não encontrado"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field label="CNES" :rules="rules.cnes" validate-on-blur required />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <h3 class="primary--text">Leitos Existentes</h3>
          </v-col>
        </v-row>
        <v-row align="center" no-gutters class="primary--text px-2">
          <v-col cols="4"></v-col>
          <v-col cols="4" align="center" class="font-weight-bold pr-8">Sus</v-col>
          <v-col />
        </v-row>
        <v-row align="center" no-gutters class="primary--text px-2">
          <v-col cols="4"></v-col>
          <v-col cols="2" class="font-weight-bold">Covid</v-col>
          <v-col cols="2" class="font-weight-bold">Normal</v-col>
          <v-col cols="2" class="font-weight-bold">Privado</v-col>
          <v-col class="total-header">Total</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">Enfermaria</v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col class="total">180</v-col>
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Adulta</v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col class="total" />
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Ped.</v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col class="total" />
        </v-row>
        <v-row align="center" no-gutters class="px-2">
          <v-col cols="4" class="primary--text font-weight-bold">UTI Neo.</v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col cols="2">
            <v-text-field class="field-num" value="133" />
          </v-col>
          <v-col class="total" />
        </v-row>
        <v-row align="center" no-gutters class="px-2 footer-total">
          <v-col cols="4" class="footer-col">TOTAL</v-col>
          <v-col cols="2" class="footer-col">180</v-col>
          <v-col cols="2" class="footer-col">180</v-col>
          <v-col cols="2" class="footer-col">190</v-col>
          <v-col class="footer-col" />
        </v-row>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn color="primary" rounded @click="cadastrarUnidade">Salvar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
<style scoped>
  .form-unid .v-text-field,
  .form-unid .v-input__slot,
  .form-unid .v-input__control {
    margin: 0;
    padding: 0;
  }
  .form-unid .field-num {
    max-width: 60px;
  }
  .total,
  .total-header,
  .footer-col  {
    color: black;
    background-color: grey;
    font-weight: 700;
  }
  .total {
    height: 54px;
    text-align: center;
  }
  .total-header {
    text-align: center;
  }
  .footer-total {
    margin-right: 8px;
    padding: 8px 0;
    background-color: grey;
  }
</style>
<script>
import {
  required, maxLength, minLength, onlyLetters, minLengthNumbers,
} from '@/validations/CommonValidations';
import UnidadeSaude from '@/entities/UnidadeSaude';

export default {
  data: () => ({
    unidade: new UnidadeSaude(),
    municipios: {
      loading: false,
      items: [],
    },
    rules: {
      nome: [required, onlyLetters, maxLength(150), minLength(3)],
      municipioId: [required],
      cnes: [required, minLengthNumbers(3)],
    },
  }),
};
</script>
