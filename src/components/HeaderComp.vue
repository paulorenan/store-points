<template>
  <v-app-bar
    color="#42b983"
    fixed
  >
    <v-toolbar-title>Loja de Pontos</v-toolbar-title>
    <v-toolbar-items class="ml-3"
      v-if="$vuetify.breakpoint.smAndUp"
    >
      <v-btn
        :to="{ name: 'products' }"
        class="btn"
        outlined
        text
      >
        Produtos
      </v-btn>
      <v-btn
        :to="{ name: 'login' }"
        class="btn"
        outlined
        text
      >
        Meus Pedidos
      </v-btn>
      <v-btn
        v-if="admin"
        :to="{ name: 'register' }"
        class="btn"
        outlined
        text
      >
        Usuarios
      </v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <div class="mobile">
      <v-btn
        icon
        @click="$router.push('/products')"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="$router.push('/products')"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </div>
    <v-btn
      icon
      @click="logout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex';
  export default {
    data: () => ({
      drawer: false,
      group: null,
      admin: false,
    }),
    computed: {
      ...mapState([
        'user',
      ])
    },
    methods: {
      ...mapActions([
      'logout'
      ]),
      isAdmin() {
        if(this.user.role === 'admin') {
          this.admin = true;
        }
      }
    },
    mounted() {
      this.isAdmin();
    },
  }
</script>

<style>
.btn {
  margin-left: 10px;
  background-color: #42b983;
}
</style>