<template>
  <div class="px-2">
    <h4 class="primary--text title">
      5. REALIZOU EXAME DE IMAGEM
    </h4>
    <v-row>
      <v-col cols="12">
        <v-radio-group
          id="realizouExamesImagem"
          ref="realizouExamesImagem"
          :value="realizouExamesImagem"
          class="mt-0"
          :rules="rules.realizouExamesImagem"
          @change="updateRealizouExamesImagem"
          :disabled="disabled"
        >
          <v-radio label="Sim" :value="true"/>
          <v-radio label="Não" :value="false"/>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col col="6">
          <raio-torax
            :realizou-exames-imagem="realizouExamesImagem"
            :exames-imagem="examesImagem"
            :disabled="disabled"
            @update:validarRealizouExamesImagem="validarRealizouExamesImagem"
            @update:realizouOutroRaioTorax="updateRealizouOutroRaioTorax"
            @update:raioNormal="updateRaioNormal"
            @update:raioInfiltradoIntersticial="updateRaioInfiltradoIntersticial"
            @update:raioConsolidacao="updateRaioConsolidacao"
            @update:raioMisto="updateRaioMisto"
            @update:raioOutro="updateRaioOutro"
          />
        </v-col>
        <v-col col="6">
          <tomografia-torax
            :realizou-exames-imagem="realizouExamesImagem"
            :exames-imagem="examesImagem"
            :disabled="disabled"
            @update:validarRealizouExamesImagem="validarRealizouExamesImagem"
            @update:tomografiaNormal="updateTomografiaNormal"
            @update:tomografiaVidroFoscoPredominioPerifericoBasal="updateTomografiaVidroFoscoPredominioPerifericoBasal"
            @update:tomografiaAusenciaDerramePleural="updateTomografiaAusenciaDerramePleural"
            @update:tomografiaAusenciaLinfonodoMediastenal="updateTomografiaAusenciaLinfonodoMediastenal"
            @update:tomografiaOutro="updateTomografiaOutro"
            @update:realizouOutraTomografiaTorax="updateRealizouOutraTomografiaTorax"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ExamesImagem from '@/entities/ExamesImagem';
import RaioTorax from './RaioTorax.vue';
import TomografiaTorax from './TomografiaTorax.vue';

export default {
  components: {
    RaioTorax,
    TomografiaTorax,
  },
  props: {
    realizouExamesImagem: {
      type: Boolean,
      required: true,
    },
    examesImagem: {
      type: ExamesImagem,
      required: true,
    },
    disabled: {
      type: Boolean,
      defaultValue: false,
    },
  },
  data: () => ({
    rules: {
      realizouExamesImagem: [],
    },
  }),
  computed: {
    disableFields() {
      if (this.disabled) return true;
      return !this.sintomatico;
    },
  },
  methods: {
    updateRealizouExamesImagem(realizouExamesImagem) {
      this.$emit('update:realizouExamesImagem', realizouExamesImagem);
      if (!realizouExamesImagem) {
        this.updateRaioNormal(false);
        this.updateRaioInfiltradoIntersticial(false);
        this.updateRaioConsolidacao(false);
        this.updateRaioMisto(false);
        this.updateRealizouOutroRaioTorax(false);
        this.updateRaioOutro();
        this.updateTomografiaNormal(false);
        this.updateTomografiaVidroFoscoPredominioPerifericoBasal(false);
        this.updateTomografiaAusenciaDerramePleural(false);
        this.updateTomografiaAusenciaLinfonodoMediastenal(false);
        this.updateRealizouOutraTomografiaTorax(false);
        this.updateTomografiaOutro();
      }
    },
    updateRaioNormal(raioNormal) {
      this.$emit('update:raioNormal', raioNormal);
    },
    updateRaioInfiltradoIntersticial(raioInfiltradoIntersticial) {
      this.$emit('update:raioInfiltradoIntersticial', raioInfiltradoIntersticial);
    },
    updateRaioConsolidacao(raioConsolidacao) {
      this.$emit('update:raioConsolidacao', raioConsolidacao);
    },
    updateRaioMisto(raioMisto) {
      this.$emit('update:raioMisto', raioMisto);
    },
    updateRaioOutro(raioOutro) {
      this.$emit('update:raioOutro', raioOutro);
    },
    updateTomografiaNormal(tomografiaNormal) {
      this.$emit('update:tomografiaNormal', tomografiaNormal);
    },
    updateTomografiaVidroFoscoPredominioPerifericoBasal(tomografiaVidroFoscoPredominioPerifericoBasal) {
      this.$emit('update:tomografiaVidroFoscoPredominioPerifericoBasal', tomografiaVidroFoscoPredominioPerifericoBasal);
    },
    updateTomografiaAusenciaDerramePleural(tomografiaAusenciaDerramePleural) {
      this.$emit('update:tomografiaAusenciaDerramePleural', tomografiaAusenciaDerramePleural);
    },
    updateTomografiaAusenciaLinfonodoMediastenal(tomografiaAusenciaLinfonodoMediastenal) {
      this.$emit('update:tomografiaAusenciaLinfonodoMediastenal', tomografiaAusenciaLinfonodoMediastenal);
    },
    updateTomografiaOutro(tomografiaOutro) {
      this.$emit('update:tomografiaOutro', tomografiaOutro);
    },
    updateRealizouOutraTomografiaTorax(realizouOutraTomografiaTorax) {
      this.$emit('update:realizouOutraTomografiaTorax', realizouOutraTomografiaTorax);
    },
    validarRealizouExamesImagem() {
      this.$refs.realizouExamesImagem.validate();
    },
    requireExames(value) {
      if (!value) {
        return true;
      }
      const exames = [
        this.examesImagem.raioNormal,
        this.examesImagem.raioInfiltradoIntersticial,
        this.examesImagem.raioConsolidacao,
        this.examesImagem.raioMisto,
        this.examesImagem.raioOutro,
        this.examesImagem.tomografiaNormal,
        this.examesImagem.tomografiaVidroFoscoPredominioPerifericoBasal,
        this.examesImagem.tomografiaAusenciaDerramePleural,
        this.examesImagem.tomografiaAusenciaLinfonodoMediastenal,
        this.examesImagem.tomografiaOutro,
      ];
      return exames.some((exame) => exame) || 'Pelo menos um Raio ou Tomografia do tórax deve ser selecionado';
    },
    updateRealizouOutroRaioTorax(realizouOutroRaioTorax) {
      this.$emit('update:realizouOutroRaioTorax', realizouOutroRaioTorax);
    },
  },
  created() {
    this.rules.realizouExamesImagem.push(this.requireExames);
  },
};
</script>
