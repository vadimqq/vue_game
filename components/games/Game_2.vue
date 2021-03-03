<template>
  <div class="game">
    <div class="game__top-menu">
      <span class="game__hp">свапы: {{ playerLife }}</span>
      <v-btn
        depressed
        color="error"
        @click="toggleMenu"
        :disabled="stateEndGame"
      >
        меню
      </v-btn>
      <span class="game__points">очки: {{ points }}</span>
    </div>
    <div class="game__menu" v-show="stateMenu">
      <v-btn
        class="game__menu-btn"
        depressed
        color="primary"
        @click="restartGame"
      >
        Начать заново
      </v-btn>
      <v-btn
        class="game__menu-btn"
        depressed
        color="primary"
        @click="toggleMenu"
        v-show="!stateEndGame"
      >
        Продолжить
      </v-btn>
      <v-btn
        class="game__menu-btn"
        depressed
        color="primary"
        disabled
        v-show="!stateEndGame"
      >
        Выйти
      </v-btn>
    </div>
    <div class="game__viewport" v-show="!stateMenu">
      <div class="game__row" v-for="(row, index) in viewport" :key="index" v-bind:renderCounter="renderCounter">
        <div
          class="game__block"
          v-for="(block, id) in viewport[index]"
          :key="id"
          ref="block"
          :style="{ 'background-color': block.type }"
          @click="onChange(index, id, $event.target)"
          :class="[{ active: activeIndex === index + '/' + id }, getTransformIndex(index, id)]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    fps: 200,
    stateMenu: false,
    stateEndGame: false,
    activeIndex: null,
    viewport: [],
    quality: 10,
    renderCounter: 1,
    playerLife: 10,
    points: 0,
    hitCounter: 0,
    types: [
      'red',
      'green',
      'purple',
      'blue',
      'orange'
    ],
    elemId: null
  }),
  mounted () {
    this.startGame()
  },
  methods: {
    render () {
      setInterval(() => {
        this.renderCounter++
        this.destroyArray()
        this.updateViewport()
        this.addNewRow()
      }, this.fps)
    },
    startGame () {
      this.createViewport()
      this.createTypes()
      this.randomize()
      this.render()
    },
    restartGame () {
      this.stateEndGame = false
      this.viewport = []
      this.points = 0
      this.playerLife = 10
      this.startGame()
      this.stateMenu = false
    },
    createViewport () {
      for (let row = 0; row < this.quality; row++) {
        this.viewport.push([])
        this.viewport[row] = []
        for (let col = 0; col < this.quality; col++) {
          const block = { type: '' }
          this.viewport[row].push(block)
        }
      }
    },
    randomize () {
      for (let i = 0; i < this.viewport.length; i++) {
        this.viewport[i].sort(() => Math.random() - 0.5)
      }
    },
    createTypes () {
      this.viewport.map((row) => {
        row.map((block) => {
          const type = this.types[Math.floor(Math.random() * this.types.length)]
          block.type = type
          return block
        })
        return row
      })
    },
    transform (elemID) {
      const transformElemId = {
        row: parseInt(elemID.split('/')[0]),
        col: parseInt(elemID.split('/')[1])
      }
      const activeElemId = {
        row: parseInt(this.activeIndex.split('/')[0]),
        col: parseInt(this.activeIndex.split('/')[1])
      }
      const activeElem = this.viewport[activeElemId.row][activeElemId.col]
      const transformElem = this.viewport[transformElemId.row][transformElemId.col]
      this.viewport[transformElemId.row][transformElemId.col] = activeElem
      this.viewport[activeElemId.row][activeElemId.col] = transformElem
      this.activeIndex = null
      this.playerLife -= 1
      if (this.playerLife === 0) {
        this.setData()
        this.stateEndGame = true
        this.stateMenu = true
      }
    },
    onChange (row, id, elem) {
      const currentElemId = row + '/' + id
      if (this.activeIndex !== currentElemId && !elem.classList.contains('transform')) {
        this.activeIndex = currentElemId
      } else if (elem.classList.contains('transform')) {
        this.transform(row + '/' + id)
      }
    },
    getTransformIndex (index, id) {
      if (this.activeIndex === (index + 1) + '/' + (id)) {
        return 'transform up'
      } else if (this.activeIndex === (index - 1) + '/' + (id)) {
        return 'transform down'
      } else if (this.activeIndex === (index) + '/' + (id + 1)) {
        return 'transform left'
      } else if (this.activeIndex === (index) + '/' + (id - 1)) {
        return 'transform right'
      } else {
        return false
      }
    },
    destroyArray () {
      this.viewport = this.viewport.map((row, index) => {
        row.map((block, id) => {
          if (id + 2 >= this.viewport[index].length) {
            return block
          } else if (block.type === this.viewport[index][id + 1].type && block.type === this.viewport[index][id + 2].type && block.type !== '') {
            for (let i = 0; i < this.quality - id; i++) {
              if (block.type === this.viewport[index][id + i].type) {
                this.hitCounter += 1
              } else {
                break
              }
            }
            for (let i = 0; i < this.hitCounter; i++) {
              this.viewport[index][id + i].type = ''
            }
            this.pointCounter()
            this.playerLife += 1
            this.hitCounter = 0
            return block
          } else {
            return block
          }
        })
        return row
      })
    },
    updateViewport () {
      for (let row = 0; row < this.viewport.length; row++) {
        for (let block = 0; block < this.viewport[row].length; block++) {
          if (this.viewport[row][block].type === '') {
            if ((this.viewport.length - 1) !== row) {
              const type = this.viewport[row + 1][block].type
              this.viewport[row + 1][block].type = ''
              this.viewport[row][block].type = type
            }
          }
        }
      }
    },
    addNewRow () {
      const lastRow = this.viewport[this.viewport.length - 1].filter((item) => {
        if (item.type === '') {
          return false
        } else {
          return item
        }
      })
      if (lastRow.length === 0) {
        this.viewport[this.viewport.length - 1].map((block) => {
          const type = this.types[Math.floor(Math.random() * this.types.length)]
          block.type = type
          return block
        })
      }
    },
    pointCounter () {
      this.points += 10 * this.hitCounter
    },
    toggleMenu () {
      this.stateMenu = !this.stateMenu
    },
    async setData () {
      const date = new Date()
      try {
        await this.$store.dispatch('game/createDataGame', {
          name: 'Три в ряд',
          time: null,
          rounds: null,
          fail: null,
          scores: this.points,
          date: {
            mounth: date.getMonth() + 1,
            day: date.getDate(),
            year: date.getFullYear()
          },
          gameDir: 'three_in_a_row'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.game {
  margin: auto;
  background-color: white;
  position: relative;
  width: 700px;
  height: 820px;
}
.game__viewport {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 0 40px;
}
.game__row {
  display: flex;
}
.game__block {
  width: 55px;
  height: 55px;
  border-radius: 5px;
  margin: 5px;
  border: 1px solid grey;
  box-sizing: border-box;
}
.game__block.active {
  border: 4px solid black;
}
.game__block.transform {
  opacity: 0.5;
}
.game__top-menu {
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  margin-bottom: 40px;
  background-color: coral;
}
.game__menu {
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 80px;
  margin:  0 auto;
  background-color: cadetblue;
  border-radius: 10px;
}
.game__menu-btn {
  margin-bottom: 40px;
}
</style>
