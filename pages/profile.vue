<template>
  <v-row>
    <v-col class="text-center">
      <ul class="history-wrapper">
        <h2 class="history__title">История игр</h2>
        <li class="history" v-for="(item, index) in records" :key="index">
          <div class="history__date">
            <span>День: {{ item.date.day }}</span>
            <span>месяц: {{ item.date.mounth }}</span>
          </div>
          <div class="history__info">
            <span class="history__round"> Раундов: {{ item.rounds }}</span>
            <span class="history__time">Время: {{ item.time }}</span>
            <span class="history__fail">Ошибок: {{ item.fail }}</span>
          </div>
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data: () => ({
    records: []
  }),
  asyncData ({ req, redirect }) {
    const user = firebase.auth().currentUser
    if (!user) {
      redirect('/Login')
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('game/fetchDataGame')
  }
}
</script>

<style>
.history {
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  border: 1px solid white;
}
.history__info {
  display: flex;
  flex-direction: column;
}
</style>
