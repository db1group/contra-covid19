<template>
  <div class="px-2">
    <h4 class="primary--text title">
      5. REALIZOU EXAME DE IMAGEM
    </h4>
    <v-row>
      <v-col cols="12">
        <v-radio-group :value="realizouExamesImagem" class="mt-0" @change="updateRealizouExamesImagem">
          <v-radio label="Sim" :value="true"/>
          <v-radio label="Não" :value="false"/>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col col="6">
          <raio-torax
            :realizouExamesImagem="realizouExamesImagem"
            :examesImagem="examesImagem"
            @update:raioNormal="updateRaioNormal"
            @update:raioInfiltradoIntersticial="updateRaioInfiltradoIntersticial"
            @update:raioConsolidacao="updateRaioConsolidacao"
            @update:raioMisto="updateRaioMisto"
            @update:raioOutro="updateRaioOutro"
          />
        </v-col>
        <v-col col="6">
          <tomografia-torax
            :realizouExamesImagem="realizouExamesImagem"
            :examesImagem="examesImagem"
            @update:tomografiaNormal="updateTomografiaNormal"
            @update:tomografiaVidroFoscoPredominioPerifericoBasal="updateTomografiaVidroFoscoPredominioPerifericoBasal"
            @update:tomografiaAusenciaDerramePleural="updateTomografiaAusenciaDerramePleural"
            @update:tomografiaAusenciaLinfonodoMediastenal="updateTomografiaAusenciaLinfonodoMediastenal"
            @update:tomografiaOutro="updateTomografiaOutro"
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
  },
  methods: {
    updateRealizouExamesImagem(realizouExamesImagem) {
      this.$emit('update:realizouExamesImagem', realizouExamesImagem);
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
  },
};
</script>
