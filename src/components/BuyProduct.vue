<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="teal accent-3"
          rounded
          v-bind="attrs"
          v-on="on"
          class="mb-3"
          :disabled="money"
        >
          Comprar
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ product.name }}
        </v-card-title>

        <v-card-text class="mt-3">
          Deseja comprar <strong>{{ product.name }}</strong> por <strong>{{ product.price }}</strong>  pontos?
        </v-card-text>
        <v-card-text>
          Seus pontos: <strong>{{ user.coins }}</strong>
        </v-card-text>
        <v-divider/>

        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="error"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="dialog = false"
          >
            Comprar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    props: {
      product: Object,
      user: Object,
      money: Boolean,
    },
  }
</script>