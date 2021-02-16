<template>
  <v-row>
    <v-col class="text-center">
      <canvas ref="game" width="600" height="600px" style="border: 1px solid white"/>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data: () => ({
    context: {},
    position: {
      x: 0,
      y: 0
    }
  }),
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    if (!user) {
      redirect('/Login')
    }
  },
  mounted () {
    this.context = this.$refs.game.getContext('2d')

    this.context.fillStyle = 'green'
    this.context.fillRect(this.position.x, this.position.y, 50, 50)
  }
}
</script>
