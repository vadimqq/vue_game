<template>
  <div class="history-table">
    <h2 class="history-table__title">История игр</h2>
    <v-card>
      <v-tabs
        v-model="tab"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="(block, index) in getData" :key="index" :href="'#tab-' + (index + 1)">
          {{ block[0].name }}
        </v-tab>

      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(block, index) in getData" :key="index" :value="'tab-' + (index + 1)">
          <v-card flat>
            <ul class="history-wrapper">
              <li class="history" v-for="(item, index) in block" :key="index">
                <div class="history__name">Игра: {{ item.name }}</div>
                <div class="history__date">
                  Дата: {{ item.date.day }}.{{ item.date.mounth }}.{{ item.date.year }}
                </div>
                <div class="history__info">
                  <span class="history__round"> Раундов: {{ item.rounds }}</span>
                  <span class="history__time">Время: {{ item.time }}</span>
                  <span class="history__fail">Ошибок: {{ item.fail }}</span>
                </div>
              </li>
            </ul>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<style>
.history-wrapper {
  padding: 0 24px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.history {
  list-style: none;
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  width: 55%;
  margin-bottom: 30px;
  border: 1px solid white;
  border-radius: 10px;
  padding: 30px;
}
.history__info {
  display: flex;
  flex-direction: column;
}
.history__name {
  font-size: 20px;
  color: darkorange;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    tab: null
  }),
  computed: {
    ...mapGetters('game', ['getData'])
  },
  mounted () {
    console.log(this.getData)
  }
}
</script>
