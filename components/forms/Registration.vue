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
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Имя"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Для продолжения необходимо подтвердить!']"
      label="Подтверждаю обработку персональных данных"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
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
export default {
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
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
