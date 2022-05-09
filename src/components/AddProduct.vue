<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          rounded
          dark
          v-bind="attrs"
          v-on="on"
        >
          Adicionar Produto
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Adicionar Produto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nome"
                  v-model="name"
                  :rules="nameRules"
                  prepend-icon="mdi-text-box-outline"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Preço"
                  type="number"
                  v-model="price"
                  :rules="priceRules"
                  prepend-icon="mdi-cash"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp image/webp"
                  placeholder="Adicionar imagem"
                  prepend-icon="mdi-camera"
                  label="Imagem"
                  v-model="image"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
            :loading="loading"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addProduct"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';

  export default {
    data: () => ({
      dialog: false,
      name: '',
      price: null,
      image: null,
      loading: false,
      nameRules: [
        v => !!v || 'Nome é obrigatório',
      ],
      priceRules: [
        v => !!v || 'Preço é obrigatório',
      ],
      rules: [
        v => !!v || 'Imagem é obrigatória',
      ],
    }),
    computed: {
      ...mapState([
        'token'
      ]),
    },
    methods: {
      ...mapActions([
        'fetchProducts',
      ]),
      addProduct() {
        if(this.name && this.price && this.image) {
          this.loading = true;
          const formData = new FormData();
          formData.append('image', this.image);
          axios.defaults.headers.common['Authorization'] = `Client-ID ${process.env.VUE_APP_CLIENT_ID}`;
          axios.post('https://api.imgur.com/3/image', formData).then(response => {
            const image = response.data.data.link;
            axios.defaults.headers.common['Authorization'] = this.token;
            axios.post('https://store-points-back.herokuapp.com/api/products', {
              name: this.name,
              price: this.price,
              image: image,
            }).then(() => {
              this.fetchProducts();
              this.dialog = false;
              this.name = '';
              this.price = null;
              this.image = null;
              this.loading = false;
            }).catch(error => {
              console.log('erro api',error);
            });
          }).catch(error => {
            console.log('erro imgur',error);
          });
        }
      },
    },
  }
</script>