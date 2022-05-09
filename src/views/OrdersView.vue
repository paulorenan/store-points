<template>
  <v-app>
    <v-main class="grey lighten-2">
      <HeaderComp />
      <v-container class="mt-16 orderCont">
        <v-simple-table class="orderTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Pontos</th>
              <th>Dia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order) in orders" :key="order.id">
              <td>{{ order.product.name }}</td>
              <td>{{ order.product.price }}</td>
              <td>{{ new Date(order.createdAt).toLocaleDateString('pt-BR') }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  components: {
    HeaderComp,
},
  data() {
    return {
      orders: [],
    }
  },
  computed: {
    ...mapState([
      'user',
    ]),
  },
  methods: {
    getOrders() {
      axios.get(`https://store-points-back.herokuapp.com/api/sales/${this.user.id}`).then(response => {
        this.orders = response.data.sales;
      }).catch(error => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getOrders();
  },
}
</script>

<style>
.orderTable {
  width: 100%;
  max-width: 600px;
  border-radius: 5%;
}
.orderCont {
  display: flex;
  justify-content: center;
}
</style>