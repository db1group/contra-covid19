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
            label="Sim"
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
            label="Sim"
            hide-details
          />
          <v-radio-group class="pl-8">
            <v-radio label="Leito comum"/>
            <v-radio label="Leito UTI"/>
            <v-radio label="Pronto Socorro / Pronto Atendimento"/>
          </v-radio-group>
          <p class="pl-8">
            Se sim, manter isolamento hospitalar, utilizar precauções padrão e para gotículas. Quando for realizar
            procedimentos invasivos que possam gerar aerossóis, utilizar precauções para aerossóis.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
