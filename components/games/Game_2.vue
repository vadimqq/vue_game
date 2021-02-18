<template>
  <div class="game">
    <div class="game__row" v-for="(row, index) in viewport" :key="index">
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
    this.render()
    this.createTypes()
    this.randomize()
  },
  methods: {
    render () {
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
    transform (elemId, currentElemId) {
      console.log(this.elemId)
    },
    onChange (row, id, elem) {
      const currentElemId = row + '/' + id
      if (this.activeIndex !== currentElemId && !elem.classList.contains('transform')) {
        this.activeIndex = currentElemId
      } else if (elem.classList.contains('transform')) {
        if (elem.classList.contains('up')) {
          this.elemId = (row + 1) + '/' + (id)
        } else if (elem.classList.contains('down')) {
          this.elemId = (row - 1) + '/' + (id)
        } else if (elem.classList.contains('right')) {
          this.elemId = (row) + '/' + (id - 1)
        } else if (elem.classList.contains('left')) {
          this.elemId = (row) + '/' + (id + 1)
        }
        this.transform(1, currentElemId)
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
  flex-direction: column;
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
