<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-12">
              <v-window>
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="teal accent-3">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">
                        Já é nosso cliente?
                      </h1>
                      <h5 class="text-center">
                        Faça seu login para acessar suas compras
                      </h5>
                    </v-card-text>
                    <div class="text-center mt-3 mb-2">
                      <v-btn rounded outlined="" dark @click="login">
                        Login
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3 mb-4">
                        Cadastro
                      </h1>
                      <h4 class="text-center mlt-4">
                        Por favor, insira seus dados para o cadastro
                      </h4>
                      <v-form v-model="valid" @submit.prevent="register">
                        <v-text-field
                          label="Nome"
                          v-model="name"
                          :rules="nameRules"
                          prepend-icon="person"
                          name="name"
                          type="text"
                          required
                          color="teal accent-3"
                        />
                        <v-text-field
                          label="E-mail"
                          v-model="email"
                          :rules="emailRules"
                          prepend-icon="email"
                          name="email"
                          type="email"
                          required
                          color="teal accent-3"
                        />
                        <v-text-field
                          id="password"
                          label="Senha"
                          name="Password"
                          prepend-icon="lock"
                          v-model="password"
                          :rules="passwordRules"
                          type="password"
                          color="teal accent-3"
                          required
                        />
                      </v-form>
                      <span v-if="registerError" class="red--text" >E-mail já cadastrado</span>
                    </v-card-text>
                    <div class="text-center mt-3 mb-5">
                      <v-btn rounded color="teal accent-3" @click="register" dark :loading="registeringIn">
                        Cadastrar
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import '../styles/Login.css';

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        valid: false,
        nameRules: [
          v => !!v || 'Nome é obrigatório',
          v => v.length <= 20 || 'Nome deve ter no máximo 20 caracteres',
        ],
        emailRules: [
          v => !!v || 'E-mail é obrigatório',
          v => /.+@.+\..+/.test(v) || 'E-mail inválido',
        ],
        passwordRules: [
          v => !!v || 'Senha é obrigatória',
          v => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
        ],
      }
    },
    props: {
      source: String
    },
    computed: {
      ...mapState([
        'registeringIn',
        'registerError',
      ])
    },
    methods: {
      ...mapActions([
        'doRegister',
      ]),
      login() {
        this.$router.push('/login');
      },
      register() {
        if(this.valid) {
          this.doRegister({
            email: this.email,
            password: this.password,
            name: this.name,
          });
        }
      },
    }
  }
</script>

<style>
@import '../styles/Login.css';
</style>