<template lang="pug">
.v-chart(:style="styles")
  canvas(ref="canvas")
</template>

<script lang="ts">
import { Chart, ChartData, ChartOptions } from 'chart.js'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class VChart extends Vue {
  chart: any = null

  chartType = 'bar'

  data = {
    labels: ['2019-04', '2019-05', '2019-06', '2019-07'],
    datasets: [
      {
        label: 'HaveFunWP',
        type: 'line',
        fill: false,
        data: [10, 20, 40, 100],
        backgroundColor: '#da4167',
        borderColor: '#da4167',
        borderWidth: 2,
      },
    ],
  }

  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
        fontSize: 14,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  get styles() {
    return {}
  }

  mounted() {
    const { data, options } = this

    const { canvas } = this.$refs

    if (!(canvas instanceof HTMLCanvasElement)) return

    const type = 'bar'

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
