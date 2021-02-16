<template>
  <v-row>
    <v-col class="text-center">
      <game />
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import game from '~/components/games/Game_1'

export default {
  components: {
    game
  },
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    if (!user) {
      redirect('/Login')
    }
  }
}
</script>
