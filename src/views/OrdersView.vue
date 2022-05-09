<template>
  <v-app>
    <HeaderComp />
  </v-app>
</template>

<script>
import HeaderComp from '../components/HeaderComp.vue';
import { mapState } from 'vuex';

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
}
</script>
