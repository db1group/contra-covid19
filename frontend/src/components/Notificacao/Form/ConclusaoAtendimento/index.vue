<template>
  <div class="px-2">
    <h4 class="primary--text title">
      6. CONCLUSÃO DO ATENDIMENTO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12" sm="10" md="8">
          <label class="primary--text body-1 font-weight-bold">
            Está de alta e será indicado ISOLAMENTO DOMICILIAR?
          </label>
          <v-checkbox
            :input-value="conclusaoAtendimento.isolamentoDomiciliar"
            label="Sim"
            @change="updateIsolamentoDomiciliar"
          />
          <p class="pl-8">
            Se sim, providenciar preenchimento do termo de consentimento livre e esclarecido e entregar orientações de
            <span class="font-weight-bold">
              "Isolamento domiciliar por 14 dias: condutas para pessoas infectadas ou suspeitas de infecção pelo novo
              Coronavírus - Covid 19".
            </span>
          </p>
          <v-btn class="px-1 ml-8" color="primary" link text>
            Abrir orientações em outra janela
            <v-icon class="ml-3">mdi-open-in-new</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8">
          <label class="primary--text body-1 font-weight-bold">
            Será HOSPITALIZADO?
          </label>
          <v-checkbox
            :input-value="hospitalizado"
            label="Sim"
            hide-details
            @change="updateHospitalizado"
          />
          <v-radio-group
            :value="tipoHospitalizacao"
            class="pl-8"
            :disabled="!hospitalizado"
            @change="updateTipoHospitalizacao"
          >
            <v-radio :value="1" label="Leito comum"/>
            <v-radio :value="2" label="Leito UTI"/>
            <v-radio :value="3" label="Pronto Socorro / Pronto Atendimento"/>
          </v-radio-group>
          <p
            v-show="hospitalizado"
            class="pl-8"
          >
            Se sim, manter isolamento hospitalar, utilizar precauções padrão e para gotículas. Quando for realizar
            procedimentos invasivos que possam gerar aerossóis, utilizar precauções para aerossóis.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ConclusaoAtendimento from '@/entities/ConclusaoAtendimento';

export default {
  props: {
    conclusaoAtendimento: {
      type: ConclusaoAtendimento,
      required: true,
    },
  },
  data: () => ({
    hospitalizado: false,
    tipoHospitalizacao: null,
  }),
  methods: {
    updateIsolamentoDomiciliar(isolamentoDomiciliar) {
      this.$emit('update:isolamentoDomiciliar', isolamentoDomiciliar);
    },
    updateHospitalizado(hospitalizado) {
      this.hospitalizado = hospitalizado;
      if (!this.hospitalizado) {
        this.unselectTiposHospitalizacao();
        this.tipoHospitalizacao = null;
      }
    },
    updateTipoHospitalizacao(tipoHospitalizacao) {
      this.tipoHospitalizacao = tipoHospitalizacao;
      if (this.tipoHospitalizacao === 1) {
        this.selectLeitoComum();
        return;
      }
      if (this.tipoHospitalizacao === 2) {
        this.selectLeitoUTI();
        return;
      }
      if (this.tipoHospitalizacao === 3) {
        this.selectLeitoProntoSocorro();
      }
    },
    selectLeitoComum() {
      this.$emit('update:leitoComum', true);
      this.$emit('update:leitoUti', false);
      this.$emit('update:prontoSocorroOuAtendimento', false);
    },
    selectLeitoUTI() {
      this.$emit('update:leitoComum', false);
      this.$emit('update:leitoUti', true);
      this.$emit('update:prontoSocorroOuAtendimento', false);
    },
    selectLeitoProntoSocorro() {
      this.$emit('update:leitoComum', false);
      this.$emit('update:leitoUti', false);
      this.$emit('update:prontoSocorroOuAtendimento', true);
    },
    unselectTiposHospitalizacao() {
      this.$emit('update:leitoComum', false);
      this.$emit('update:leitoUti', false);
      this.$emit('update:prontoSocorroOuAtendimento', false);
    },
    updateTipoHospitalizacaoState() {
      if (this.conclusaoAtendimento.leitoComum) {
        this.tipoHospitalizacao = 1;
        return;
      }
      if (this.conclusaoAtendimento.leitoUti) {
        this.tipoHospitalizacao = 2;
        return;
      }
      if (this.conclusaoAtendimento.prontoSocorroOuAtendimento) {
        this.tipoHospitalizacao = 3;
      }
    },
  },
  created() {
    this.updateTipoHospitalizacaoState();
  },
};
</script>
