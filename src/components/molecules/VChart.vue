<template lang="pug">
.v-chart(:style="styles")
  canvas(ref="canvas")
</template>

<script lang="ts">
import { Chart, ChartData, ChartOptions } from 'chart.js'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class VChart extends Vue {
  chart: Chart | null = null

  @Prop()
  data?: ChartData

  @Prop()
  options?: ChartOptions

  @Prop({ default: 'line' })
  type?: string

  get styles() {
    return {}
  }

  @Watch('data')
  onDataUpdate(data?: ChartData) {
    const { chart } = this

    if (!data || !chart) return

    chart.data = data

    chart.update()
  }

  @Watch('options')
  onOptionsUpdate(options?: ChartOptions) {
    const { chart } = this

    if (!options || !chart) return

    chart.options = options

    chart.update()
  }

  mounted() {
    const { data, options, type } = this

    const { canvas } = this.$refs

    if (!(canvas instanceof HTMLCanvasElement)) return

    this.chart = new Chart(canvas, { type, data, options })
  }
}
</script>

<style scoped lang="scss">
.v-chart {
  width: 1000px;
  height: 500px;
}
</style>
