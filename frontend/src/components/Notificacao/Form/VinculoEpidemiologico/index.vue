<template>
  <div class="px-2 mt-3">
    <h4 class="primary--text title">
      5. VÍNCULO EPIDEMIOLÓGICO
    </h4>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row>
        <v-col cols="12" sm="8" md="7" lg="6">
          <v-radio-group>
            <v-radio>
              <template v-slot:label>
                <p class="mb-0">
                  <span class="font-weight-bold">CASO SUSPEITO Situação 1:</span> febre E pelo menos um sinal
                  ou sintoma respiratório (tosse, dificuldade para respirar, batimento das asas nasais, dor
                  de garganta, coriza e chiado no peito).
                </p>
              </template>
            </v-radio>
            <v-radio>
              <template v-slot:label>
                <p class="mb-0">
                  <span class="font-weight-bold">CONTATO DE CASO SUSPEITO OU CONFIRMADO Situação 2:</span>
                  febre E/OU pelo menos um sinal ou sintoma respiratório (tosse, dificuldade para respirar,
                  batimento das asas nasais, dor de garganta, coriza e chiado no peito)
                  <span class="font-weight-bold">
                    + contato com caso suspeito e/ou confirmado com início dos sintomas,
                  </span>
                  nos últimos 14 dias.
                </p>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field
            label="Nome do caso suspeito ou confirmado que teve contato *"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
