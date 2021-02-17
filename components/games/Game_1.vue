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
        {{lvl}} lvl
      </div>
    </div>
    <div class="game__congratulations" v-if="gameFinish">
      ты прошел :)
    </div>
    <div class="game__content" v-else>
      <v-btn
          v-if="!gameState"
          color="success"
          class="mr-4 game__btn"
          @click="onStart"
        >
          НАЧАТЬ
      </v-btn>
      <div class="game__viewport" v-else>
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
    </div>
    <div class="game__ui-bottom">
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
.game__viewport {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.game__congratulations {
  font-size: 20px;
  color: black;
}
.game__lvl {
  color: black;
}
.game-block {
  margin: 10px;
  transition: 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 5px;
}
.game-block:hover {
  transform: scale(1.1);
}
.large {
  width: 150px;
  height: 150px;
  background: blueviolet;
}
.medium {
  width: 120px;
  height: 120px;
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
    gameFinish: false,
    gameState: false,
    lvl: 1,
    timer: null,
    totalTime: 300,
    currentTime: 0,
    activeIndex: -1,
    failCounter: 0,
    items: [
      { type: 'medium' },
      { type: 'large' },
      { type: 'small' }
    ],
    data: [],
    lvlCounter: 0
  }),
  methods: {
    onStart () {
      this.gameState = true
      this.startTimer()
    },
    onEnd () {
      this.stopTimer()
      this.gameState = false
      this.gameFinish = true
      this.setData()
      this.resetLvl()
    },
    startTimer () {
      const stepTime = (this.totalTime / 100) * 1000
      this.timer = setInterval(() => {
        this.currentTime++
      }, stepTime)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
    randomBlock (array) {
      array.sort(() => Math.random() - 0.5)
    },
    onChange (index) {
      if (this.activeIndex !== index) {
        this.activeIndex = index
      }
      this.finished()
    },
    resetLvl () {
      this.lvlCounter = 0
      this.lvl = 1
      this.failCounter++
      this.items = [
        { type: 'medium' },
        { type: 'large' },
        { type: 'small' }
      ]
    },
    lvlCount (value) {
      const limit = 5 * this.lvl
      if (value === true) {
        this.lvlCounter++
      } else {
        this.resetLvl()
      }
      if (this.lvlCounter >= limit) {
        this.lvl++
        this.updateLvl()
      }
    },
    updateLvl () {
      this.items.push(
        { type: 'medium' },
        { type: 'large' }
      )
    },
    finished () {
      const dataGame = {
        time: this.currentTime,
        complite: false
      }
      setTimeout(() => {
        this.$refs.block.map((item) => {
          if (item.classList.contains('active') && item.classList.contains('small')) {
            dataGame.complite = true
            return true
          } else {
            return false
          }
        })
        this.data.push(dataGame)
        if (this.lvl < 6) {
          this.lvlCount(dataGame.complite)
        }
        this.randomBlock(this.items)
      }, 0)
    },
    async setData () {
      const date = new Date()
      try {
        await this.$store.dispatch('game/createDataGame', {
          name: 'Больше/меньше',
          time: (this.totalTime / 100) * this.currentTime,
          rounds: this.data.length,
          fail: this.failCounter,
          date: {
            mounth: date.getMonth() + 1,
            day: date.getDate(),
            year: date.getFullYear()
          }
        })
      } catch (e) {
        console.log(e)
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
    },
    lvl () {
      if (this.lvl > 5) {
        this.onEnd()
      }
    }
  }
}
</script>
