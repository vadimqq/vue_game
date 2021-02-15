<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        kek
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    if (!user) {
      redirect('/Login')
    }
  }
}
</script>
