<template>
  <v-app>
    <v-main class="grey lighten-2">
      <HeaderComp />
      <v-row class="mt-16">
        <v-col cols="12" v-if="admin" class="mt-5">
          <AddProduct />
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
          <ProductCard :product="product" />
        </v-col>
      </v-row>
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
  },
  mounted() {
    this.fetchProducts();
    this.isAdmin();
  }
}
</script>