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
                  accept="image/png, image/jpeg, image/bmp"
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
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addProduct"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    data: () => ({
      dialog: false,
      name: 'NFT do Ney',
      price: 6000,
      image: null,
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
    methods: {
      ...mapActions([
        'createProduct',
      ]),
      addProduct() {
        if(this.name && this.price && this.image) {
          const formData = new FormData();
          formData.append('image', this.image);
          this.createProduct({
            name: this.name,
            price: this.price,
            image: formData,
          });
          this.dialog = false;
          this.name = '';
          this.price = 0;
          this.image = null;
        }
      },
    },
  }
</script>