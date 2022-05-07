<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3 mb-4">
                        Login
                      </h1>
                      <h4 class="text-center mlt-4">
                        Please enter your credentials to login
                      </h4>
                      <v-form>
                        <v-text-field
                          label="Email"
                          v-model="email"
                          :rules="emailRules"
                          prepend-icon="email"
                          @keyup.native="validate"
                          name="email"
                          type="text"
                          required
                          color="teal accent-3"
                        />
                        <v-text-field
                          id="password"
                          label="Password"
                          name="Password"
                          prepend-icon="lock"
                          v-model="password"
                          :rules="passwordRules"
                          @keyup.native="validate"
                          type="password"
                          color="teal accent-3"
                          required
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3 mb-5">
                      <v-btn rounded color="teal accent-3" @click="login" dark>
                        Login
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="teal accent-3">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">
                        Olá, Visitante!
                      </h1>
                      <h5 class="text-center">
                        Faça cadastro para ver nossos incríveis produtos!
                      </h5>
                    </v-card-text>
                    <div class="text-center mt-3 mb-9">
                      <v-btn rounded outlined="" dark>
                          Cadastre-se
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<!-- <template>
  <div class="login">
    <div v-if="loggingIn" class="container-loading">
      <img src="/loading.gif" alt="Loading Icon">
    </div>
    <p v-if="loginError">{{ loginError }}</p>
    <form @submit.prevent="loginSubmit">
      <input type="email" placeholder="E-Mail" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template> -->

<script>
  import { mapState, mapActions } from 'vuex';
  import '../styles/Login.css';

  export default {
    data() {
      return {
        email: '',
        password: '',
        step: 1,
      }
    },
    props: {
      source: String
    },
    computed: {
      ...mapState([
        'loggingIn',
        'loginError',
      ])
    },
    methods: {
      ...mapActions([
        'doLogin'
      ]),
      loginSubmit() {
        this.doLogin({
          email: this.email,
          password: this.password
        });
      }
    }
  }
</script>

<style>
@import '../styles/Login.css';
</style>