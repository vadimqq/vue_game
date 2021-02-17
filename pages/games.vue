<template>
  <v-row>
    <v-col class="text-center">
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.url"
          :disabled="item.off"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data: () => ({
    items: [
      { title: 'Игра 1', url: '/game_1', off: false },
      { title: 'Игра 2', url: '/game_2', off: false }
    ]
  }),
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    if (!user) {
      redirect('/Login')
    }
  }
}
</script>
