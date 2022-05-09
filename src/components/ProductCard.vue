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
    <v-card-actions class="justify-center">
      <BuyProduct :product="product" :user="user" :money="noMoney" />
    </v-card-actions>
  </v-card>          
</template>

<script>
import { mapState } from 'vuex';
import BuyProduct from './BuyProduct.vue';
export default {
  components: {
    BuyProduct,
},
  props: {
    product: Object,
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
</style>