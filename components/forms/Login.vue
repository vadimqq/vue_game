<template>
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
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="login"
    >
      Войти
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Регистрация
    </v-btn>
  </v-form>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
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
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((data) => {
        this.$router.push('/Home')
      }).catch(error => (this.error = error))
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
