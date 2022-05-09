<template>
  <v-card class="mx-auto pCard" max-width="300">
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
      <v-icon>mdi-cash</v-icon>
    </v-card-text>
    <v-card-actions class="card-action">
      <EditProduct :product="product" :snackbar="snackbar" v-if="isAdmin(user)" />
      <BuyProduct :product="product" :user="user" :money="noMoney" :snackbar="snackbar"/>
      <DeleteProduct :product="product" :snackbar="snackbar" v-if="isAdmin(user)" />
    </v-card-actions>
  </v-card>          
</template>

<script>
import { mapState } from 'vuex';
import BuyProduct from './BuyProduct.vue';
import EditProduct from './EditProduct.vue';
import DeleteProduct from './DeleteProduct.vue';
export default {
  components: {
    BuyProduct,
    EditProduct,
    DeleteProduct
},
  props: {
    product: Object,
    snackbar: Function,
  },
  computed: {
    ...mapState([
      'user',
    ]),
  },
  data: () => ({
    noMoney: false,
  }),
  methods: {
    hasMoney() {
      if(this.user.coins >= this.product.price) {
        this.noMoney = false;
      } else {
        this.noMoney = true;
      }
    },
    isAdmin(user) {
      return user.role === 'admin';
    },
  },
  mounted() {
    this.hasMoney();
  },
}
</script>

<style>
.pCard {
  margin: 0 auto;
  max-width: 300px;
  width: 100%;
  padding-top: 20px;
}
.card-action {
  justify-content: space-between;
  align-items: center;
}
</style>