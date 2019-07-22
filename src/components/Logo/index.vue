<template>
  <div class="logo">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data () {
    return {
      ctx: null,
      colors: ['#9fffeb', '#b4ffba', '#e6ffa8',
        '#ffcdac', '#ffa3af', '#9dc2ff'],
      canvasWidth: 100,
      canvasHeight: 60
    }
  },
  mounted () {
    const canvas = this.$refs.canvas
    canvas.width = this.canvasWidth
    canvas.height = this.canvasHeight
    this.ctx = canvas.getContext('2d')
    this.render()
    console.log(this.ctx)
  },
  methods: {
    render () {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.ctx.save()
      this.ctx.beginPath()
      // 第一节
      this.ctx.moveTo(20, 30)
      this.ctx.lineTo(30, 20)
      this.ctx.lineTo(30, 40)
      this.ctx.lineTo(20, 30)
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[0]
      this.ctx.fill()
      this.ctx.restore()
      // 第二节
      this.ctx.beginPath()
      this.ctx.moveTo(30, 40)
      this.ctx.lineTo(40, 45)
      this.ctx.lineTo(40, 15)
      this.ctx.lineTo(30, 20)
      this.ctx.lineTo(30, 40)
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[1]
      this.ctx.fill()
      this.ctx.restore()
      // 第三节
      this.ctx.beginPath()
      this.ctx.moveTo(40, 15)
      this.ctx.lineTo(40, 45)
      this.ctx.lineTo(50, 45)
      this.ctx.lineTo(50, 15)
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[2]
      this.ctx.fill()
      this.ctx.restore()
      // 第四节
      this.ctx.beginPath()
      this.ctx.moveTo(50, 15)
      this.ctx.lineTo(50, 45)
      this.ctx.lineTo(60, 40)
      this.ctx.lineTo(60, 20)
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[3]
      this.ctx.fill()
      this.ctx.restore()
      // 第五节
      this.ctx.beginPath()
      this.ctx.moveTo(60, 40)
      this.ctx.lineTo(60, 20)
      this.ctx.lineTo(70, 30)
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[4]
      this.ctx.fill()
      this.ctx.restore()
      // 第六节
      this.ctx.beginPath()
      this.ctx.moveTo(70, 30)
      this.ctx.lineTo(80, 20)
      this.ctx.lineTo(80, 40)
      this.ctx.closePath()
      this.ctx.fillStyle = this.colors[5]
      this.ctx.fill()
      this.ctx.restore()
      // this.ctx.moveTo()
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    height: 60px;
    width: 100px;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
