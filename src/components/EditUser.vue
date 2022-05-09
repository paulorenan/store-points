<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="mx-1"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Editar {{ user.name}}
        </v-card-title>
        <v-col>
          <v-form class="mt-3" v-model="valid" @submit.prevent="updateUser">
            <v-select
              v-model="role"
              :items="roles"
              label="Função"
              :disabled="isAdmin(user)"
              dense
              />
            <v-text-field
              v-model="coins"
              label="Pontos"
              dense
              class="mt-3"
              type="number"
              :rules="coinsRules"
            />
          </v-form>
        </v-col>
        <v-divider/>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="dialog = false"
            :loading="loading"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="editUser"
            :loading="loading"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import store from '@/store';

  export default {
    data () {
      return {
        dialog: false,
        roles: [
          { text: 'Administrador', value: 'admin' },
          { text: 'Cliente', value: 'user' },
        ],
        role: '',
        coins: null,
        loading: false,
        valid: false,
        coinsRules: [
          v => !!v || 'Por favor, preencha o campo',
          v => /^\d+$/.test(v) || 'Por favor, preencha com um número',
        ],
      }
    },
    props: {
      user: Object,
      snackbar: Function,
      getUsers: Function,
    },
    computed: {
      ...mapState([
        'token',
      ]),
    },
    methods: {
      ...mapActions([
        'fetchLoading',
      ]),
      isAdmin(user) {
        return user.role === 'admin';
      },
        editUser() {
        if(this.valid) {
          this.loading = true;
          axios.defaults.headers.common['Authorization'] = this.token;
          axios.put(`https://store-points-back.herokuapp.com/api/users/${this.user.id}`, {
            role: this.role,
            coins: this.coins,
          }).then(() => {
            this.getUsers();
            if(store.state.user.id === this.user.id) {
              this.fetchLoading();
            }
            this.loading = false;
            this.dialog = false;
            this.snackbar('Usuário editado com sucesso!', 'success');
          }).catch(() => {
            this.loading = false;
            this.dialog = false;
            this.snackbar('Erro ao editar usuário!', 'error');
          });
        } else {
          this.snackbar('Por favor, preencha todos os campos!', 'error');
        }
      },
    }, 
    mounted () {
      this.coins = this.user.coins;
      this.role = this.user.role;
    },
  }
</script>