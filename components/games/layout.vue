<template>
  <div class="game-wrapper">
    <div class="game__ui-top">
      <v-progress-linear
        v-model="currentTime"
        color="blue-grey"
        height="25"
      >
        <template v-slot:default="{ value }">
          <strong>{{  Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
      <div class="game__lvl"></div>
    </div>
    <div class="game__content">
      <div class="game-block large" @click="onChange"></div>
      <div class="game-block small" @click="onChange"></div>
      <div class="game-block medium" @click="onChange"></div>
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-block {
  margin: 10px;
  transition: 0.3s;
  cursor: pointer;
}
.game-block:hover {
  transform: scale(1.1);
}
.large {
  width: 200px;
  height: 200px;
  background: blueviolet;
}
.medium {
  width: 150px;
  height: 150px;
  background: red;
}
.small {
  width: 100px;
  height: 100px;
  background: green;
}

</style>

<script>
export default {
  data: () => ({
    timer: null,
    currentTime: 0
  }),
  methods: {
    onStart () {
      this.timer = setInterval(() => {
        this.currentTime++
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
    onChange () {
      console.log(this)
    }
  },
  destroyed () {
    this.stopTimer()
  },
  watch: {
    currentTime (time) {
      if (time === 100) {
        this.stopTimer()
      }
    }
  }
}
</script>
