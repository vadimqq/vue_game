<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <div class="form-wrapper">
          <v-card-title class="headline">
            Demo VUE game
          </v-card-title>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            />

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="OnSubmit"
            >
              Войти
            </v-btn>
            <v-btn
              color="error"
              class="mr-4"
              @click="regLink"
            >
              Регистрация
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    valid: true,
    email: '',
    max: 6,
    emailRules: [
      v => !!v || 'Обязательное поле',
      v => /.+@.+\..+/.test(v) || 'Введите корректный E-mail'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Обязательное поле'
    ]
  }),
  methods: {
    async OnSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('auth/login', formData)
        this.$router.push('/games')
      } catch (e) {}
    },
    regLink () {
      this.$router.push('/registration')
    }
  }
}
</script>

<style>
.form-wrapper {
  padding: 20px;
}
</style>
