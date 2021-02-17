<template>
  <v-row>
    <v-col class="text-center">
      <v-card>
        <v-tabs
          v-model="tab"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            History
            <v-icon>mdi-menu</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Statistic
            <v-icon>mdi-menu</v-icon>
          </v-tab>

          <v-tab href="#tab-3" disabled>
            favorite game
            <v-icon>mdi-menu</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :value="'tab-1'">
            <v-card flat>
              <history />
            </v-card>
          </v-tab-item>
          <v-tab-item :value="'tab-2'">
            <v-card flat>
              <statistic />
            </v-card>
          </v-tab-item>
          <v-tab-item :value="'tab-3'">
            <v-card flat>
              kek
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

import History from '~/components/profile/History'
import Statistic from '~/components/profile/Statistic'

export default {
  components: {
    History,
    Statistic
  },
  data: () => ({
    tab: null
  }),
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    if (!user) {
      redirect('/Login')
    }
  },
  async mounted () {
    await this.$store.dispatch('game/fetchDataGame')
  }
}
</script>
