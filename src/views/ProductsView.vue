<template>
  <v-app>
    <v-main>
      <HeaderComp />
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <p>
            {{ user.name }}
          </p>
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
  },
  mounted() {
    this.fetchProducts();
  }
}
</script>