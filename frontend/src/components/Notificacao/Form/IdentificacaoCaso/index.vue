<template>
  <div class="px-2">
    <h4 class="primary--text font-weight-medium title">
      1. IDENTIFICAÇÃO DO CASO SUSPEITO
    </h4>
    <dados-pessoais
      :suspeito="suspeito"
      @update:tipoDocumento="updateTipoDocumento"
      @update:numeroDocumento="updateNumeroDocumento"
      @update:nome="updateNome"
      @update:nomeDaMae="updateNomeDaMae"
      @update:sexo="updateSexo"
      @update:dataDeNascimento="updateDataDeNascimento"
    />
    <endereco
      :suspeito="suspeito"
      @update:cep="updateCep"
      @update:endereco="updateEndereco"
      @update:numero="updateNumero"
      @update:bairroId="updateBairroId"
    />
    <contato
      :suspeito="suspeito"
      @update:telefoneResidencial="updateTelefoneResidencial"
      @update:telefoneCelular="updateTelefoneCelular"
      @update:telefoneContato="updateTelefoneContato"
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
    updateTipoDocumento(tipoDocumento) {
      this.$emit('update:tipoDocumento', tipoDocumento);
    },
    updateNumeroDocumento(numeroDocumento) {
      this.$emit('update:numeroDocumento', numeroDocumento);
    },
    updateNome(nome) {
      this.$emit('update:nome', nome);
    },
    updateNomeDaMae(nomeDaMae) {
      this.$emit('update:nomeDaMae', nomeDaMae);
    },
    updateSexo(sexo) {
      this.$emit('update:sexo', sexo);
    },
    updateDataDeNascimento(dataDeNascimento) {
      this.$emit('update:dataDeNascimento', dataDeNascimento);
    },
    updateCep(cep) {
      this.$emit('update:cep', cep);
    },
    updateEndereco(endereco) {
      this.$emit('update:endereco', endereco);
    },
    updateNumero(numero) {
      this.$emit('update:numero', numero);
    },
    updateBairroId(bairroId) {
      this.$emit('update:bairroId', bairroId);
    },
    updateTelefoneResidencial(telefoneResidencial) {
      this.$emit('update:telefoneResidencial', telefoneResidencial);
    },
    updateTelefoneCelular(telefoneCelular) {
      this.$emit('update:telefoneCelular', telefoneCelular);
    },
    updateTelefoneContato(telefoneContato) {
      this.$emit('update:telefoneContato', telefoneContato);
    },
  },
};
</script>
