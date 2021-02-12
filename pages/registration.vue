<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Регистрация
        </v-card-title>
        <regestration />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Regestration from '~/components/forms/Registration.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    Regestration
  }
}
</script>
