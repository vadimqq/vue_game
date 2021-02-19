<template>
  <div class="game">
    <div class="game__row" v-for="(row, index) in viewport" :key="index" v-bind:render="render">
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
    render: 1,
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
  },
  methods: {
    renderComponent () {
      this.render++
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
      this.renderComponent()
      this.destroyArray()
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
          } else if (block.type === this.viewport[index][id + 1].type && block.type === this.viewport[index][id + 2].type) {
            block.type = ''
            this.viewport[index][id + 1].type = ''
            this.viewport[index][id + 2].type = ''
            return block
          } else {
            return block
          }
        })
        return row
      })
      this.renderComponent()
      this.updateViewport()
    },
    updateViewport () {
      /* for (let row = 0; row < this.viewport.length; row++) {
        for (let block = 0; block < this.viewport[row].length; block++) {
          if (this.viewport[row][block].type === '') {
            const type = this.viewport[row + 1][block].type
            this.viewport[row][block].type = type
            if (this.viewport.length === row) {
              console.log('kek')
            } else {
              console.log(this.viewport.length, row)
              this.viewport[row + 1][block].type = 'black'
            }
          }
        }
      } */
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
  width: 50px;
  height: 50px;
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
</style>
