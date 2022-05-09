<template>
  <v-app-bar
    color="teal accent-3"
    fixed
  >
      <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-app-bar-nav-icon
          icon
          v-bind="attrs"
          v-on="on"
          v-if="!$vuetify.breakpoint.smAndUp"
        />
      </template>
      <v-list>
        <v-list-item-group>
          <v-list-item
            :to="{ name: 'products' }"
            class="btn"
            outlined
            text
          >
            Produtos  
          </v-list-item>
          <v-list-item
            :to="{ name: 'login' }"
            class="btn"
            outlined
            text
          >
            Meus Pedidos
          </v-list-item>
          <v-list-item
            v-if="admin"  
            :to="{ name: 'register' }"
            class="btn"
            outlined
            text
          >
            Usuarios
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-toolbar-title>Loja de Pontos</v-toolbar-title>
    <v-toolbar-items class="ml-3"
      v-if="$vuetify.breakpoint.smAndUp"
    >
      <v-btn
        :to="{ name: 'products' }"
        outlined
        text
      >
        Produtos
      </v-btn>
      <v-btn
        :to="{ name: 'login' }"
        outlined
        text
      >
        Meus Pedidos
      </v-btn>
      <v-btn
        v-if="admin"
        :to="{ name: 'register' }"
        outlined
        text
      >
        Usuarios
      </v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <v-toolbar-items class="coin">
      <span>
      {{(user.coins)}}
      </span>
      <v-icon>mdi-cash</v-icon>
    </v-toolbar-items>
    <v-spacer/>
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
  .coin {
    display: flex;
    align-items: center;
  }
</style>