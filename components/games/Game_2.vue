<template>
  <div class="game">
    <div class="game__top-menu">
      <span class="game__hp">SWAP POINT:{{ playerLife }}</span>
      <span class="game__points">POINTS:{{ points }}</span>
    </div>
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
</template>

<script>
export default {
  data: () => ({
    activeIndex: null,
    viewport: [],
    quality: 10,
    renderCounter: 1,
    playerLife: 10,
    points: 0,
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
    this.createTypes()
    this.randomize()
    this.render()
  },
  methods: {
    render () {
      setInterval(() => {
        this.renderCounter++
        this.destroyArray()
        this.updateViewport()
        this.addNewRow()
      }, 300)
    },
    startGame () {
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
            block.type = ''
            this.viewport[index][id + 1].type = ''
            this.viewport[index][id + 2].type = ''
            this.playerLife += 1
            this.points += 100
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
    }
  }
}
</script>

<style>
.game {
  margin: auto;
  width: 700px;
  height: 800px;
  background-color: white;
  padding: 40px;
  display: flex;
  flex-direction: column-reverse;
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
}
.game__block.active {
  border: 4px solid black;
}
.game__block.transform {
  opacity: 0.5;
}
.game__top-menu {
  color: black;
  display: flex;
  justify-content: space-between;
}
</style>
