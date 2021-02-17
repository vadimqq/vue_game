<template>
  <div class="history-table">
    <h2 class="history-table__title">История игр</h2>
    <ul class="history-wrapper">
      <li class="history" v-for="(item, index) in getData" :key="index">
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
  computed: {
    ...mapGetters('game', ['getData'])
  }
}
</script>
