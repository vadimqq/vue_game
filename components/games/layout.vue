<template>
  <div class="game-wrapper">
    <div class="game__ui-top">
      <v-progress-linear
        v-model="currentTime"
        color="blue-grey"
        height="25"
      >
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
      <div class="game__lvl">
        1LVL
      </div>
    </div>
    <div class="game__content">
      <div
        v-for="(item, index) in items"
        :key="item.index"
        ref="block"
        class="game-block"
        :class="[item.type ,{active: activeIndex === index }]"
        :active="activeIndex === index"
        @click="onChange(index)"
      />
    </div>
    <div class="game__ui-bottom">
      <v-btn
        color="success"
        class="mr-4 game__btn"
        @click="onStart"
      >
        НАЧАТЬ
      </v-btn>
      <v-btn
        color="success"
        class="mr-4 game__btn"
        @click="onFinish"
      >
        ДАЛЕЕ
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
  box-sizing: border-box
}
.game-block.active {
  border: 5px solid blue;
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
    currentTime: 0,
    DataTime: 0,
    activeIndex: -1,
    items: [
      { type: 'medium' },
      { type: 'large' },
      { type: 'small' }
    ]
  }),
  methods: {
    onStart () {
      this.timer = setInterval(() => {
        this.currentTime++
      }, 1000)
    },
    onFinish () {
      const dataGame = {
        time: this.currentTime,
        complite: false
      }
      this.$refs.block.map(function (item) {
        if (item.classList.contains('active') && item.classList.contains('small')) {
          dataGame.complite = true
          return true
        } else {
          return false
        }
      })
      console.log(dataGame)
      this.stopTimer()
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
    onChange (index) {
      if (this.activeIndex === index) {
        this.activeIndex = -1
      } else {
        this.activeIndex = index
      }
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
