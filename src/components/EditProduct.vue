<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="mx-1 mb-3"          
          v-bind="attrs"
          v-on="on"
          small
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 teal accent-3">
          Editar {{ product.name}}
        </v-card-title>
        <v-col>
          <v-form class="mt-3" v-model="valid" @submit.prevent="editProduct">
            <v-text-field
              v-model="name"
              label="Nome"
              dense
              class="mt-3"
              :rules="nameRules"
            />
            <v-text-field
              v-model="price"
              label="Preço"
              dense
              class="mt-3"
              type="number"
              :rules="priceRules"
            />
          </v-form>
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
            @click="editProduct"
          >
            Editar
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
        valid: false,
        name: '',
        price: null,
        nameRules: [
          v => !!v || 'Nome é obrigatório',
          v => v.length <= 20 || 'Nome deve ter no máximo 20 caracteres',
        ],
        priceRules: [
          v => !!v || 'Preço é obrigatório',
          v => /^\d+$/.test(v) || 'Por favor, preencha com um número',
        ],
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
      editProduct () {
        if (this.valid) {
          this.loading = true;
          axios.defaults.headers.common['Authorization'] = this.token;
          axios.put(`https://store-points-back.herokuapp.com/api/products/${this.product.id}`, {
            name: this.name,
            price: this.price,
          }).then(() => {
            this.fetchProducts();
            this.loading = false;
            this.dialog = false;
            this.snackbar('Produto editado com sucesso!', 'success');
          }).catch(() => {
            this.loading = false;
            this.dialog = false;
            this.snackbar('Erro ao editar produto!', 'error');
          });
        }
      },
    }, 
    mounted () {
      this.name = this.product.name;
      this.price = this.product.price;
    },
  }
</script>