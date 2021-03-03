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
            Регистрация
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
              v-model="name"
              :rules="nameRules"
              :counter="10"
              label="Имя"
              required
            />

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            />

            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'Для продолжения необходимо подтвердить!']"
              label="Подтверждаю обработку персональных данных"
              required
            />

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="OnSubmit"
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
    name: '',
    password: '',
    checkbox: false,
    emailRules: [
      v => !!v || 'Обязательное поле',
      v => /.+@.+\..+/.test(v) || 'Введите корректный E-mail'
    ],
    nameRules: [
      v => !!v || 'Обязательное поле',
      v => v.length <= 10 || 'Слишком длинное имя'
    ],
    passwordRules: [
      v => !!v || 'Обязательное поле'
    ]
  }),
  methods: {
    async OnSubmit () {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('auth/register', formData)
        this.$router.push('/home')
      } catch (e) {}
    }
  }
}
</script>

<style>
.form-wrapper {
  padding: 20px;
}
</style>
