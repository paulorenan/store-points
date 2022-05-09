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
      <v-container class="mt-16 orderCont">
        <v-simple-table class="orderTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Pontos</th>
              <th>Função</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user) in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.coins }}</td>
              <td>{{ adminOrUser(user) }}</td>
              <td>
                <EditUser :user="user" :snackbar="snackbarMessage" :getUsers="getUsers" />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import axios from "axios";
import EditUser from "../components/EditUser.vue";

export default {
  components: {
    HeaderComp,
    EditUser
},
  data: () => ({
    users: [],
    snackbar: false,
    message: '',
    color: '',
  }),
  methods: {
    getUsers() {
      axios.get("https://store-points-back.herokuapp.com/api/users").then(response => {
        this.users = response.data.users;
      }).catch(error => {
        console.log(error);
      });
    },
    adminOrUser(user) {
      if (user.role === "admin") {
        return "Administrador";
      } else {
        return "Cliente";
      }
    },
    snackbarMessage(message, color) {
      this.message = message;
      this.color = color;
      this.snackbar = true;
    },
  },
  mounted() {
    this.getUsers();
  },
};

</script>
