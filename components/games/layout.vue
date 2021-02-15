<template>
  <div class="game-wrapper">
    <div class="game__ui-top">
      <div class="game__timer"></div>
      <div class="game__lvl"></div>
    </div>
    <div class="game__content">
      сама игра
    </div>
    <div class="game__ui-bottom">
      <v-btn
        color="success"
        class="mr-4 game__btn"
        @click="onStart"
      >
        НАЧАТЬ
      </v-btn>
    </div>
  </div>
</template>

<style>
.game-wrapper {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 700px;
  height: 700px;
  padding: 20px;
  background: white;
}
.game__content {
  color: black;
}
.game__timer {
  width: 100%;
  height: 20px;
  background: red;
}
</style>

<script>
export default {
  data: () => ({
    timer: null,
    currentTime: 40
  }),
  methods: {
    onStart () {
      this.timer = setInterval(() => {
        this.currentTime--
        console.log(this.currentTime)
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    }
  },
  destroyed () {
    this.stopTimer()
  },
  watch: {
    currentTime (time) {
      if (time === 0) {
        this.stopTimer()
      }
    }
  }
}
</script>
