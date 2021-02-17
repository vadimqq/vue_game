<template>
  <div class="small">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    graphicData: {
      date: [],
      time: [],
      rounds: [],
      fails: []
    }
  }),
  extends: Line,
  computed: {
    ...mapGetters('game', ['getData'])
  },
  mounted () {
    this.setupData()
    this.renderChart({
      labels: this.graphicData.date,
      datasets: [
        {
          label: 'Раундов',
          backgroundColor: '#008B8B',
          data: this.graphicData.rounds
        },
        {
          label: 'Время прохождения',
          backgroundColor: '#FF6347',
          data: this.graphicData.time
        },
        {
          label: 'Ошибок',
          backgroundColor: '#8B0000',
          data: this.graphicData.fails
        }
      ]
    }, { responsive: true, maintainAspectRatio: false })
  },
  methods: {
    setupData () {
      this.graphicData.date = this.getData.map(item => item.date.day + '.' + item.date.mounth + '.' + item.date.year)
      this.graphicData.time = this.getData.map(item => item.time)
      this.graphicData.rounds = this.getData.map(item => item.rounds)
      this.graphicData.fails = this.getData.map(item => item.fail)
    }
  }
}
</script>

<style>
canvas {
  height: 400px;
}
</style>
