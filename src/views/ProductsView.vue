<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="5000"
      :color="color"
    >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-main class="grey lighten-2">
      <HeaderComp />
      <v-container fluid>
        <v-row>
          <v-col cols="12" v-if="admin" class="mt-5">
            <AddProduct :snackbar="snackbarMessage" />
          </v-col>
          <v-col
            cols="12"
            md="3"
            lg="3"
            sm="6"
            class="mx-auto mt-1 mb-5"
            v-for="product in products"
            :key="product.id"
          >
            <ProductCard :product="product" :snackbar="snackbarMessage" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import ProductCard from '../components/ProductCard.vue';
import AddProduct from '@/components/AddProduct.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    HeaderComp,
    ProductCard,
    AddProduct,
},
  data() {
    return {
      drawer: false,
      admin: false,
      snackbar: false,
      message: '',
      color: '',
    }
  },
  computed: {
    ...mapState([
      'user',
      'products',
    ])
  },
  methods: {
    ...mapActions([
      'fetchProducts',
    ]),
    isAdmin() {
      if(this.user.role === 'admin') {
        this.admin = true;
      }
    },
    snackbarMessage(message, color) {
      this.message = message;
      this.color = color;
      this.snackbar = true;
    },
  },
  mounted() {
    this.fetchProducts();
    this.isAdmin();
  }
}
</script>