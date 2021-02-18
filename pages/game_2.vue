<template>
  <v-row>
    <game />
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import Game from '~/components/games/Game_2'

export default {
  components: {
    Game
  },
  data: () => ({
  }),
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    if (!user) {
      redirect('/Login')
    }
  },
  mounted () {
  }
}
</script>
