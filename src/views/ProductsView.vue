<template>
  <v-app>
    <v-main class="grey lighten-2">
      <HeaderComp />
      <v-row class="mt-13">
        <v-col cols="12" v-if="admin" class="mt-5">
          <v-btn rounded dark>
            Adicionar Produto
          </v-btn>
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
          <v-card class="mx-auto" max-width="300">
            <v-img
              :src="product.image"
              height="250"
              max-width="374"
              class="mx-auto"
              contain
            />
            <v-card-title>
              <v-card-text class="justify-center">
                <h3 class="text">{{ product.name }}</h3>
              </v-card-text>
            </v-card-title>
            <v-card-text>
              <span>
              {{ product.price }}
              </span>
              <v-icon>mdi-bitcoin</v-icon>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                class="mx-auto mb-5"
                color="primary"
              >
                Comprar
              </v-btn>
            </v-card-actions>
          </v-card>          
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    HeaderComp
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