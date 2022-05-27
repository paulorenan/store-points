<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          class="mx-1 mb-3 ml-6"
          v-bind="attrs"
          v-on="on"
          
          small
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 teal accent-3">
          Excluir {{ product.name}}
        </v-card-title>
        <v-col>
          <v-card-text>
            <p>Deseja realmente excluir <strong>{{ product.name }}</strong> que custa <strong>{{ product.price }}</strong> pontos?</p>
          </v-card-text>

        </v-col>
        <v-divider/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="dialog = false"
            :loading="loading"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            @click="deleteProduct"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

  export default {
    data () {
      return {
        dialog: false,
        loading: false,
      }
    },
    props: {
      product: Object,
      snackbar: Function,
    },
    computed: {
      ...mapState([
        'token',
      ]),
    },
    methods: {
      ...mapActions([
        'fetchProducts',
      ]),
      deleteProduct () {
        this.loading = true;
        axios.defaults.headers.common['Authorization'] = this.token;
        axios.delete(`https://store-points-back.herokuapp.com/api/products/${this.product.id}`).then(() => {
          this.fetchProducts();
          this.loading = false;
          this.dialog = false;
          this.snackbar('Produto excluído com sucesso!', 'success');
        }).catch(() => {
          this.loading = false;
          this.dialog = false;
          this.snackbar('Erro ao excluir produto!', 'error');
        });
      },
    },
  }
</script>