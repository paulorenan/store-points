<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-12">
              <v-window>
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text--accent-3 mb-4">
                        Login
                      </h1>
                      <h4 class="text-center mlt-4">
                        Por favor, coloque seus dados de acesso
                      </h4>
                      <v-form v-model="valid" @submit.prevent="loginSubmit">
                        <v-text-field
                          label="E-mail"
                          v-model="email"
                          :rules="emailRules"
                          prepend-icon="email"
                          name="email"
                          type="email"
                          required
                          color="teal accent-3"
                          focus="true"
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
                      <span v-if="loginError" class="red--text" >Email ou senha incorretos</span>
                    </v-card-text>
                    <div class="text-center mt-3 mb-5">
                      <v-btn rounded color="teal accent-3" @click="loginSubmit" dark :loading="loggingIn">
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
                      <v-btn rounded outlined="" dark @click="register">
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
    </v-main>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import '../styles/Login.css';

  export default {
    data() {
      return {
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'E-mail é obrigatório',
          v => /.+@.+\..+/.test(v) || 'E-mail inválido',
        ],
        passwordRules: [
          v => !!v || 'Senha é obrigatória'
        ],
        valid: false,
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
        if(this.valid) {
          this.doLogin({
            email: this.email,
            password: this.password
          });
        }
      },
      register() {
        this.$router.push('/register');
      }
    }
  }
</script>