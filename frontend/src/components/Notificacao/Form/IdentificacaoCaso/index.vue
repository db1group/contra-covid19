<template>
  <div class="px-2">
    <h4 class="primary--text font-weight-medium title">
      1. IDENTIFICAÇÃO DO CASO SUSPEITO
    </h4>
    <dados-pessoais
      :suspeito="suspeito"
      @update:nome="updateNome"
      @update:sexo="updateSexo"
      @update:dataDeNascimento="updateDataDeNascimento"
    />
    <endereco
      :suspeito="suspeito"
      @update:endereco="updateEndereco"
      @update:numero="updateNumero"
    />
    <contato
      :suspeito="suspeito"
      @update:telefoneResidencial="updateTelefoneResidencial"
      @update:telefoneCelular="updateTelefoneCelular"
    />
  </div>
</template>
<script>
import Pessoa from '@/entities/Pessoa';
import DadosPessoais from './DadosPessoais.vue';
import Endereco from './Endereco.vue';
import Contato from './Contato.vue';

export default {
  components: {
    DadosPessoais,
    Endereco,
    Contato,
  },
  props: {
    suspeito: {
      type: Pessoa,
      required: true,
    },
  },
  methods: {
    updateNome(nome) {
      this.$emit('update:nome', nome);
    },
    updateSexo(sexo) {
      this.$emit('update:sexo', sexo);
    },
    updateDataDeNascimento(dataDeNascimento) {
      this.$emit('update:dataDeNascimento', dataDeNascimento);
    },
    updateEndereco(endereco) {
      this.$emit('update:endereco', endereco);
    },
    updateNumero(numero) {
      this.$emit('update:numero', numero);
    },
    updateTelefoneResidencial(telefoneResidencial) {
      this.$emit('update:telefoneResidencial', telefoneResidencial);
    },
    updateTelefoneCelular(telefoneCelular) {
      this.$emit('update:telefoneCelular', telefoneCelular);
    },
  },
};
</script>
